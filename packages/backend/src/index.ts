import express from 'express'
import cookieParser from 'cookie-parser'
import { PORT } from './config/config.ts'
import { corsMiddleware } from './middlewares/corsMiddleware.ts'
import { errorMiddleware } from './middlewares/errorMiddleware.ts'
import { permissionRouter } from './modules/access-controls/globals/permissions/infrastructure/permissionRouter.ts'
import { roleRouter } from './modules/access-controls/globals/roles/infrastructure/roleRouter.ts'

const app = express()

app.use(express.json())
app.use(corsMiddleware())
app.use(cookieParser())

const pathBase: string = '/api/v1/'

app.use(`${pathBase}permission`, permissionRouter)
app.use(`${pathBase}role`, roleRouter)

app.use(errorMiddleware)

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
)
