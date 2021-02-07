import express from 'express'

import { router } from './routers'

const app = express()

app.use(express.json())

app.use('/v1/products', router)

app.listen('8080', () => console.log('Server running on port 8080'))
