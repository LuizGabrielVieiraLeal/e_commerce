import {
  Resolver,
  UserRole,
  PaginationArgs,
  CategoryByIdArgs,
  ProductDocument,
  ProductByIdArgs,
  OrderDocument,
  OrderByIdArgs,
  CategoryDocument,
} from '../types'
import { buildConditions, findDocument, paginateAndSort } from '../utils'

// Category
const categories: Resolver<Record<string, unknown>> = (_, args, { db }) =>
  db.Category.find()

const category: Resolver<CategoryByIdArgs> = async (_, args, { db }) => {
  const { _id } = args

  return await findDocument<CategoryDocument>({
    db,
    model: 'Category',
    field: '_id',
    value: _id,
  })
}

// Product
const products: Resolver<PaginationArgs> = (_, args, { db }) => {
  const { Product } = db
  const conditions = buildConditions(args.where)

  return paginateAndSort(Product.find(conditions), args)
}

const product: Resolver<ProductByIdArgs> = async (_, args, { db }) => {
  const { _id } = args

  return await findDocument<ProductDocument>({
    db,
    model: 'Product',
    field: '_id',
    value: _id,
  })
}

// Order
const orders: Resolver<PaginationArgs> = (_, args, { db, authUser }) => {
  const { Order } = db
  const { _id, role } = authUser
  let conditions = buildConditions(args.where)

  conditions =
    role === UserRole.USER ? { ...conditions, owner: _id } : conditions

  return paginateAndSort(Order.find(conditions), args)
}

const order: Resolver<OrderByIdArgs> = async (_, args, { db, authUser }) => {
  const { _id } = args
  const { _id: owner, role } = authUser

  const where = role === UserRole.USER ? { owner, _id } : null

  return await findDocument<OrderDocument>({
    db,
    model: 'Order',
    field: '_id',
    value: _id,
    where,
  })
}

export default { products, categories, category, product, orders, order }
