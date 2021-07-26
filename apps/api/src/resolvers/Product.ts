import { Resolver, Product } from '../types'

const category: Resolver<any, Product> = (product, args, { db }) =>
  db.Category.findById(product.category)

export default { category }
