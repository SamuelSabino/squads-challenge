import { MongoRepository } from '../mongo/repositories/mongo.repository'
import { app } from './app'

const startServer = async (): Promise<void> => {
  const mongoRepository = new MongoRepository()

  await mongoRepository.connectionDB()

  app.listen('8080', () => console.log('Server running on port 8080'))
}

startServer()
