import { RequestHandler } from 'express'

import { Product } from '../../models/product.model'

const postProduct: RequestHandler = (req, res) => {
  try {
    const product = new Product({
      name: req.body.data.name,
      description: req.body.data.description,
      value: req.body.data.value
    })

    product.save()

    res.status(200).json({ error: false, result: 'product successfully registered' })
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
}
export { postProduct }
