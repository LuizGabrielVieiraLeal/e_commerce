import {
  Resolver,
  UserRole,
  CategoryByIdArgs,
  ProductDocument,
  ProductByIdArgs,
  OrderDocument,
  OrderByIdArgs,
  CategoryDocument,
} from '../types'
import { findDocument } from '../utils'

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
const products: Resolver<Record<string, unknown>> = (_, args, { db }) =>
  db.Product.find()

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
const orders: Resolver<Record<string, unknown>> = (
  _,
  args,
  { db, authUser },
) => {
  const { Order } = db
  const { _id, role } = authUser

  const conditions = role === UserRole.USER ? { owner: _id } : {}

  return Order.find(conditions)
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
