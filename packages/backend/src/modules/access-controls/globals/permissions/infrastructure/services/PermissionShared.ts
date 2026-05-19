import type { IBaseRepository } from '../../../../../primitives/bases/domain/IBaseRepository.ts'
import { AddPermission } from '../../application/AddPermission.ts'
import { EditPermission } from '../../application/EditPermission.ts'
import { FindAllPermission } from '../../application/FindAllPermission.ts'
import { FindOnePermission } from '../../application/FindOnePermission.ts'
import { RemovePermission } from '../../application/RemovePermission.ts'
import { TogglePermission } from '../../application/TogglePermission.ts'
import type { Permission } from '../../domain/models/Permission.ts'
import type { PermissionDto } from '../../domain/models/PermissionDto.ts'

export class PermissionShared {
  private readonly _add: AddPermission
  private readonly _edit: EditPermission
  private readonly _toggle: TogglePermission
  private readonly _remove: RemovePermission
  private readonly _findAll: FindAllPermission
  private readonly _findOne: FindOnePermission

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._add = new AddPermission(permissionRepository)
    this._edit = new EditPermission(permissionRepository)
    this._toggle = new TogglePermission(permissionRepository)
    this._remove = new RemovePermission(permissionRepository)
    this._findAll = new FindAllPermission(permissionRepository)
    this._findOne = new FindOnePermission(permissionRepository)
  }

  async add(id: string, name: string, description: string): Promise<void> {
    return await this._add.handler(id, name, description)
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

  async findAll(): Promise<PermissionDto[]> {
    return await this._findAll.handler()
  }

  async findOne(id: string): Promise<PermissionDto> {
    return await this._findOne.handler(id)
  }
}
