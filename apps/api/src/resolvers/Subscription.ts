import { withFilter } from 'graphql-yoga'
import { Types } from 'mongoose'
import {
  SubscriptionResolver,
  Order,
  Resolver,
  SubscriptionArgs,
  SubscriptionPayload,
  UserRole,
} from '../types'

const orderSubscribeFn: Resolver<SubscriptionArgs> = (_, args, ctx) => {
  const { mutationIn } = args.where
  const { pubsub } = ctx

  const channels = mutationIn.map(mutation => `ORDER_${mutation}`)

  return pubsub.asyncIterator(channels)
}

const orderFilterFn: Resolver<SubscriptionArgs, SubscriptionPayload<Order>> = (
  payload,
  args,
  ctx,
) => {
  const { _id, role } = ctx.authUser
  return role === UserRole.ADMIN ? true : payload.node.owner === _id
}

const order: SubscriptionResolver<Order> = {
  subscribe: withFilter(orderSubscribeFn, orderFilterFn),
  resolve: payload => payload,
}

export default { order }
