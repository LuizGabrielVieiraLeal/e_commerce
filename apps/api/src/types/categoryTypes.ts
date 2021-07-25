import { Document, Types } from 'mongoose'
import { OmitId } from '.'

export interface Category {
  _id: Types.ObjectId
  name: string
}

export interface CategoryDocument extends Category, Document {
  _id: Types.ObjectId
}

export interface CategoryCreateInput {
  data: OmitId<Category>
}

export interface CategoryByIdInput {
  _id: string
}

export interface CategoryUpdateInput
  extends CategoryCreateInput,
    CategoryByIdInput {}
