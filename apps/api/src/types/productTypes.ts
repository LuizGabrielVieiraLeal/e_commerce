import { Document, Types } from 'mongoose'
import { Category, OmitId } from '.'

export interface Product {
  _id: Types.ObjectId
  category: Category | Types.ObjectId
  name: string
  description: string
  price: number
  unit: string
}

export interface ProductDocument extends Product, Document {
  _id: Types.ObjectId
}

export interface ProductCreateInput {
  data: OmitId<Product>
}

export interface ProductByIdInput {
  _id: string
}

export interface ProductUpdateInput
  extends ProductCreateInput,
    ProductByIdInput {}
