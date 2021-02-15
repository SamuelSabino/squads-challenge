import { app } from './app'

const startServer = async (): Promise<void> => {
  app.listen('8080', () => console.log('Server running on port 8080'))
}

startServer()
