import { Document, Types } from 'mongoose'
import { OmitId } from '.'

export interface Category {
  _id: Types.ObjectId
  name: string
}

export interface CategoryDocument extends Category, Document {
  _id: Types.ObjectId
}

export interface CategoryCreateArgs {
  data: OmitId<Category>
}

export interface CategoryByIdArgs {
  _id: string
}

export interface CategoryUpdateArgs
  extends CategoryCreateArgs,
    CategoryByIdArgs {}
