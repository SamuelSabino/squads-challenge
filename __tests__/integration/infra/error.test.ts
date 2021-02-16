import request from 'supertest'

import { IProductDTO } from '../../../src/modules/products/dtos/productDTO.interface'
import { productRouter } from '../../../src/modules/products/infra/http/routers/product.router'
import { app } from '../../../src/shared/infra/http/app'

describe('INTEGRAÇÃO | Internal Error Project', () => {
  let productData: IProductDTO

  beforeAll(() => {
    app.use('/', productRouter)
  })

  test('Quando eu tento acessar uma rota existente e gero um erro não mapeado pelo serviço.', async () => {
    const result = await request(app).post('/products').send(productData)

    expect(result.status).toBe(500)
  })

  test('Quando eu tento acessar uma rota não existente e gero um erro mapeado pelo serviço.', async () => {
    const result = await request(app).post('/product').send(productData)

    expect(result.status).toBe(404)
  })
})
