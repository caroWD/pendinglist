import { getTemporalNow } from '../../../../helpers/temporalHelper.ts'
import { BaseDescription } from '../../../primitives/bases/domain/value-objects/BaseDescription.ts'
import { BaseName } from '../../../primitives/bases/domain/value-objects/BaseName.ts'
import { BaseSlug } from '../../../primitives/bases/domain/value-objects/BaseSlug.ts'
import { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import { RootState } from '../../../primitives/roots/domain/value-objects/RootState.ts'
import { TempoArchivedAt } from '../../../primitives/tempos/domain/value-objects/TempoArchivedAt.ts'
import { TempoCreatedAt } from '../../../primitives/tempos/domain/value-objects/TempoCreatedAt.ts'
import { TempoUpdatedAt } from '../../../primitives/tempos/domain/value-objects/TempoUpdatedAt.ts'
import type { ITeamRepository } from '../domain/ITeamRepository.ts'
import { Team } from '../domain/models/Team.ts'
import { TeamAlreadyExistsError } from '../domain/TeamErrors.ts'

export class AddTeam {
  private readonly _teamRepository: ITeamRepository

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const teamName: BaseName = BaseName.create(name)
    const teamSlug: BaseSlug = BaseSlug.create(teamName.value)

    const teamExists: boolean =
      await this._teamRepository.ensureAlreadyExists(teamSlug)
    if (teamExists) throw new TeamAlreadyExistsError('Team already exists!')

    return await this._teamRepository.add(
      new Team(
        RootId.create(id),
        teamSlug,
        teamName,
        BaseDescription.create(description),
        RootState.create('ACTIVE'),
        TempoCreatedAt.create(getTemporalNow()),
        TempoUpdatedAt.create(getTemporalNow()),
        TempoArchivedAt.create(null)
      )
    )
  }
}
