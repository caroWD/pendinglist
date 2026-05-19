import { createClient } from '@libsql/client'
import { DB_FILE_NAME } from './config.ts'
import { drizzle } from 'drizzle-orm/libsql'
import {
  permissionsTableSqlite,
  rolePermissionsTableSqlite,
  rolesTableSqlite,
  teamPermissionsTableSqlite,
  teamRolesTableSqlite,
  teamRoleTeamPermissionsTableSqlite,
} from '../db/sqliteSchema.ts'
import { sqliteTeamPermissions } from './initial-records/sqlite/sqliteTeamPermissions.ts'
import { sqliteTeamRoles } from './initial-records/sqlite/sqliteTeamRoles.ts'
import { sqliteTeamRoleTeamPermissions } from './initial-records/sqlite/sqliteTeamRoleTeamPermissions.ts'
import { sqlitePermissions } from './initial-records/sqlite/sqlitePermissions.ts'
import { sqliteRoles } from './initial-records/sqlite/sqliteRoles.ts'
import { sqliteRolePermissions } from './initial-records/sqlite/sqliteRolePermissions.ts'

const client = createClient({ url: DB_FILE_NAME })
const db = drizzle({ client })

const main = async (): Promise<void> => {
  await db.insert(teamPermissionsTableSqlite).values(sqliteTeamPermissions)

  await db.insert(teamRolesTableSqlite).values(sqliteTeamRoles)

  await db
    .insert(teamRoleTeamPermissionsTableSqlite)
    .values(sqliteTeamRoleTeamPermissions)

  await db.insert(permissionsTableSqlite).values(sqlitePermissions)

  await db.insert(rolesTableSqlite).values(sqliteRoles)

  await db.insert(rolePermissionsTableSqlite).values(sqliteRolePermissions)
}

main()
