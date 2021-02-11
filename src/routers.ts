import { celebrate, Segments } from 'celebrate'
import Router from 'express'

import { ProductsController } from './controllers/product.controller'
import { BodySchema, ParamsSchema } from './schema/product.schema'

const router = Router()

const productController = new ProductsController()

router.get('/:id?', celebrate({ [Segments.PARAMS]: ParamsSchema }), productController.find)

router.post('/', celebrate({ [Segments.BODY]: BodySchema }), productController.creatAndSave)

router.patch('/:id', celebrate({ [Segments.PARAMS]: ParamsSchema, [Segments.BODY]: BodySchema }), productController.updateById)

router.delete('/:id', celebrate({ [Segments.PARAMS]: ParamsSchema }), productController.deleteById)

export { router }
