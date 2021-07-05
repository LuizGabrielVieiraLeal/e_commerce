import { Model } from 'mongoose'
import { UserDocument, ProductDocument, OrderDocument } from '.'

export interface Models {
  User: Model<UserDocument>
  Product: Model<ProductDocument>
  Order: Model<OrderDocument>
}
