import mongoose from 'mongoose'

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
}

export { MongoRepository }
