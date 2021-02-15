import { MongoRepository } from '../mongo/repositories/mongo.repository'

const connection = async (): Promise<void> => {
  const mongoRepository = new MongoRepository()

  await mongoRepository.connectionDB()
}

export { connection }
