export interface IDataProvider<T> {
  fetch: () => Promise<T[]>;
}
