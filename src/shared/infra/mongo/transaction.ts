import mongoose, { ClientSession } from 'mongoose'

import { MongoRepository } from './repositories/mongo.repository'

let mongoRepository: MongoRepository
let session: ClientSession
let connection: typeof mongoose

beforeAll(async () => {
  console.log('INICIOU TRANSACTION')

  mongoRepository = new MongoRepository()

  connection = await mongoRepository.connectionDB()

  session = await mongoRepository.startTransaction(connection)
})

afterAll(async () => {
  await mongoRepository.rollbackTransaction(session)
  await mongoRepository.desconnectDB(connection)

  console.log('FINALIZOU TRANSACTION')
})
