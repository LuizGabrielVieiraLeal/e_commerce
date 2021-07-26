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

export interface ProductCreateArgs {
  data: OmitId<Product>
}

export interface ProductByIdArgs {
  _id: string
}

export interface ProductUpdateArgs extends ProductCreateArgs, ProductByIdArgs {}
