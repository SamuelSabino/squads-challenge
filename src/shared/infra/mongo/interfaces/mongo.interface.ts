import mongoose, { ClientSession } from 'mongoose'

export interface IMongoRepository {
  connectionDB(): Promise<typeof mongoose>;
  desconnectDB(connection: typeof mongoose): Promise<void>;
  startTransaction(connection: typeof mongoose): Promise<ClientSession>;
  rollbackTransaction(session: ClientSession): Promise<void>;
}
