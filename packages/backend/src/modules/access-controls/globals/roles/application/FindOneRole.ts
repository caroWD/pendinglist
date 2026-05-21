import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { IRoleRepository } from '../domain/IRoleRepository.ts'
import type { Role } from '../domain/models/Role.ts'
import { RoleDto } from '../domain/models/RoleDto.ts'
import { RoleNotFoundError } from '../domain/RoleErrors.ts'

export class FindOneRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(id: string): Promise<RoleDto> {
    const roleFinded: Role | null = await this._roleRepository.findOne(
      RootId.create(id)
    )
    if (!roleFinded) throw new RoleNotFoundError('Role not found!')

    return new RoleDto(
      roleFinded.id.value,
      roleFinded.name.value,
      roleFinded.description.value,
      roleFinded.state.value === 'ACTIVE' ? false : true,
      roleFinded.createdAt.value.toJSON(),
      roleFinded.updatedAt.value.toJSON(),
      roleFinded.archivedAt.value?.toJSON() || null
    )
  }
}
