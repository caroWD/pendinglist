import { createClient } from '@libsql/client'
import { DB_FILE_NAME } from '../config/config.ts'
import { drizzle } from 'drizzle-orm/libsql'
import { DrizzleSqlitePermissionRepository } from '../modules/access-controls/globals/permissions/infrastructure/repositories/DrizzleSqlitePermissionRepository.ts'
import { DrizzleSqliteRoleRepository } from '../modules/access-controls/globals/roles/infrastructure/repositories/DrizzleSqliteRoleRepository.ts'
import { DrizzleSqliteTeamPermissionRepository } from '../modules/access-controls/teams/team-permissions/infrastructure/repositories/DrizzleSqliteTeamPermissionRepository.ts'
import { DrizzleSqliteTeamRoleRepository } from '../modules/access-controls/teams/team-roles/infrastructure/repositories/DrizzleSqliteTeamRoleRepository.ts'
import { DrizzleSqliteTeamRepository } from '../modules/workspaces/teams/infrastructure/repositories/DrizzleSqliteTeamRepository.ts'
import { DrizzleSqliteUserRepository } from '../modules/auth/users/infrastructure/repositories/DrizzleSqliteUserRepository.ts'

const client = createClient({ url: DB_FILE_NAME })
const sqlite = drizzle({ client })

export const permissionRepository = new DrizzleSqlitePermissionRepository(
  sqlite
)
export const roleRepository = new DrizzleSqliteRoleRepository(sqlite)

export const teamPermissionRepository =
  new DrizzleSqliteTeamPermissionRepository(sqlite)
export const teamRoleRepository = new DrizzleSqliteTeamRoleRepository(sqlite)

export const teamRepository = new DrizzleSqliteTeamRepository(sqlite)

export const userRepository = new DrizzleSqliteUserRepository(sqlite)
