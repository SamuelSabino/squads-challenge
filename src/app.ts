import express from 'express'

import { MongoRepository } from './shared/infra/mongo/repositories/mongo.repository'
import { router } from './shared/infra/http/routers/index.router'

const app = express()

app.use(express.json())

app.use(router)

const startServer = async (): Promise<void> => {
  const mongoRepository = new MongoRepository()

  await mongoRepository.connectionDB()

  app.listen('8080', () => console.log('Server running on port 8080'))
}

startServer()
