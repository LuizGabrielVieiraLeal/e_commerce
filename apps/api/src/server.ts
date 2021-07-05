import { resolve } from 'path'
import { GraphQLServer } from 'graphql-yoga'

const typeDefs = resolve(__dirname, 'schema.graphql')

const USERS = [{ id: 1, name: 'Tony Stark', email: 'stark@avengers.com' }]

const resolvers = {
  Mutation: {
    createUser: (parent, args, ctx, info) => {
      const { data } = args

      const user = {
        ...data,
        id: USERS.length + 1,
      }

      USERS.push(user)
      return user
    },
  },

  Query: {
    users: () => USERS,
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

export default server
