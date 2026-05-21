import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { IRoleRepository } from '../domain/IRoleRepository.ts'
import type { Role } from '../domain/models/Role.ts'
import { RoleNotFoundError } from '../domain/RoleErrors.ts'

export class RemoveRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(id: string): Promise<void> {
    const roleToRemove: Role | null = await this._roleRepository.findOne(
      RootId.create(id)
    )
    if (!roleToRemove) throw new RoleNotFoundError('Role not found!')

    return await this._roleRepository.remove(roleToRemove.id)
  }
}
