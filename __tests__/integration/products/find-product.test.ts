import request from 'supertest'

import { IProductDTO } from '../../../src/modules/products/dtos/productDTO.interface'
import { productRouter } from '../../../src/modules/products/infra/http/routers/product.router'
import { app } from '../../../src/shared/infra/http/app'

describe('INTEGRAÇÃO | Find a Product Controller', () => {
  let productToSave: IProductDTO
  let productData: IProductDTO

  beforeAll(async () => {
    app.use('/products', productRouter)

    productToSave = {
      description: 'description product',
      name: 'product name',
      value: '100'
    }

    const result = await request(app).post('/products').send(productToSave)

    productData = result.body.result
  })

  test('Quando eu procuro um produto com sucesso via request.', async () => {
    const result = await request(app).get(`/products/${productData._id}`)

    expect(result.body.result).toMatchObject(productData)
  })

  test('Quando eu procuro uma lista de produtos com sucesso via request.', async () => {
    const result = await request(app).get('/products/')

    expect(result.body.result.length).toBeGreaterThanOrEqual(1)
  })
})
