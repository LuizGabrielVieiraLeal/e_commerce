import { ContextParameters } from 'graphql-yoga/dist/types'
import { Models, AuthUser } from '.'
import { RedisPubSub } from 'graphql-redis-subscriptions'

export interface Context extends ContextParameters {
  db: Models
  authUser: AuthUser
  pubsub: RedisPubSub
}
