import { Resolver, Order } from '../types'

const owner: Resolver<any, Order> = (order, args, { db }) =>
  db.User.findById(order.owner)

export default { owner }
