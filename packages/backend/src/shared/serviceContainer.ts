import { PermissionShared } from '../modules/access-controls/globals/permissions/infrastructure/services/PermissionShared.ts'
import { RoleShared } from '../modules/access-controls/globals/roles/infrastructure/services/RoleShared.ts'
import { permissionRepository, roleRepository } from './repositories.ts'

export const serviceContainer = {
  accessControl: {
    global: {
      permission: new PermissionShared(permissionRepository),
      role: new RoleShared(roleRepository, permissionRepository),
    },
  },
}
