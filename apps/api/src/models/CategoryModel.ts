import { Schema, model } from 'mongoose'
import { CategoryDocument } from '../types'

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
})

export default model<CategoryDocument>('Category', categorySchema)
