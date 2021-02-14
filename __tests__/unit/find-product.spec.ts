import { IProductDTO } from '../../src/modules/products/dtos/productDTO.interface'
import { FakeProductRepository } from '../../src/modules/products/infra/fake/repositories/fake-product.repository'
import IProductRepository from '../../src/modules/products/interfaces/product.interface'
import { CreateProductService } from '../../src/modules/products/services/create-product.service'
import { FindProductService } from '../../src/modules/products/services/find-product.service'

describe('UNIDADE | Find Product Service', () => {
  let productRepository: IProductRepository
  let findProductService: FindProductService
  let createProductService: CreateProductService
  let productData: IProductDTO

  beforeEach(async () => {
    productRepository = new FakeProductRepository()

    findProductService = new FindProductService(productRepository)
    createProductService = new CreateProductService(productRepository)

    const productToSave = {
      description: 'description product',
      name: 'product name',
      value: '100'
    }

    productData = await createProductService.execute(productToSave)
  })

  test('Quando eu procuro um produto passando o id na busca.', async (done) => {
    const productId = productData.id

    const result = await findProductService.execute(productId)

    expect(result).toMatchObject(productData)
    done()
  })

  test('Quando eu procuro varios produtos', async (done) => {
    const result = await findProductService.execute()

    expect(result).toHaveLength(1)
    done()
  })
})
