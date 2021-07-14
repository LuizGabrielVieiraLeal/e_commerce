import { SchemaDirectiveVisitor } from 'graphql-tools'
import { GraphQLField, defaultFieldResolver } from 'graphql'
import { Context } from '../types'
import { CustomError } from '../errors'

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, Context>): void {
    const { resolve = defaultFieldResolver } = field

    console.log('Field: ', field)
    console.log('Directive args: ', this.args)

    field.resolve = (...args): any => {
      if (this.args.role === 'ADMIN')
        throw new CustomError('Unauthorized!', 'UNAUTHORIZED_ERROR')

      return resolve.apply(this, args)
    }
  }
}

export { AuthDirective }
