import type { rolePermissionsTableSqlite } from '../../../db/sqliteSchema.ts'
import { sqlitePermissions } from './sqlitePermissions.ts'
import { sqliteRoles } from './sqliteRoles.ts'

export const sqliteRolePermissions: (typeof rolePermissionsTableSqlite.$inferInsert)[] =
  []

sqliteRoles.forEach((role) =>
  sqlitePermissions.forEach((permission) => {
    if (role.slug === 'super-admin')
      sqliteRolePermissions.push({
        roleId: role.id,
        permissionId: permission.id,
      })

    if (
      role.slug === 'technical-support' &&
      permission.slug !== 'system-config-view' &&
      permission.slug !== 'system-config-manage' &&
      permission.slug !== 'users-manage'
    )
      sqliteRolePermissions.push({
        roleId: role.id,
        permissionId: permission.id,
      })

    if (
      role.slug === 'premium-user' &&
      (permission.slug === 'teams-view' ||
        permission.slug === 'reports-global-view')
    )
      sqliteRolePermissions.push({
        roleId: role.id,
        permissionId: permission.id,
      })

    if (role.slug === 'standard-user' && permission.slug === 'teams-view')
      sqliteRolePermissions.push({
        roleId: role.id,
        permissionId: permission.id,
      })

    if (role.slug === 'guest-user' && permission.slug === 'reports-global-view')
      sqliteRolePermissions.push({
        roleId: role.id,
        permissionId: permission.id,
      })
  })
)
