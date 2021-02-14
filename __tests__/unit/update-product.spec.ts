import { IProductDTO } from '../../src/modules/products/dtos/productDTO.interface'
import { FakeProductRepository } from '../../src/modules/products/infra/fake/repositories/fake-product.repository'
import IProductRepository from '../../src/modules/products/interfaces/product.interface'
import { CreateProductService } from '../../src/modules/products/services/create-product.service'
import { UpdateProductService } from '../../src/modules/products/services/update-product.service'

describe('UNIDADE | Update Product Service', () => {
  let productRepository: IProductRepository
  let createProductService: CreateProductService
  let updateProductService: UpdateProductService
  let productData: IProductDTO

  beforeEach(async () => {
    productRepository = new FakeProductRepository()
    createProductService = new CreateProductService(productRepository)
    updateProductService = new UpdateProductService(productRepository)

    const productToSave = {
      description: 'product description',
      name: 'product name',
      value: '100'
    }

    productData = await createProductService.execute(productToSave)
  })

  test('[ERROR] Quando eu tento atualizar um produto e não informo o id correspondente.', (done) => {
    const productToUpdate = {
      description: 'product description',
      name: 'product name',
      value: '100'
    }

    const result = updateProductService.execute(productToUpdate)

    expect(result).rejects.toThrow('Id invalido ou não informado.')
    done()
  })

  test('[ERROR] Quando eu tento cadastrar um produto com o nome preenchido incorretamente (nome muito curto).', (done) => {
    const productToUpdate = {
      id: productData.id,
      description: 'product description',
      name: '',
      value: '100'
    }

    const result = updateProductService.execute(productToUpdate)

    expect(result).rejects.toThrow('Produto precisa ter mais que dois caracteres.')
    done()
  })

  test('[ERROR] Quando eu tento cadastrar um produto com a descrição vazia.', (done) => {
    const productToUpdate = {
      id: productData.id,
      description: '',
      name: 'product name',
      value: '100'
    }

    const result = updateProductService.execute(productToUpdate)

    expect(result).rejects.toThrow('Descrição não pode estar vazia.')
    done()
  })

  test('[ERROR] Quando eu tento cadastrar um produto com o valor de produto igual a zero', async (done) => {
    const productToUpdate = {
      id: productData.id,
      description: 'product description',
      name: 'product name',
      value: '0'
    }

    const result = updateProductService.execute(productToUpdate)

    expect(result).rejects.toThrow('Valor do produto precisa ser maior que zero.')
    done()
  })

  test('Quando eu atualizo um produto com sucesso.', async (done) => {
    const productToUpdate = {
      id: productData.id,
      description: 'product description updated',
      name: 'product name updated',
      value: '500'
    }

    const result = await updateProductService.execute(productToUpdate)

    expect(result).toMatchObject(productToUpdate)

    done()
  })
})
