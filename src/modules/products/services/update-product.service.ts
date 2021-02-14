import { IProductDTO } from '../dtos/productDTO.interface'
import IProductRepository from '../interfaces/product.interface'

class UpdateProductService {
  constructor (private productRepository: IProductRepository) { /** */ }

  public async execute (productData: IProductDTO): Promise<IProductDTO> {
    if (!productData.id) throw new Error('Id invalido ou não informado.')

    if (productData.name.length < 2) throw new Error('Produto precisa ter mais que dois caracteres.')

    if (!productData.description) throw new Error('Descrição não pode estar vazia.')

    if (productData.value === '0') throw new Error('Valor do produto precisa ser maior que zero.')

    return this.productRepository.update(productData)
  }
}

export { UpdateProductService }
