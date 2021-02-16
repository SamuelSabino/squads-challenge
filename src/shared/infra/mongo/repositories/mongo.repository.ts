import mongoose, { ClientSession } from 'mongoose'

import { IMongoRepository } from '../interfaces/mongo.interface'

class MongoRepository implements IMongoRepository {
  async connectionDB (): Promise<typeof mongoose> {
    return new Promise((resolve, reject) => {
      const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true }

      mongoose
        .connect('mongodb://db:27017', mongooseOptions)
        .then((result) => {
          console.log('MongoDB Conectado')

          resolve(result)
        })
        .catch((error) => reject(error))
    })
  }

  async desconnectDB (connection: typeof mongoose): Promise<void> {
    connection.disconnect()
  }

  async startTransaction (connection: typeof mongoose): Promise<ClientSession> {
    const session = await connection.startSession()

    session.startTransaction()

    return session
  }

  async rollbackTransaction (session: ClientSession): Promise<void> {
    await session.abortTransaction()

    session.endSession()
  }
}

export { MongoRepository }
