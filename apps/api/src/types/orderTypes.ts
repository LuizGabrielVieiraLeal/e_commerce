import { Document, Types } from 'mongoose'
import {
  User,
  OrderItemSubdocument,
  OrderItemCreateInput,
  OrderItemUpdateInput,
} from '.'

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
  _id: Types.ObjectId
  owner: User | Types.ObjectId
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
  _id: Types.ObjectId
}

export interface OrderByIdInput {
  _id: string
}

type OrderCreateInput = Pick<
  Order,
  'owner' | 'paymentMethod' | 'changeFor' | 'change' | 'status'
>

interface OrderUpdateInput extends OrderCreateInput {
  itemsToAdd: OrderItemCreateInput[]
  itemsToUpdate: OrderItemUpdateInput[]
  itemsToRemove: string[]
}

export interface OrderCreateArgs {
  data: OrderCreateInput & {
    items: OrderItemCreateInput[]
  }
}

export interface OrderDeleteArgs {
  _id: string
}

export interface OrderUpdateArgs extends OrderDeleteArgs {
  data: OrderUpdateInput
}
