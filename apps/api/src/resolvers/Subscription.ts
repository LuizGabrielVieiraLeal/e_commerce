import { SubscriptionResolver, Order } from '../types'

const order: SubscriptionResolver<Order> = {
  subscribe: (_, args, ctx) => {
    const { mutationIn } = args.where
    const { pubsub } = ctx

    const channels = mutationIn.map(mutation => `ORDER_${mutation}`)

    return pubsub.asyncIterator(channels)
  },
  resolve: payload => payload,
}

export default { order }
