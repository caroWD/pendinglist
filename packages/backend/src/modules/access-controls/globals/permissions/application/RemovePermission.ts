import type { IBaseRepository } from '../../../../primitives/bases/domain/IBaseRepository.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { Permission } from '../domain/models/Permission.ts'
import { PermissionNotFoundError } from '../domain/PermissionError.ts'

export class RemovePermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(id: string): Promise<void> {
    const permissionToRemove: Permission | null =
      await this._permissionRepository.findOne(RootId.create(id))
    if (!permissionToRemove)
      throw new PermissionNotFoundError('Permission not found!')

    return await this._permissionRepository.remove(permissionToRemove.id)
  }
}
