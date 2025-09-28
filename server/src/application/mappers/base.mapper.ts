export interface BaseMapper<TSource, TTarget, TDomain = unknown> {
  toDomain(source: TSource, ...args: unknown[]): TTarget;
  toDto(domain: TDomain): TSource;
}

export abstract class AbstractMapper<TSource, TTarget, TDomain = unknown> implements BaseMapper<TSource, TTarget, TDomain> {
  abstract toDomain(source: TSource, ...args: unknown[]): TTarget;
  abstract toDto(domain: TDomain): TSource;
}