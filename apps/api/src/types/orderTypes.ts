import { Schema, Document, Types } from 'mongoose'
import { User, OrderItemSubdocument } from '.'

export enum OrderPaymentMethod {
  CASH,
  CREDIT_CARD,
}

export enum OrderStatus {
  WAITING_PAYMENT,
  IN_QUEUE,
  PREPARING,
  READY,
  ON_THE_WAY,
  DELIVERED,
}

export interface Order {
  _id: Schema.Types.ObjectId
  owner: User
  items: Types.DocumentArray<OrderItemSubdocument>
  total: number
  paymentMethod: OrderPaymentMethod
  changeFor: number
  change: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
}

export interface OrderDocument extends Order, Document {
  _id: Schema.Types.ObjectId
}

export interface OrderByIdInput {
  _id: Schema.Types.ObjectId
}
