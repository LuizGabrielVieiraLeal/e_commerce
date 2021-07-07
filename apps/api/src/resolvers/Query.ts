import { Resolver } from '../types'

const products: Resolver<Record<string, unknown>> = (_, args, ctx) =>
  ctx.db.Product.find()

export default { products }
