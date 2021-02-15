import request from 'supertest'

import { IProductDTO } from '../../src/modules/products/dtos/productDTO.interface'
import { productRouter } from '../../src/modules/products/infra/http/routers/product.router'
import { app } from '../../src/shared/infra/http/app'

describe('INTEGRAÇÃO | Create a Product Controller', () => {
  let productData: IProductDTO

  beforeAll(() => {
    app.use('/products', productRouter)

    productData = {
      description: 'description product',
      name: 'product name',
      value: '100'
    }
  })

  test('Quando eu cadastro um produto com sucesso via request (statusCode 200).', async () => {
    const result = await request(app).post('/products').send(productData)

    expect(result.status).toBe(200)
  })
})
