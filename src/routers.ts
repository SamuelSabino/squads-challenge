import { celebrate, Joi, Segments } from 'celebrate'
import Router from 'express'
import { ProductsController } from './controllers/product.controller'

const router = Router()

const productController = new ProductsController()

const celebrateParams = celebrate({ [Segments.PARAMS]: { id: Joi.string().required() } })

const celebrateBody = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.string().required()
  }
})

router.get('/', productController.findAll)

router.get('/:id?', celebrateParams, productController.findbyId)

router.post('/', celebrateBody, productController.creatAndSave)

router.patch('/:id', celebrateBody, productController.updateById)

router.delete('/:id', celebrateParams, productController.deleteById)

export { router }
