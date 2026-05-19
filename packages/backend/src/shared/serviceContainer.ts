import { PermissionShared } from '../modules/access-controls/globals/permissions/infrastructure/services/PermissionShared.ts'
import { permissionRepository } from './repositories.ts'

export const serviceContainer = {
  accessControl: {
    global: {
      permission: new PermissionShared(permissionRepository),
    },
  },
}
