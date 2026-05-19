import express from 'express'
import cookieParser from 'cookie-parser'
import { PORT } from './config/config.ts'
import { corsMiddleware } from './middlewares/corsMiddleware.ts'
import { errorMiddleware } from './middlewares/errorMiddleware.ts'

const app = express()

app.use(express.json())
app.use(corsMiddleware())
app.use(cookieParser())

app.get('/', (_req, res) => res.send('Hello World!'))

app.use(errorMiddleware)

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
)
