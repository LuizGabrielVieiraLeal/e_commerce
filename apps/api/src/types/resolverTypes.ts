import { GraphQLFieldResolver } from 'graphql'
import { Context } from '.'

export type Resolver<
  TArgs,
  TSource = Record<string, unknown>
> = GraphQLFieldResolver<TSource, Context, TArgs>
