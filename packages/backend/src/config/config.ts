import 'dotenv/config'

export const {
  NODE_ENV = 'development',
  PORT = '3000',
  DB_FILE_NAME = 'file:local.db',
  ACCEPTED_ORIGINS = 'http://localhost:3000',
  SALT_ROUNDS = '10',
  JWT_SECRET = 'a-string-secret-at-least-256-bits-long',
  JWT_ALG = 'HS256',
  JWT_ISSUER = 'urn:example:issuer',
  JWT_AUDIENCE = 'urn:example:audience',
  JWT_CLAIM = 'urn:example:claim',
} = process.env
