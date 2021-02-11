import { IProductDTO } from '../dtos/productDTO.interface'

export default interface IProductRepository {
  save(data: IProductDTO): Promise<void>;
  findAll(): Promise<IProductDTO[]>;
  findById(id: string): Promise<IProductDTO>;
  update(id: string, product: IProductDTO): Promise<IProductDTO>;
  delete(id: string): Promise<boolean>;
}
