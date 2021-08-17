import { ContextParameters } from 'graphql-yoga/dist/types'
import { Models, AuthUser } from '.'
import { PubSub } from 'graphql-yoga'

export interface Context extends ContextParameters {
  db: Models
  authUser: AuthUser
  pubsub: PubSub
}
