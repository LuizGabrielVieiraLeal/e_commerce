import { Schema, model } from 'mongoose'
import { ProductDocument } from '../types'

const productSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    enum: ['M', 'CM', 'CX', 'UN', 'LT', 'ML', 'KG', 'GR'],
    required: true,
  },
})

export default model<ProductDocument>('Product', productSchema)
