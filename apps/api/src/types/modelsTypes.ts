import { Model } from 'mongoose'
import {
  UserDocument,
  CategoryDocument,
  ProductDocument,
  OrderDocument,
} from '.'

export interface Models {
  User: Model<UserDocument>
  Category: Model<CategoryDocument>
  Product: Model<ProductDocument>
  Order: Model<OrderDocument>
}
