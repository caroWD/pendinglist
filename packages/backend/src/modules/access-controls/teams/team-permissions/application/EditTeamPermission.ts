import { getTemporalNow } from '../../../../../helpers/temporalHelper.ts'
import type { IBaseRepository } from '../../../../primitives/bases/domain/IBaseRepository.ts'
import { BaseDescription } from '../../../../primitives/bases/domain/value-objects/BaseDescription.ts'
import { BaseName } from '../../../../primitives/bases/domain/value-objects/BaseName.ts'
import { BaseSlug } from '../../../../primitives/bases/domain/value-objects/BaseSlug.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import { RootState } from '../../../../primitives/roots/domain/value-objects/RootState.ts'
import { TempoUpdatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoUpdatedAt.ts'
import { TeamPermission } from '../domain/models/TeamPermission.ts'
import {
  TeamPermissionAlreadyExistsError,
  TeamPermissionNotFoundError,
} from '../domain/TeamPermissionErrors.ts'

export class EditTeamPermission {
  private readonly _teamPermissionRepository: IBaseRepository<TeamPermission>

  constructor(teamPermissionRepository: IBaseRepository<TeamPermission>) {
    this._teamPermissionRepository = teamPermissionRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const teamPermissionToEdit: TeamPermission | null =
      await this._teamPermissionRepository.findOne(RootId.create(id))
    if (!teamPermissionToEdit)
      throw new TeamPermissionNotFoundError('TeamPermission not found!')

    const teamPermissionName: BaseName = BaseName.create(name)
    const teamPermissoinSlug: BaseSlug = BaseSlug.create(
      teamPermissionName.value
    )

    if (teamPermissoinSlug.value !== teamPermissionToEdit.slug.value) {
      const teamPermissionExists: boolean =
        await this._teamPermissionRepository.ensureAlreadyExists(
          teamPermissoinSlug
        )
      if (teamPermissionExists)
        throw new TeamPermissionAlreadyExistsError(
          'TeamPermission already exists!'
        )
    }

    return await this._teamPermissionRepository.edit(
      new TeamPermission(
        teamPermissionToEdit.id,
        teamPermissoinSlug,
        teamPermissionName,
        BaseDescription.create(description),
        RootState.create('ACTIVE'),
        teamPermissionToEdit.createdAt,
        TempoUpdatedAt.create(getTemporalNow()),
        teamPermissionToEdit.archivedAt
      )
    )
  }
}
