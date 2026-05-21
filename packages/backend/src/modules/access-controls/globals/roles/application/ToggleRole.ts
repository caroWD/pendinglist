import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { IRoleRepository } from '../domain/IRoleRepository.ts'
import type { Role } from '../domain/models/Role.ts'
import { RoleNotFoundError } from '../domain/RoleErrors.ts'

export class ToggleRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(id: string): Promise<void> {
    const roleToToggle: Role | null = await this._roleRepository.findOne(
      RootId.create(id)
    )
    if (!roleToToggle) throw new RoleNotFoundError('Role not found!')

    return await this._roleRepository.toggle(roleToToggle.id)
  }
}
