export interface UseCase<T, R> {
  handle(params: T): Promise<R>;
}
