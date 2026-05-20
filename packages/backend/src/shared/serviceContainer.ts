import { PermissionShared } from '../modules/access-controls/globals/permissions/infrastructure/services/PermissionShared.ts'
import { RoleShared } from '../modules/access-controls/globals/roles/infrastructure/services/RoleShared.ts'
import { TeamPermissionShared } from '../modules/access-controls/teams/team-permissions/infrastructure/services/TeamPermissionShared.ts'
import { TeamRoleShared } from '../modules/access-controls/teams/team-roles/infrastructure/services/TeamRoleShared.ts'
import { UserShared } from '../modules/auth/users/infrastructure/services/UserShared.ts'
import { TeamShared } from '../modules/workspaces/teams/infrastructure/services/TeamShared.ts'
import {
  permissionRepository,
  roleRepository,
  teamPermissionRepository,
  teamRepository,
  teamRoleRepository,
  userRepository,
} from './repositories.ts'

export const serviceContainer = {
  accessControl: {
    global: {
      permission: new PermissionShared(permissionRepository),
      role: new RoleShared(roleRepository, permissionRepository),
    },
    team: {
      permission: new TeamPermissionShared(teamPermissionRepository),
      role: new TeamRoleShared(teamRoleRepository, teamPermissionRepository),
    },
  },
  workspace: {
    team: new TeamShared(
      teamRepository,
      userRepository,
      teamRoleRepository,
      roleRepository
    ),
  },
  auth: {
    user: new UserShared(userRepository, roleRepository),
  },
}
