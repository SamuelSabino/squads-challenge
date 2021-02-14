import { IProductDTO } from '../../src/modules/products/dtos/productDTO.interface'
import { FakeProductRepository } from '../../src/modules/products/infra/fake/repositories/fake-product.repository'
import IProductRepository from '../../src/modules/products/interfaces/product.interface'
import { CreateProductService } from '../../src/modules/products/services/create-product.service'
import { DeleteProductService } from '../../src/modules/products/services/delete-product.service'

describe('UNIDADE | Delete Product Service', () => {
  let productRepository: IProductRepository
  let deleteProductService: DeleteProductService
  let createProductService: CreateProductService
  let productData: IProductDTO

  beforeEach(async () => {
    productRepository = new FakeProductRepository()

    deleteProductService = new DeleteProductService(productRepository)
    createProductService = new CreateProductService(productRepository)

    const productToSave = {
      description: 'description product',
      name: 'product name',
      value: '100'
    }

    productData = await createProductService.execute(productToSave)
  })

  test('[ERROR] Quando eu tento deletar um produto e não informo o id correspondente.', (done) => {
    const result = deleteProductService.execute('')

    expect(result).rejects.toThrow('Id invalido ou não informado.')
    done()
  })

  test('[ERROR] Quando eu tento deletar um produto e o mesmo não é encontrado.', (done) => {
    const result = deleteProductService.execute('id')

    expect(result).rejects.toThrow('Produto não encontrado, verifique se o mesmo já não foi deletado.')
    done()
  })

  test('Quando eu deleto um produto', async (done) => {
    const productId = productData.id as string

    const result = await deleteProductService.execute(productId)

    expect(result).toBe(undefined)
    done()
  })
})
