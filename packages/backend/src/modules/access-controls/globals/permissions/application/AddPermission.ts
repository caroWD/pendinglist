import { getTemporalNow } from '../../../../../helpers/temporalHelper.ts'
import type { IBaseRepository } from '../../../../primitives/bases/domain/IBaseRepository.ts'
import { BaseDescription } from '../../../../primitives/bases/domain/value-objects/BaseDescription.ts'
import { BaseName } from '../../../../primitives/bases/domain/value-objects/BaseName.ts'
import { BaseSlug } from '../../../../primitives/bases/domain/value-objects/BaseSlug.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import { RootState } from '../../../../primitives/roots/domain/value-objects/RootState.ts'
import { TempoArchivedAt } from '../../../../primitives/tempos/domain/value-objects/TempoArchivedAt.ts'
import { TempoCreatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoCreatedAt.ts'
import { TempoUpdatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoUpdatedAt.ts'
import { Permission } from '../domain/models/Permission.ts'
import { PermissionAlreadyExistsError } from '../domain/PermissionError.ts'

export class AddPermission {
  private readonly _permissionRepository: IBaseRepository<Permission>

  constructor(permissionRepository: IBaseRepository<Permission>) {
    this._permissionRepository = permissionRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const permissionName: BaseName = BaseName.create(name)
    const permissionSlug: BaseSlug = BaseSlug.create(permissionName.value)

    const permissionExists: boolean =
      await this._permissionRepository.ensureAlreadyExists(permissionSlug)
    if (permissionExists)
      throw new PermissionAlreadyExistsError('Permission already exists!')

    return await this._permissionRepository.add(
      new Permission(
        RootId.create(id),
        permissionSlug,
        permissionName,
        BaseDescription.create(description),
        RootState.create('ACTIVE'),
        TempoCreatedAt.create(getTemporalNow()),
        TempoUpdatedAt.create(getTemporalNow()),
        TempoArchivedAt.create(null)
      )
    )
  }
}
