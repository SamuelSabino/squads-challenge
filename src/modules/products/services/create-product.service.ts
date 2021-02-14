import { IProductDTO } from '../dtos/productDTO.interface'
import IProductRepository from '../interfaces/product.interface'

class CreateProductService {
  constructor (private productRepository: IProductRepository) { /** */ }

  public async execute (productData: IProductDTO): Promise<IProductDTO> {
    if (productData.name.length < 2) throw new Error('Produto precisa ter mais que dois caracteres.')

    if (!productData.description) throw new Error('Descrição não pode estar vazia.')

    if (parseInt(productData.value, 10) === 0) throw new Error('Valor do produto precisa ser maior que zero.')

    return this.productRepository.save(productData)
  }
}

export { CreateProductService }
