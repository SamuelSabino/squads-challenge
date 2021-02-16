import { IProductDTO } from '../../../dtos/productDTO.interface'
import IProductRepository from '../../../interfaces/product.interface'
import { Product } from '../models/product.model'

class ProductRepository implements IProductRepository {
  constructor () { /** */ }

  async save (product: IProductDTO): Promise<IProductDTO> {
    return new Promise((resolve, reject) => {
      const newProduct = new Product({
        name: product.name,
        description: product.description,
        value: product.value
      })

      newProduct.save((err, result) => {
        (err)
          ? reject(err)
          : resolve(result as unknown as IProductDTO)
      })
    })
  }

  async findAll (): Promise<IProductDTO[]> {
    return new Promise((resolve, reject) => {
      Product.find({ active: true }, (err, products) => {
        (err)
          ? reject(err)
          : resolve(products as unknown as IProductDTO[])
      })
    })
  }

  async findById (id: string): Promise<IProductDTO> {
    return new Promise((resolve, reject) => {
      Product.findOne({ _id: id, active: true }, {}, {}, (err, result) => {
        (err)
          ? reject(err)
          : resolve(result as unknown as IProductDTO)
      })
    })
  }

  async update (productData: IProductDTO): Promise<IProductDTO> {
    return new Promise((resolve, reject) => {
      Product.updateOne({ _id: productData._id }, { $set: productData }, {}, (err, product) => {
        err
          ? reject(err)
          : resolve(product as unknown as IProductDTO)
      })
    })
  }

  async delete (id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      Product.updateOne({ _id: id }, { $set: { active: false } }, {}, (err) => {
        (err) ? reject(err) : resolve()
      })
    })
  }
}

export { ProductRepository }
