import { Schema } from 'mongoose'
import { Models, UserRole } from '.'

export interface findDocumentOptions {
  model: keyof Models
  db: Models
  field?: string
  value?: any
  message?: string
  where?: Record<string, any>
  errorCode?: string
  extensions?: Record<string, any>
}

export interface TokenPayload {
  sub: Schema.Types.ObjectId
  role: UserRole
}
