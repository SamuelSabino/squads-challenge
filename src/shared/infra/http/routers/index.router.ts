import { Router } from 'express'

import { productRouter } from '../../../../modules/products/infra/http/routers/product.router'

const router = Router()

router.use('/product', productRouter)

export { router }
