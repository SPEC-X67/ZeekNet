export class Result<T, E = Error> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly value?: T,
    public readonly error?: E,
  ) {}

  static success<T>(value: T): Result<T, never> {
    return new Result<T, never>(true, value);
  }

  static failure<E>(error: E): Result<never, E> {
    return new Result<never, E>(false, undefined, error);
  }

  static async fromPromise<T>(
    promise: Promise<T>,
  ): Promise<Result<T, Error>> {
    try {
      const value = await promise;
      return Result.success(value);
    } catch (error) {
      return Result.failure(error instanceof Error ? error : new Error(String(error)));
    }
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.isSuccess) {
      try {
        return Result.success(fn(this.value!));
      } catch (error) {
        return Result.failure<E>(this.error!);
      }
    }
    return Result.failure(this.error!);
  }

  mapError<F>(fn: (error: E) => F): Result<T, F> {
    if (this.isSuccess) {
      return Result.success<T>(this.value!);
    }
    return Result.failure(fn(this.error!));
  }

  flatMap<U, F>(fn: (value: T) => Result<U, F>): Result<U, E | F> {
    if (this.isSuccess) {
      return fn(this.value!);
    }
    return Result.failure(this.error!);
  }

  getOrElse(defaultValue: T): T {
    return this.isSuccess ? this.value! : defaultValue;
  }

  getOrThrow(): T {
    if (this.isSuccess) {
      return this.value!;
    }
    throw this.error;
  }

  isFailure(): boolean {
    return !this.isSuccess;
  }

  onSuccess(fn: (value: T) => void): Result<T, E> {
    if (this.isSuccess) {
      fn(this.value!);
    }
    return this;
  }

  onFailure(fn: (error: E) => void): Result<T, E> {
    if (this.isFailure()) {
      fn(this.error!);
    }
    return this;
  }
}
