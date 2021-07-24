import { hash, compare } from 'bcryptjs'
import { Types } from 'mongoose'
import {
  Resolver,
  UserRole,
  UserSignUpInput,
  UserSignInInput,
  ProductCreateInput,
  ProductByIdInput,
  ProductUpdateInput,
  ProductDocument,
  OrderCreateArgs,
  OrderDeleteArgs,
  OrderUpdateArgs,
  OrderDocument,
} from '../types'
import { findDocument, findOrderItem, issueToken } from '../utils'
import { CustomError } from '../errors'

// User
const signup: Resolver<UserSignUpInput> = async (_, args, { db }) => {
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

const signin: Resolver<UserSignInInput> = async (_, args, { db }) => {
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

// Product
const createProduct: Resolver<ProductCreateInput> = (_, args, { db }) => {
  const { Product } = db
  const { data } = args

  const product = new Product(data)
  return product.save()
}

const deleteProduct: Resolver<ProductByIdInput> = async (_, args, { db }) => {
  const { _id } = args

  const product = await findDocument<ProductDocument>({
    db,
    model: 'Product',
    field: '_id',
    value: _id,
  })

  return product.remove()
}

const updateProduct: Resolver<ProductUpdateInput> = async (_, args, { db }) => {
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
  { db, authUser },
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

  return order
}

const deleteOrder: Resolver<OrderDeleteArgs> = async (
  _,
  args,
  { db, authUser },
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

  return order.remove()
}

const updateOrder: Resolver<OrderUpdateArgs> = async (
  _,
  args,
  { db, authUser },
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

  return order.save()
}

export default {
  signup,
  signin,
  createProduct,
  deleteProduct,
  updateProduct,
  createOrder,
  deleteOrder,
  updateOrder,
}
