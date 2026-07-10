export interface IUseCase<TRequest, TResponse> {
  execute(request: TRequest): Promise<TResponse>;
}
