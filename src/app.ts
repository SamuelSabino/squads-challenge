import express from 'express'

import { router } from './routers'
import { MongoRepository } from './services/mongo.service'

const app = express()

app.use(express.json())

app.use('/v1/products', router)

const startServer = async (): Promise<void> => {
  const mongoRepository = new MongoRepository()

  await mongoRepository.connectionDB()

  app.listen('8080', () => console.log('Server running on port 8080'))
}

startServer()
