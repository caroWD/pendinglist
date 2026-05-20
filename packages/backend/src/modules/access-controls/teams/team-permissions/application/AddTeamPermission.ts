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
import { TeamPermission } from '../domain/models/TeamPermission.ts'
import { TeamPermissionAlreadyExistsError } from '../domain/TeamPermissionErrors.ts'

export class AddTeamPermission {
  private readonly _teamPermissionRepository: IBaseRepository<TeamPermission>

  constructor(teamPermissionRepository: IBaseRepository<TeamPermission>) {
    this._teamPermissionRepository = teamPermissionRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const teamPermissionName: BaseName = BaseName.create(name)
    const teamPermissionSlug: BaseSlug = BaseSlug.create(
      teamPermissionName.value
    )

    const teamPermissionExists: boolean =
      await this._teamPermissionRepository.ensureAlreadyExists(
        teamPermissionSlug
      )
    if (teamPermissionExists)
      throw new TeamPermissionAlreadyExistsError(
        'TeamPermission already exists!'
      )

    return await this._teamPermissionRepository.add(
      new TeamPermission(
        RootId.create(id),
        teamPermissionSlug,
        teamPermissionName,
        BaseDescription.create(description),
        RootState.create('ACTIVE'),
        TempoCreatedAt.create(getTemporalNow()),
        TempoUpdatedAt.create(getTemporalNow()),
        TempoArchivedAt.create(null)
      )
    )
  }
}
