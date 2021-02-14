import { AppError } from '../../../shared/errors/app.error'
import IProductRepository from '../interfaces/product.interface'

class DeleteProductService {
  constructor (private productRepository: IProductRepository) { /** */ }
  public async execute (id: string): Promise<undefined> {
    if (!id) throw new AppError('Id invalido ou não informado.')

    const product = await this.productRepository.findById(id)

    if (!product) throw new AppError('Produto não encontrado, verifique se o mesmo já não foi deletado.', 404)

    return this.productRepository.delete(id)
  }
}

export { DeleteProductService }
