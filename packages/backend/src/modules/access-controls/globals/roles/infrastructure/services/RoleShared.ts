import type { IBaseRepository } from '../../../../../primitives/bases/domain/IBaseRepository.ts'
import type { Permission } from '../../../permissions/domain/models/Permission.ts'
import type { PermissionDto } from '../../../permissions/domain/models/PermissionDto.ts'
import { AddPermissionToRole } from '../../application/AddPermissionToRole.ts'
import { AddRole } from '../../application/AddRole.ts'
import { EditRole } from '../../application/EditRole.ts'
import { FindAllRole } from '../../application/FindAllRole.ts'
import { FindOneRole } from '../../application/FindOneRole.ts'
import { FindPermissionsForRole } from '../../application/FindPermissionsForRole.ts'
import { RemovePermissionToRole } from '../../application/RemovePermissionToRole.ts'
import { RemoveRole } from '../../application/RemoveRole.ts'
import { ToggleRole } from '../../application/ToggleRole.ts'
import type { IRoleRepository } from '../../domain/IRoleRepository.ts'
import type { RoleDto } from '../../domain/models/RoleDto.ts'

export class RoleShared {
  private readonly _add: AddRole
  private readonly _addPermissionToRole: AddPermissionToRole
  private readonly _edit: EditRole
  private readonly _toggle: ToggleRole
  private readonly _remove: RemoveRole
  private readonly _removePermissionToRole: RemovePermissionToRole
  private readonly _findAll: FindAllRole
  private readonly _findOne: FindOneRole
  private readonly _findPermissionForRole: FindPermissionsForRole

  constructor(
    roleRepository: IRoleRepository,
    permissionRepository: IBaseRepository<Permission>
  ) {
    this._add = new AddRole(roleRepository)
    this._addPermissionToRole = new AddPermissionToRole(
      roleRepository,
      permissionRepository
    )
    this._edit = new EditRole(roleRepository)
    this._toggle = new ToggleRole(roleRepository)
    this._remove = new RemoveRole(roleRepository)
    this._removePermissionToRole = new RemovePermissionToRole(
      roleRepository,
      permissionRepository
    )
    this._findAll = new FindAllRole(roleRepository)
    this._findOne = new FindOneRole(roleRepository)
    this._findPermissionForRole = new FindPermissionsForRole(roleRepository)
  }

  async add(id: string, name: string, description: string): Promise<void> {
    return await this._add.handler(id, name, description)
  }

  async addPermissionToRole(
    roleId: string,
    permissionId: string
  ): Promise<void> {
    return await this._addPermissionToRole.handler(roleId, permissionId)
  }

  async edit(id: string, name: string, description: string): Promise<void> {
    return await this._edit.handler(id, name, description)
  }

  async toggle(id: string): Promise<void> {
    return await this._toggle.handler(id)
  }

  async remove(id: string): Promise<void> {
    return await this._remove.handler(id)
  }

  async removePermissionToRole(
    roleId: string,
    permissionId: string
  ): Promise<void> {
    return await this._removePermissionToRole.handler(roleId, permissionId)
  }

  async findAll(): Promise<RoleDto[]> {
    return await this._findAll.handler()
  }

  async findOne(id: string): Promise<RoleDto> {
    return await this._findOne.handler(id)
  }

  async findPermissionForRole(roleId: string): Promise<PermissionDto[]> {
    return await this._findPermissionForRole.handler(roleId)
  }
}
