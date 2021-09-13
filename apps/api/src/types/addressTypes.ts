import { Document, Types } from 'mongoose'
import { OmitId } from '.'

export interface Address {
  _id: Types.ObjectId
  street: string
  number: string
  district: string
  complement: string
  city: string
  state: string
  country: string
  zipCode: string
}

export interface AddressDocument extends Address, Document {
  _id: Types.ObjectId
}

export interface AddressCreateArgs {
  data: OmitId<Address>
}
