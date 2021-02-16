import request from 'supertest'

import { IProductDTO } from '../../../src/modules/products/dtos/productDTO.interface'
import { productRouter } from '../../../src/modules/products/infra/http/routers/product.router'
import { app } from '../../../src/shared/infra/http/app'

describe('INTEGRAÇÃO | Update a Product Controller', () => {
  let productToSave: IProductDTO
  let productToUpdate: IProductDTO
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

    productToUpdate = {
      description: 'product description updated',
      name: 'product name updated',
      value: '500'
    }
  })

  test('Quando eu atualizo um produto com sucesso via request (statusCode 200).', async () => {
    const result = await request(app).patch(`/products/${productData._id}`).send(productToUpdate)

    expect(result.status).toBe(200)
  })
})
