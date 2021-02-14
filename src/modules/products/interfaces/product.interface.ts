import { IProductDTO } from '../dtos/productDTO.interface'

export default interface IProductRepository {
  save(productData: IProductDTO): Promise<IProductDTO>;
  findAll(): Promise<IProductDTO[]>;
  findById(id: string): Promise<IProductDTO>;
  update(productData: IProductDTO): Promise<IProductDTO>;
  delete(id: string): Promise<boolean>;
}
