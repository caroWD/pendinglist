import { getTemporalNow } from '../../../../../helpers/temporalHelper.ts'
import { BaseDescription } from '../../../../primitives/bases/domain/value-objects/BaseDescription.ts'
import { BaseName } from '../../../../primitives/bases/domain/value-objects/BaseName.ts'
import { BaseSlug } from '../../../../primitives/bases/domain/value-objects/BaseSlug.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import { TempoUpdatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoUpdatedAt.ts'
import type { ITeamRoleRepository } from '../domain/ITeamRoleRepository.ts'
import { TeamRole } from '../domain/models/TeamRole.ts'
import {
  TeamRoleAlreadyExistsError,
  TeamRoleNotFoundError,
} from '../domain/TeamRoleErrors.ts'

export class EditTeamRole {
  private readonly _teamRoleRepository: ITeamRoleRepository

  constructor(teamRoleRepository: ITeamRoleRepository) {
    this._teamRoleRepository = teamRoleRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const teamRoleToEdit: TeamRole | null =
      await this._teamRoleRepository.findOne(RootId.create(id))
    if (!teamRoleToEdit) throw new TeamRoleNotFoundError('TeamRole not found!')

    const teamRoleName: BaseName = BaseName.create(name)
    const teamRoleSlug: BaseSlug = BaseSlug.create(teamRoleName.value)

    if (teamRoleSlug.value !== teamRoleToEdit.slug.value) {
      const teamRoleExists: boolean =
        await this._teamRoleRepository.ensureAlreadyExists(teamRoleSlug)
      if (teamRoleExists)
        throw new TeamRoleAlreadyExistsError('TeamRole already exists!')
    }

    return await this._teamRoleRepository.edit(
      new TeamRole(
        teamRoleToEdit.id,
        teamRoleSlug,
        teamRoleName,
        BaseDescription.create(description),
        teamRoleToEdit.state,
        teamRoleToEdit.createdAt,
        TempoUpdatedAt.create(getTemporalNow()),
        teamRoleToEdit.archivedAt
      )
    )
  }
}
