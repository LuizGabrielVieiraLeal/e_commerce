import { Resolver, User } from '../types'

const address: Resolver<any, User> = (user, args, { db }) =>
  db.Address.findById(user.address)

export default { address }
