import { createClient } from '@libsql/client'
import { DB_FILE_NAME } from '../config/config.ts'
import { drizzle } from 'drizzle-orm/libsql'
import { DrizzleSqlitePermissionRepository } from '../modules/access-controls/globals/permissions/infrastructure/repositories/DrizzleSqlitePermissionRepository.ts'

const client = createClient({ url: DB_FILE_NAME })
const sqlite = drizzle({ client })

export const permissionRepository = new DrizzleSqlitePermissionRepository(
  sqlite
)
