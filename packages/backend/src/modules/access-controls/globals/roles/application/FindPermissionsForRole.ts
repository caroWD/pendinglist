import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { Permission } from '../../permissions/domain/models/Permission.ts'
import { PermissionDto } from '../../permissions/domain/models/PermissionDto.ts'
import type { IRoleRepository } from '../domain/IRoleRepository.ts'

export class FindPermissionsForRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(roleId: string): Promise<PermissionDto[]> {
    const permissions: Permission[] =
      await this._roleRepository.findPermissionsForRole(RootId.create(roleId))

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
