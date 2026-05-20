import { getTemporalNow } from '../../../../../helpers/temporalHelper.ts'
import { BaseDescription } from '../../../../primitives/bases/domain/value-objects/BaseDescription.ts'
import { BaseName } from '../../../../primitives/bases/domain/value-objects/BaseName.ts'
import { BaseSlug } from '../../../../primitives/bases/domain/value-objects/BaseSlug.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import { RootState } from '../../../../primitives/roots/domain/value-objects/RootState.ts'
import { TempoArchivedAt } from '../../../../primitives/tempos/domain/value-objects/TempoArchivedAt.ts'
import { TempoCreatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoCreatedAt.ts'
import { TempoUpdatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoUpdatedAt.ts'
import type { IRoleRepository } from '../domain/IRoleRepository.ts'
import { Role } from '../domain/models/Role.ts'
import {
  RoleAlreadyExistsError,
  RoleNotFoundError,
} from '../domain/RoleErrors.ts'

export class EditRole {
  private readonly _roleRepository: IRoleRepository

  constructor(roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const roleToEdit: Role | null = await this._roleRepository.findOne(
      RootId.create(id)
    )
    if (!roleToEdit) throw new RoleNotFoundError('Role not found!')

    const roleName: BaseName = BaseName.create(name)
    const roleSlug: BaseSlug = BaseSlug.create(roleName.value)

    if (roleSlug.value !== roleToEdit.slug.value) {
      const roleExists: boolean =
        await this._roleRepository.ensureAlreadyExists(roleSlug)
      if (roleExists) throw new RoleAlreadyExistsError('Role already exists!')
    }

    return await this._roleRepository.edit(
      new Role(
        roleToEdit.id,
        roleSlug,
        roleName,
        BaseDescription.create(description),
        RootState.create('ACTIVE'),
        TempoCreatedAt.create(getTemporalNow()),
        TempoUpdatedAt.create(getTemporalNow()),
        TempoArchivedAt.create(null)
      )
    )
  }
}
