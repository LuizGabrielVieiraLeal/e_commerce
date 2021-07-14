import { resolve } from 'path'
import { GraphQLServer } from 'graphql-yoga'
import { context } from './config'
import resolvers from './resolvers'
import { catchErrorsMiddleware } from './middlewares'
import { AuthDirective } from './directives'

const typeDefs = resolve(__dirname, 'schema.graphql')

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
  middlewares: [catchErrorsMiddleware],
  schemaDirectives: {
    auth: AuthDirective,
  },
})

export default server
