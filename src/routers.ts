import Router from 'express'

import { deleteProduct } from './controllers/products/deleteProduct.controller'
import { getAllProducts } from './controllers/products/getAllProducts.controller'
import { getProduct } from './controllers/products/getProduct.controller'
import { patchProduct } from './controllers/products/patchProduct.controller'
import { postProduct } from './controllers/products/postProduct.controller'

const router = Router()

router.get('/', getAllProducts)

router.get('/:id?', getProduct)

router.post('/', postProduct)

router.patch('', patchProduct)

router.delete('', deleteProduct)

export { router }
