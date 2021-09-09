import { Schema, model } from 'mongoose'
import { OrderDocument } from '../types'

const orderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const orderSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['CASH', 'CARD_ON_DELIVERY', 'CREDIT_CARD'],
      required: true,
    },
    changeFor: {
      type: Number,
    },
    change: {
      type: Number,
    },
    status: {
      type: String,
      enum: [
        'PENDING',
        'WAITING_PAYMENT',
        'IN_QUEUE',
        'PREPARING',
        'READY',
        'ON_THE_WAY',
        'DELIVERED',
      ],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  },
)

export default model<OrderDocument>('Order', orderSchema)
