import { RequestHandler } from 'express'

const getProduct: RequestHandler = (req, res) => {
  const id = req.params.id

  res.json('' + id)
}

export { getProduct }
