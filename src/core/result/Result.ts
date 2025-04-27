export type Result<T, E> = Ok<T> | Err<E>;

export class Ok<T> {
  readonly isOk = true;
  readonly isErr = false;
  constructor(public readonly value: T) {}
}

export class Err<E> {
  readonly isOk = false;
  readonly isErr = true;
  constructor(public readonly error: E) {}
}

export const ok = <T>(value: T): Result<T, never> => new Ok(value);
export const err = <E>(error: E): Result<never, E> => new Err(error);

// Encadenamiento
export function bind<A, B, E>(
  result: Result<A, E>,
  f: (val: A) => Result<B, E>
): Result<B, E> {
  return result.isOk ? f(result.value) : result;
}