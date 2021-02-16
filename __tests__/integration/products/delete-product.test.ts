import request from 'supertest'

import { IProductDTO } from '../../../src/modules/products/dtos/productDTO.interface'
import { productRouter } from '../../../src/modules/products/infra/http/routers/product.router'
import { app } from '../../../src/shared/infra/http/app'

describe('INTEGRAÇÃO | Delete a Product Controller', () => {
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

  test('Quando eu deleto um produto com sucesso via request.', async () => {
    const result = await request(app).delete(`/products/${productData._id}`)

    expect(result.body.result).toBe('Product successfully deleted')
  })
})
