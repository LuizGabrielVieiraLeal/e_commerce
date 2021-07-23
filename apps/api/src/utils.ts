import { Types, Document, Model } from 'mongoose'
import { SignOptions, sign } from 'jsonwebtoken'
import { findDocumentOptions, TokenPayload } from './types'
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

export { isMongoId, findDocument, issueToken }
