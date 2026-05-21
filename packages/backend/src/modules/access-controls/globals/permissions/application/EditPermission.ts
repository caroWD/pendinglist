import { getTemporalNow } from '../../../../../helpers/temporalHelper.ts'
import type { IBaseRepository } from '../../../../primitives/bases/domain/IBaseRepository.ts'
import { BaseDescription } from '../../../../primitives/bases/domain/value-objects/BaseDescription.ts'
import { BaseName } from '../../../../primitives/bases/domain/value-objects/BaseName.ts'
import { BaseSlug } from '../../../../primitives/bases/domain/value-objects/BaseSlug.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import { TempoUpdatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoUpdatedAt.ts'
import { Permission } from '../domain/models/Permission.ts'
import {
  PermissionAlreadyExistsError,
  PermissionNotFoundError,
} from '../domain/PermissionError.ts'

export class EditPermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const permissionToEdit: Permission | null =
      await this._permissionRepository.findOne(RootId.create(id))
    if (!permissionToEdit)
      throw new PermissionNotFoundError('Permission not found!')

    const permissionName: BaseName = BaseName.create(name)
    const permissionSlug: BaseSlug = BaseSlug.create(permissionName.value)

    if (permissionSlug.value !== permissionToEdit.slug.value) {
      const permissionExists: boolean =
        await this._permissionRepository.ensureAlreadyExists(permissionSlug)
      if (permissionExists)
        throw new PermissionAlreadyExistsError('Permission already exists!')
    }

    return await this._permissionRepository.edit(
      new Permission(
        permissionToEdit.id,
        permissionSlug,
        permissionName,
        BaseDescription.create(description),
        permissionToEdit.state,
        permissionToEdit.createdAt,
        TempoUpdatedAt.create(getTemporalNow()),
        permissionToEdit.archivedAt
      )
    )
  }
}
