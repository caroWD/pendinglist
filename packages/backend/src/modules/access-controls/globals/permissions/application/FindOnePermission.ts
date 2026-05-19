import type { IBaseRepository } from '../../../../primitives/bases/domain/IBaseRepository.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { Permission } from '../domain/models/Permission.ts'
import { PermissionDto } from '../domain/models/PermissionDto.ts'
import { PermissionNotFoundError } from '../domain/PermissionError.ts'

export class FindOnePermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(id: string): Promise<PermissionDto> {
    const permissionFinded: Permission | null =
      await this._permissionRepository.findOne(RootId.create(id))
    if (!permissionFinded)
      throw new PermissionNotFoundError('Permission not found!')

    return new PermissionDto(
      permissionFinded.id.value,
      permissionFinded.name.value,
      permissionFinded.description.value,
      permissionFinded.state.value === 'ACTIVE' ? false : true,
      permissionFinded.createdAt.value.toJSON(),
      permissionFinded.updatedAt.value.toJSON(),
      permissionFinded.archivedAt.value?.toJSON() || null
    )
  }
}
