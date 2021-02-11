import { IProductDTO } from '../../../dtos/productDTO.interface'
import IProductRepository from '../../../interfaces/product.interface'
import { Product } from '../models/product.model'

class ProductRepository implements IProductRepository {
  constructor () { /** */ }

  async save (product: IProductDTO): Promise<void> {
    const newProduct = new Product({
      name: product.name,
      description: product.description,
      value: product.value
    })

    newProduct.save()
  }

  async findAll (): Promise<IProductDTO[]> {
    return new Promise((resolve, reject) => {
      Product.find((err, products) => {
        (err)
          ? reject(err)
          : resolve(products as unknown as IProductDTO[])
      })
    })
  }

  async findById (id: string): Promise<IProductDTO> {
    return new Promise((resolve, reject) => {
      Product.findOne({ _id: id }, {}, {}, (err, result) => {
        err
          ? reject(err)
          : resolve(result as unknown as IProductDTO)
      })
    })
  }

  async update (id: string, product: IProductDTO): Promise<IProductDTO> {
    const productToUpdate = new Product({
      name: product.name,
      description: product.description,
      value: product.value
    })
    return new Promise((resolve, reject) => {
      Product.updateOne({ _id: id }, productToUpdate, {}, (err, product) => {
        err
          ? reject(err)
          : resolve(product as unknown as IProductDTO)
      })
    })
  }

  async delete (id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Product.updateOne({ _id: id }, { active: false }, null, (err, result) => {
        reject(err)
        resolve(!!result)
      })
    })
  }
}

export { ProductRepository }
