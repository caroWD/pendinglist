import 'dotenv/config'

export const {
  NODE_ENV = 'development',
  PORT = '3000',
  DB_FILE_NAME = 'file:local.db',
  ACCEPTED_ORIGINS = 'http://localhost:3000',
} = process.env
