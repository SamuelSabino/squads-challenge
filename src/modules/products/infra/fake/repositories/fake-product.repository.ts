import { IProductDTO } from '../../../dtos/productDTO.interface'
import IProductRepository from '../../../interfaces/product.interface'

class FakeProductRepository implements IProductRepository {
  private products: IProductDTO[] = []

  async save (productData: IProductDTO): Promise<IProductDTO> {
    const id = `${this.products.length + 1}`

    const productSaved = { ...productData, id, active: true }

    this.products.push(productSaved)

    return productSaved
  }

  async findAll (): Promise<IProductDTO[]> {
    return this.products
  }

  async findById (id: string): Promise<IProductDTO> {
    return this.products.find((product) => product.id === id) as IProductDTO
  }

  async update (productData: IProductDTO): Promise<IProductDTO> {
    this.products = this.products.map((product) => {
      return (product.id === productData.id)
        ? productData
        : product
    })

    return this.products.find((product) => product.id === productData.id) as IProductDTO
  }

  async delete (id: string): Promise<undefined> {
    this.products = this.products.map((product) => {
      return (product.id === id)
        ? { ...product, active: false }
        : product
    })

    return this.products.find((product) => product.id === id && product.active === true) as undefined
  }
}

export { FakeProductRepository }
