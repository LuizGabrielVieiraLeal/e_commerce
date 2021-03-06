import { hash, compare } from 'bcryptjs'
import { Types } from 'mongoose'
import {
  Resolver,
  UserRole,
  UserSignUpArgs,
  UserSignInArgs,
  UserDocument,
  AddressCreateArgs,
  CategoryCreateArgs,
  CategoryByIdArgs,
  CategoryUpdateArgs,
  CategoryDocument,
  ProductCreateArgs,
  ProductByIdArgs,
  ProductUpdateArgs,
  ProductDocument,
  OrderCreateArgs,
  OrderDeleteArgs,
  OrderUpdateArgs,
  OrderDocument,
  MutationType,
} from '../types'
import { findDocument, findOrderItem, issueToken } from '../utils'
import { CustomError } from '../errors'

// User
const signup: Resolver<UserSignUpArgs> = async (_, args, { db }) => {
  const { User } = db
  const { data } = args

  const password = await hash(data.password, 10)

  const user = await new User({
    ...data,
    password,
  }).save()

  const { _id: sub, role } = user
  const token = issueToken({ sub, role })

  return { token, user }
}

const signin: Resolver<UserSignInArgs> = async (_, args, { db }) => {
  const { User } = db
  const { email, password } = args.data

  const error = new CustomError(
    'Invalid credentials!',
    'IVALID_CREDENTIALS_ERROR',
  )

  const user = await User.findOne({ email })

  if (!user) throw error

  const isValid = await compare(password, user.password)

  if (!isValid) throw error

  const { _id: sub, role } = user
  const token = issueToken({ sub, role })

  return { token, user }
}

// Address
const createAddress: Resolver<AddressCreateArgs> = async (
  _,
  args,
  { db, authUser },
) => {
  const { Address } = db
  const { data } = args

  const address = new Address(data)
  await address.save()

  const user = await findDocument<UserDocument>({
    db,
    model: 'User',
    field: '_id',
    value: authUser._id,
  })

  user.address = address
  await user.save()

  return address
}

// Category
const createCategory: Resolver<CategoryCreateArgs> = (_, args, { db }) => {
  const { Category } = db
  const { data } = args

  const category = new Category(data)
  return category.save()
}

const deleteCategory: Resolver<CategoryByIdArgs> = async (_, args, { db }) => {
  const { _id } = args

  const category = await findDocument<CategoryDocument>({
    db,
    model: 'Category',
    field: '_id',
    value: _id,
  })

  return category.remove()
}

const updateCategory: Resolver<CategoryUpdateArgs> = async (
  _,
  args,
  { db },
) => {
  const { data, _id } = args

  const category = await findDocument<CategoryDocument>({
    db,
    model: 'Category',
    field: '_id',
    value: _id,
  })

  Object.keys(data).forEach(prop => (category[prop] = data[prop]))

  return category.save()
}

// Product
const createProduct: Resolver<ProductCreateArgs> = (_, args, { db }) => {
  const { Product } = db
  const { data } = args

  const product = new Product(data)
  return product.save()
}

const deleteProduct: Resolver<ProductByIdArgs> = async (_, args, { db }) => {
  const { _id } = args

  const product = await findDocument<ProductDocument>({
    db,
    model: 'Product',
    field: '_id',
    value: _id,
  })

  return product.remove()
}

const updateProduct: Resolver<ProductUpdateArgs> = async (_, args, { db }) => {
  const { data, _id } = args

  const product = await findDocument<ProductDocument>({
    db,
    model: 'Product',
    field: '_id',
    value: _id,
  })

  Object.keys(data).forEach(prop => (product[prop] = data[prop]))

  return product.save()
}

// Order
const createOrder: Resolver<OrderCreateArgs> = async (
  _,
  args,
  { db, authUser, pubsub },
) => {
  const { Order } = db
  const { data } = args
  const { _id, role } = authUser

  const owner = role === UserRole.USER ? _id : data.owner || _id

  const total =
    (data.items && data.items.reduce((sum, item) => sum + item.total, 0)) || 0

  const order = await new Order({
    ...data,
    total,
    owner,
  }).save()

  pubsub.publish('ORDER_CREATED', {
    mutation: MutationType.CREATED,
    node: order,
  })

  return order
}

const deleteOrder: Resolver<OrderDeleteArgs> = async (
  _,
  args,
  { db, authUser, pubsub },
) => {
  const { _id } = args
  const { _id: owner, role } = authUser

  const where = role === UserRole.USER ? { _id, owner } : null

  const order = await findDocument<OrderDocument>({
    db,
    model: 'Order',
    field: '_id',
    value: _id,
    where,
  })

  await order.remove()

  pubsub.publish('ORDER_DELETED', {
    mutation: MutationType.DELETED,
    node: order,
  })

  return order
}

const updateOrder: Resolver<OrderUpdateArgs> = async (
  _,
  args,
  { db, authUser, pubsub },
) => {
  const { data, _id } = args
  const { _id: user, role } = authUser

  const isAdmin = role === UserRole.ADMIN

  const where = !isAdmin ? { _id, owner: user } : null

  const order = await findDocument<OrderDocument>({
    db,
    model: 'Order',
    field: '_id',
    value: _id,
    where,
  })

  const owner = !isAdmin ? user : data.owner || order.owner

  const {
    itemsToUpdate = [],
    itemsToRemove = [],
    itemsToAdd = [],
    status,
  } = args.data

  const foundItemsToUpdate = itemsToUpdate.map(orderItem =>
    findOrderItem(order.items, orderItem._id, 'update'),
  )

  const foundItemsToRemove = itemsToRemove.map(orderItemId =>
    findOrderItem(order.items, orderItemId, 'delete'),
  )

  foundItemsToUpdate.forEach((orderItem, index) =>
    orderItem.set(itemsToUpdate[index]),
  )

  foundItemsToRemove.forEach(orderItem => orderItem.remove())

  itemsToAdd.forEach(itemToAdd => {
    const foundItem = order.items.find(item =>
      (item.product as Types.ObjectId).equals(itemToAdd.product),
    )

    if (foundItem) {
      return foundItem.set({
        quantity: foundItem.quantity + itemToAdd.quantity,
        total: foundItem.total + itemToAdd.total,
      })
    }

    order.items.push(itemToAdd)
  })

  const total = order.items.reduce((sum, item) => sum + item.total, 0)

  order.owner = owner
  order.status = status || order.status
  order.total = total

  await order.save()

  pubsub.publish('ORDER_UPDATED', {
    mutation: MutationType.UPDATED,
    node: order,
  })

  return order
}

export default {
  signup,
  signin,
  createAddress,
  createCategory,
  deleteCategory,
  updateCategory,
  createProduct,
  deleteProduct,
  updateProduct,
  createOrder,
  deleteOrder,
  updateOrder,
}
