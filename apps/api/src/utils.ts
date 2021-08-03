import { Types, Model, Document, DocumentQuery } from 'mongoose'
import { SignOptions, sign } from 'jsonwebtoken'
import {
  TokenPayload,
  PaginationArgs,
  findDocumentOptions,
  OrderItemSubdocument,
} from './types'
import { CustomError } from './errors'

const isMongoId = (value: string): boolean => Types.ObjectId.isValid(value)

const findDocument = async <T extends Document>(
  opts: findDocumentOptions,
): Promise<T> => {
  const {
    model,
    db,
    field,
    value,
    where,
    message,
    errorCode,
    extensions,
  } = opts

  if (field === '_id' && !isMongoId(value))
    throw new CustomError(`Invalid ID value for ${value}!`, 'INVALID_ID_ERROR')

  const document = await ((db[model] as unknown) as Model<T>)
    .findOne(where || { [field]: value })
    .exec()

  if (!document)
    throw new CustomError(
      message || `${model} with ${field} '${value}' not found!`,
      errorCode || 'NOT_FOUND_ERROR',
      extensions,
    )

  return document
}

const issueToken = (payload: TokenPayload, options?: SignOptions): string =>
  sign(payload, process.env.JWT_SECRET, { expiresIn: '1d', ...options })

const findOrderItem = (
  items: Types.DocumentArray<OrderItemSubdocument>,
  _id: string,
  operation: 'update' | 'delete',
): OrderItemSubdocument => {
  if (!isMongoId(_id))
    throw new CustomError(
      `Invalid ID value for '${_id}' in item to ${operation}!`,
      'INVALID_ID_ERROR',
    )

  const item = items.id(_id)

  if (!item)
    throw new CustomError(
      `Item with id '${_id}' not found to ${operation}!`,
      'NOT_FOUND_ERROR',
    )

  return item
}

const paginateAndSort = <TDoc extends Document>(
  query: DocumentQuery<TDoc[], TDoc>,
  args: PaginationArgs,
): DocumentQuery<TDoc[], TDoc> => {
  if ('skip' in args && 'limit' in args) {
    const { skip = 0, limit = 20, orderBy = [] } = args

    return query
      .skip(skip)
      .limit(limit <= 20 ? limit : 20)
      .sort(orderBy.join(' '))
  } else {
    const { orderBy = [] } = args

    return query.sort(orderBy.join(' '))
  }
}

const buildOrderByResolvers = (fields: string[]): Record<string, string> =>
  fields.reduce(
    (resolvers, field) => ({
      ...resolvers,
      [`${field}_ASC`]: field,
      [`${field}_DESC`]: `-${field}`,
    }),
    {},
  )

const operators = [
  { name: 'Eq', op: '$eq' },
  { name: 'Ne', op: '$ne' },
  { name: 'Lt', op: '$lt' },
  { name: 'Lte', op: '$lte' },
  { name: 'Gt', op: '$gt' },
  { name: 'Gte', op: '$gte' },
  { name: 'In', op: '$in' },
  { name: 'Nin', op: '$nin' },
  { name: 'Regex', op: '$regex' },
  { name: 'Options', op: '$options' },
]

const idFields = ['owner']

const buildConditions = (
  where: Record<string, any> = {},
): Record<string, any> =>
  Object.keys(where).reduce((conditions, whereKey) => {
    if (idFields.some(idField => whereKey.includes(idField))) {
      const ids: string[] = Array.isArray(where[whereKey])
        ? where[whereKey]
        : [where[whereKey]]

      if (ids.some(id => !isMongoId(id)))
        throw new CustomError(
          `Invalid ID value for condition '${whereKey}'!`,
          'INVALID_ID_ERROR',
        )
    }

    const operator = operators.find(({ name }) => {
      return new RegExp(`${name}$`).test(whereKey)
    })

    const fieldName = operator
      ? whereKey.replace(operator.name, '')
      : '$' + whereKey.toLowerCase()

    const fieldValue = operator
      ? { ...conditions[fieldName], [operator.op]: where[whereKey] }
      : where[whereKey].map(buildConditions)

    return { ...conditions, [fieldName]: fieldValue }
  }, {})

export {
  isMongoId,
  findDocument,
  issueToken,
  findOrderItem,
  paginateAndSort,
  buildOrderByResolvers,
  buildConditions,
}
