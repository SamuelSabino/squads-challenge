import { RequestHandler } from 'express'

const deleteProduct: RequestHandler = (req, res) => {
  const idProduct = req.params.id

  res.json('' + idProduct)
}

export { deleteProduct }
