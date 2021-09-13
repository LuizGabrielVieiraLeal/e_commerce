import { Schema, model } from 'mongoose'
import { UserDocument } from '../types'

const userSchema = new Schema({
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
})

export default model<UserDocument>('User', userSchema)
