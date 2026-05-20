import type { IBaseRepository } from '../../../../primitives/bases/domain/IBaseRepository.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { Permission } from '../../permissions/domain/models/Permission.ts'
import { PermissionNotFoundError } from '../../permissions/domain/PermissionError.ts'
import type { IRoleRepository } from '../domain/IRoleRepository.ts'
import type { Role } from '../domain/models/Role.ts'
import {
  RoleDoesNotHaveThatPermissionError,
  RoleNotFoundError,
} from '../domain/RoleErrors.ts'

export class RemovePermissionToRole {
  private readonly _roleRepository: IRoleRepository
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(
    roleRepository: IRoleRepository,
    permissionRepository: IBaseRepository<Permission>
  ) {
    this._roleRepository = roleRepository
    this._permissionRepository = permissionRepository
  }

  async handler(roleId: string, permissionId: string): Promise<void> {
    const role: Role | null = await this._roleRepository.findOne(
      RootId.create(roleId)
    )
    if (!role) throw new RoleNotFoundError('Role not found!')

    const permission: Permission | null =
      await this._permissionRepository.findOne(RootId.create(permissionId))
    if (!permission)
      throw new PermissionNotFoundError('Permission already exists!')

    const rolePermissionExists: boolean =
      await this._roleRepository.ensureRoleHasThisPermission(
        role.id,
        permission.id
      )
    if (!rolePermissionExists)
      throw new RoleDoesNotHaveThatPermissionError(
        'Role does not have that Permission. '
      )

    return await this._roleRepository.removePermissionToRole(
      role.id,
      permission.id
    )
  }
}
