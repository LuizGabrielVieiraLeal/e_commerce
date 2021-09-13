import { Model } from 'mongoose'
import {
  UserDocument,
  AddressDocument,
  CategoryDocument,
  ProductDocument,
  OrderDocument,
} from '.'

export interface Models {
  User: Model<UserDocument>
  Address: Model<AddressDocument>
  Category: Model<CategoryDocument>
  Product: Model<ProductDocument>
  Order: Model<OrderDocument>
}
