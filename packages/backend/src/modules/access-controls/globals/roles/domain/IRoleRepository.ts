import type { IBaseRepository } from '../../../../primitives/bases/domain/IBaseRepository.ts'
import type { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { Permission } from '../../permissions/domain/models/Permission.ts'
import type { Role } from './models/Role.ts'

export interface IRoleRepository extends IBaseRepository<Role> {
  addPermissionToRole(roleId: RootId, permissionId: RootId): Promise<void>

  removePermissionToRole(roleId: RootId, permissionId: RootId): Promise<void>

  findPermissionsForRole(roleId: RootId): Promise<Permission[]>

  ensureRoleHasThisPermission(
    roleId: RootId,
    permissionId: RootId
  ): Promise<boolean>
}
