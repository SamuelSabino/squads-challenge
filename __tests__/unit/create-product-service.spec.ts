import { FakeProductRepository } from '../../src/modules/products/infra/fake/repositories/fake-product.repository'
import IProductRepository from '../../src/modules/products/interfaces/product.interface'
import { CreateProductService } from '../../src/modules/products/services/create-product.service'

describe('UNIDADE | Create Product Service', () => {
  let productRepository: IProductRepository
  let createProductService: CreateProductService

  beforeEach(async () => {
    productRepository = new FakeProductRepository()
    createProductService = new CreateProductService(productRepository)
  })

  test('[ERROR] Quando eu tento cadastrar um produto com o nome preenchido incorretamente (nome muito curto).', (done) => {
    const productData = {
      description: 'description product',
      name: '',
      value: '100'
    }

    const result = createProductService.execute(productData)

    expect(result).rejects.toThrow('Produto precisa ter mais que dois caracteres.')
    done()
  })

  test('[ERROR] Quando eu tento cadastrar um produto com a descrição vazia.', (done) => {
    const productData = {
      description: '',
      name: 'product name',
      value: '100'
    }

    const result = createProductService.execute(productData)

    expect(result).rejects.toThrow('Descrição não pode estar vazia.')
    done()
  })

  test('[ERROR] Quando eu tento cadastrar um produto com o valor de produto igual a zero', async (done) => {
    const productData = {
      description: 'description product',
      name: 'product name',
      value: '0'
    }

    const result = createProductService.execute(productData)

    expect(result).rejects.toThrow('Valor do produto precisa ser maior que zero.')
    done()
  })

  test('Quando eu cadastro um produto com sucesso.', async (done) => {
    const productData = {
      description: 'description product',
      name: 'product name',
      value: '100'
    }

    const result = await createProductService.execute(productData)

    expect(result).toMatchObject({ ...productData, id: '1', active: true })

    done()
  })
})
