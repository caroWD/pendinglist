import type { IBaseRepository } from '../../../../primitives/bases/domain/IBaseRepository.ts'
import type { Permission } from '../domain/models/Permission.ts'
import { PermissionDto } from '../domain/models/PermissionDto.ts'

export class FindAllPermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(): Promise<PermissionDto[]> {
    const permissions: Permission[] = await this._permissionRepository.findAll()

    return !permissions.length
      ? []
      : permissions.map(
          (permission) =>
            new PermissionDto(
              permission.id.value,
              permission.name.value,
              permission.description.value,
              permission.state.value === 'ACTIVE' ? false : true,
              permission.createdAt.value.toJSON(),
              permission.updatedAt.value.toJSON(),
              permission.archivedAt.value?.toJSON() || null
            )
        )
  }
}
