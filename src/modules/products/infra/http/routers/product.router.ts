import { celebrate, Segments } from 'celebrate'
import Router from 'express'

import { ProductsController } from '../controllers/product.controller'
import { BodySchema, ParamsSchema } from '../schemas/product.schema'

const productRouter = Router()

const productController = new ProductsController()

productRouter.get('/:id?', (req, res) => { productController.find(req, res) })

productRouter.post('/', celebrate({ [Segments.BODY]: BodySchema }), (req, res) => productController.creatAndSave(req, res))

productRouter.patch('/:id', celebrate({ [Segments.PARAMS]: ParamsSchema, [Segments.BODY]: BodySchema }), (req, res) => { productController.updateById(req, res) })

productRouter.delete('/:id', celebrate({ [Segments.PARAMS]: ParamsSchema }), (req, res) => { productController.deleteById(req, res) })

export { productRouter }
