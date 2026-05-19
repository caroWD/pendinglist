import 'dotenv/config'

export const {
  NODE_ENV = 'development',
  PORT = '3000',
  DB_FILE_NAME = 'file:local.db',
} = process.env
