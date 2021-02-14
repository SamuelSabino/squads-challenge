import express, { NextFunction, Request, Response } from 'express'

import { AppError } from './shared/errors/app.error'
import { router } from './shared/infra/http/routers/index.router'
import { MongoRepository } from './shared/infra/mongo/repositories/mongo.repository'

const app = express()

app.use(express.json())

app.use(router)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message })
  }

  console.log(err)

  return response.status(500).json({ status: 'error', message: 'Erro interno do servidor.' })
})

const startServer = async (): Promise<void> => {
  const mongoRepository = new MongoRepository()

  await mongoRepository.connectionDB()

  app.listen('8080', () => console.log('Server running on port 8080'))
}

startServer()
