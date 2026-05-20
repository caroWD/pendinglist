import { getTemporalNow } from '../../../../../helpers/temporalHelper.ts'
import { BaseDescription } from '../../../../primitives/bases/domain/value-objects/BaseDescription.ts'
import { BaseName } from '../../../../primitives/bases/domain/value-objects/BaseName.ts'
import { BaseSlug } from '../../../../primitives/bases/domain/value-objects/BaseSlug.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import { RootState } from '../../../../primitives/roots/domain/value-objects/RootState.ts'
import { TempoArchivedAt } from '../../../../primitives/tempos/domain/value-objects/TempoArchivedAt.ts'
import { TempoCreatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoCreatedAt.ts'
import { TempoUpdatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoUpdatedAt.ts'
import type { ITeamRoleRepository } from '../domain/ITeamRoleRepository.ts'
import { TeamRole } from '../domain/models/TeamRole.ts'
import { TeamRoleAlreadyExistsError } from '../domain/TeamRoleErrors.ts'

export class AddTeamRole {
  private readonly _teamRoleRepository: ITeamRoleRepository

  constructor(teamRoleRepository: ITeamRoleRepository) {
    this._teamRoleRepository = teamRoleRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const teamRoleName: BaseName = BaseName.create(name)
    const teamRoleSlug: BaseSlug = BaseSlug.create(teamRoleName.value)

    const teamRoleExists: boolean =
      await this._teamRoleRepository.ensureAlreadyExists(teamRoleSlug)
    if (teamRoleExists)
      throw new TeamRoleAlreadyExistsError('TeamRole already exists!')

    return await this._teamRoleRepository.add(
      new TeamRole(
        RootId.create(id),
        teamRoleSlug,
        teamRoleName,
        BaseDescription.create(description),
        RootState.create('ACTIVE'),
        TempoCreatedAt.create(getTemporalNow()),
        TempoUpdatedAt.create(getTemporalNow()),
        TempoArchivedAt.create(null)
      )
    )
  }
}
