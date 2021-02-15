import { FakeProductRepository } from '../../src/modules/products/infra/fake/repositories/fake-product.repository'
import IProductRepository from '../../src/modules/products/interfaces/product.interface'
import { CreateProductService } from '../../src/modules/products/services/create-product.service'

describe.only('UNIDADE | Create Product Service', () => {
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

    expect(result).rejects.toMatchObject({ message: 'Produto precisa ter mais que dois caracteres.', statusCode: 400 })
    done()
  })

  test('[ERROR] Quando eu tento cadastrar um produto com a descrição vazia.', (done) => {
    const productData = {
      description: '',
      name: 'product name',
      value: '100'
    }

    const result = createProductService.execute(productData)

    expect(result).rejects.toMatchObject({ message: 'Descrição não pode estar vazia.', statusCode: 400 })
    done()
  })

  test('[ERROR] Quando eu tento cadastrar um produto com o valor de produto igual a zero', async (done) => {
    const productData = {
      description: 'description product',
      name: 'product name',
      value: '0'
    }

    const result = createProductService.execute(productData)

    expect(result).rejects.toMatchObject({ message: 'Valor do produto precisa ser maior que zero.', statusCode: 400 })
    done()
  })

  test('Quando eu cadastro um produto com sucesso.', async (done) => {
    const productData = {
      description: 'description product',
      name: 'product name',
      value: '100'
    }

    const result = await createProductService.execute(productData)

    expect(result).toMatchObject({ ...productData, _id: '1', active: true })

    done()
  })
})
