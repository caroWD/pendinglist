import { defineConfig } from 'drizzle-kit'
import { DB_FILE_NAME } from './config.ts'

export default defineConfig({
  out: './drizzle',
  schema: './src/db/sqliteSchema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: DB_FILE_NAME,
  },
})
