import { celebrate, Segments } from 'celebrate'
import Router from 'express'

import { ProductsController } from '../controllers/product.controller'
import { BodySchema, ParamsSchema } from '../schemas/product.schema'

const productRouter = Router()

const productController = new ProductsController()

productRouter.get('/:id?', celebrate({ [Segments.PARAMS]: ParamsSchema }), productController.find)

productRouter.post('/', celebrate({ [Segments.BODY]: BodySchema }), productController.creatAndSave)

productRouter.patch('/:id', celebrate({ [Segments.PARAMS]: ParamsSchema, [Segments.BODY]: BodySchema }), productController.updateById)

productRouter.delete('/:id', celebrate({ [Segments.PARAMS]: ParamsSchema }), productController.deleteById)

export { productRouter }
