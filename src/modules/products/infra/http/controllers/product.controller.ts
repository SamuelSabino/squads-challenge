import { Request, Response } from 'express'

import { IProductDTO } from '../../../dtos/productDTO.interface'
import IProductRepository from '../../../interfaces/product.interface'
import { CreateProductService } from '../../../services/create-product.service'
import { DeleteProductService } from '../../../services/delete-product.service'
import { FindProductService } from '../../../services/find-product.service'
import { UpdateProductService } from '../../../services/update-product.service'
import { ProductRepository } from '../../mongo/repositories/product.repository'

class ProductsController {
  constructor (private productRepository: IProductRepository = new ProductRepository()) { /**  */ }

  public async creatAndSave (req: Request, res: Response): Promise<void> {
    try {
      const product: IProductDTO = req.body

      const createProductService = new CreateProductService(this.productRepository)

      const productSaved = await createProductService.execute(product)

      res.status(200).json({ error: false, result: productSaved, message: 'Product successfully created.' })
    } catch (error) {
      res.json({ error: true, message: error.message })
    }
  }

  public async find (req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id ?? ''

      const findProductService = new FindProductService(this.productRepository)

      const product = await findProductService.execute(id)

      res.status(200).json({ error: false, result: product })
    } catch (error) {
      res.json({ error: true, message: error.message })
    }
  }

  public async updateById (req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id ?? ''

      const productData: IProductDTO = req.body

      const updateProductService = new UpdateProductService(this.productRepository)

      const productUpdated = await updateProductService.execute({ ...productData, id })

      res.status(200).json({ error: false, result: productUpdated })
    } catch (error) {
      res.json({ error: true, message: error.message })
    }
  }

  public async deleteById (req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id

      const deleteProductService = new DeleteProductService(this.productRepository)

      await deleteProductService.execute(id)

      res.status(200).json({ error: false, result: 'Product successfully deleted' })
    } catch (error) {
      res.json({ error: true, message: error.message })
    }
  }
}

export { ProductsController }
