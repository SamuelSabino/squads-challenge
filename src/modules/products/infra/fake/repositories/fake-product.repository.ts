import { IProductDTO } from '../../../dtos/productDTO.interface'
import IProductRepository from '../../../interfaces/product.interface'

class FakeProductRepository implements IProductRepository {
  private products: IProductDTO[] = []

  async save (productData: IProductDTO): Promise<IProductDTO> {
    this.products.push(productData)

    return productData
  }

  async findAll (): Promise<IProductDTO[]> {
    return this.products
  }

  async findById (id: string): Promise<IProductDTO> {
    return this.products.find((product) => product.id === id) ?? this.products[0]
  }

  async update (productData: IProductDTO): Promise<IProductDTO> {
    this.products.map((product) => {
      return (product.id === productData.id)
        ? productData
        : product
    })

    return this.products.find((product) => product.id === productData.id) ?? this.products[0]
  }

  async delete (id: string): Promise<boolean> {
    return !!id
  }
}

export { FakeProductRepository }
