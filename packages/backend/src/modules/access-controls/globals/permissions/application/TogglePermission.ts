import type { IBaseRepository } from '../../../../primitives/bases/domain/IBaseRepository.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { Permission } from '../domain/models/Permission.ts'
import { PermissionNotFoundError } from '../domain/PermissionError.ts'

export class TogglePermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(id: string): Promise<void> {
    const permissionToToggle: Permission | null =
      await this._permissionRepository.findOne(RootId.create(id))
    if (!permissionToToggle)
      throw new PermissionNotFoundError('Permission not found!')

    return await this._permissionRepository.toggle(permissionToToggle.id)
  }
}
