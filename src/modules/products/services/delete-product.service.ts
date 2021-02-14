import IProductRepository from '../interfaces/product.interface'

class DeleteProductService {
  constructor (private productRepository: IProductRepository) { /** */ }
  public async execute (id: string): Promise<boolean> {
    if (!id) throw new Error('Id invalido ou não informado.')

    const product = await this.productRepository.findById(id)

    if (!product) throw new Error('Produto não encontrado, verifique se o mesmo já não foi deletado.')

    return this.productRepository.delete(id)
  }
}

export { DeleteProductService }
