export default interface IProductRepository {
  save(data: IProduct): Promise<void>;
  findAll(): Promise<IProduct[]>;
  findById(id: string): Promise<IProduct>;
  update(id: string): Promise<IProduct>;
  delete(id: string): Promise<boolean>;
}

export interface IProduct {
  name: string;
  description: string;
  value: string;
}
