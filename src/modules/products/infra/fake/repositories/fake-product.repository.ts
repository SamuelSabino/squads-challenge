import { IProductDTO } from '../../../dtos/productDTO.interface'
import IProductRepository from '../../../interfaces/product.interface'
import uuid from 'uuid-1345'

class FakeProductRepository implements IProductRepository {
  private products: IProductDTO[] = []

  async save (productData: IProductDTO): Promise<IProductDTO> {
    const _id = uuid.v4()

    const productSaved = { ...productData, _id, active: true }

    this.products.push(productSaved)

    return productSaved
  }

  async findAll (): Promise<IProductDTO[]> {
    return this.products
  }

  async findById (id: string): Promise<IProductDTO> {
    return this.products.find((product) => product._id === id) as IProductDTO
  }

  async update (productData: IProductDTO): Promise<IProductDTO> {
    this.products = this.products.map((product) => {
      return (product._id === productData._id)
        ? { ...productData, active: true }
        : product
    })

    return this.products.find((product) => product._id === productData._id) as IProductDTO
  }

  async delete (id: string): Promise<void> {
    this.products = this.products.map((product) => {
      return (product._id === id)
        ? { ...product, active: false }
        : product
    })
  }
}

export { FakeProductRepository }
