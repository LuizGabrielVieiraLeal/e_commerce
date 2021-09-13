import { Schema, model } from 'mongoose'
import { AddressDocument } from '../types'

const addressSchema = new Schema({
  street: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
    type: String,
    required: true,
    trim: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  complement: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    enum: ['RJ', 'SP'],
    required: true,
  },
  country: {
    type: String,
    enum: ['Brasil'],
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
    trim: true,
  },
})

export default model<AddressDocument>('Address', addressSchema)
