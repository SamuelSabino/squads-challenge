import { Request, Response } from 'express'

import { IProduct } from '../interfaces/product.interface'
import { ProductRepository } from '../repositories/product.repository'

class ProductsController {
  constructor (private productRepository = new ProductRepository()) { /**  */ }

  public async creatAndSave (req: Request, res: Response): Promise<void> {
    try {
      const product: IProduct = req.body

      await this.productRepository.save(product)

      res.status(200).json({ error: false, result: 'Product successfully created.' })
    } catch (error) {
      res.json({ error: true, message: error })
    }
  }

  public async find (req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id ?? ''

      const product = (id)
        ? this.productRepository.findById(id)
        : this.productRepository.findAll()

      res.status(200).json({ error: false, result: product })
    } catch (error) {
      res.json({ error: true, message: error })
    }
  }

  public async updateById (req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id

      const product = this.productRepository.findById(id)

      res.status(200).json({ error: false, result: product })
    } catch (error) {
      res.json({ error: true, message: error })
    }
  }

  public async deleteById (req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id

      this.productRepository.delete(id)

      res.status(200).json({ error: false, result: 'Product successfully deleted' })
    } catch (error) {
      res.json({ error: true, message: error })
    }
  }
}

export { ProductsController }
