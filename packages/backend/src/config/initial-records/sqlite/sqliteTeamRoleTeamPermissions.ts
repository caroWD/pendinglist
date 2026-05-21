import type { teamRoleTeamPermissionsTableSqlite } from '../../../db/sqliteSchema.ts'
import { sqliteTeamPermissions } from './sqliteTeamPermissions.ts'
import { sqliteTeamRoles } from './sqliteTeamRoles.ts'

export const sqliteTeamRoleTeamPermissions: (typeof teamRoleTeamPermissionsTableSqlite.$inferInsert)[] =
  []

sqliteTeamRoles.forEach((teamRole) =>
  sqliteTeamPermissions.forEach((teamPermission) => {
    if (teamRole.slug === 'team-owner')
      sqliteTeamRoleTeamPermissions.push({
        teamRoleId: teamRole.id,
        teamPermissionId: teamPermission.id,
      })

    if (
      teamRole.slug === 'team-manager' &&
      teamPermission.slug !== 'team-settings-edit' &&
      teamPermission.slug !== 'team-delete'
    )
      sqliteTeamRoleTeamPermissions.push({
        teamRoleId: teamRole.id,
        teamPermissionId: teamPermission.id,
      })

    if (
      teamRole.slug === 'contributor' &&
      (teamPermission.slug === 'task-add' ||
        teamPermission.slug === 'task-update' ||
        teamPermission.slug === 'task-remove' ||
        teamPermission.slug === 'team-reports-view')
    )
      sqliteTeamRoleTeamPermissions.push({
        teamRoleId: teamRole.id,
        teamPermissionId: teamPermission.id,
      })

    if (
      teamRole.slug === 'observer' &&
      teamPermission.slug === 'team-reports-view'
    )
      sqliteTeamRoleTeamPermissions.push({
        teamRoleId: teamRole.id,
        teamPermissionId: teamPermission.id,
      })
  })
)
