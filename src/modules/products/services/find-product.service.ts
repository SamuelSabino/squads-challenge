import { IProductDTO } from '../dtos/productDTO.interface'
import IProductRepository from '../interfaces/product.interface'

class FindProductService {
  constructor (private productRepository: IProductRepository) { /** */ }

  public async execute (id: string): Promise<IProductDTO | IProductDTO[]> {
    if (!id) throw new Error('Id invalido ou não informado.')

    return (id)
      ? this.productRepository.findById(id)
      : this.productRepository.findAll()
  }
}

export { FindProductService }
