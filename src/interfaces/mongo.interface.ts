import mongoose from 'mongoose'

export interface IMongoRepository {
  connectionDB(): Promise<typeof mongoose>;
}
