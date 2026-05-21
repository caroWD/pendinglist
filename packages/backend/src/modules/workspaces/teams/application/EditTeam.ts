import { getTemporalNow } from '../../../../helpers/temporalHelper.ts'
import { BaseDescription } from '../../../primitives/bases/domain/value-objects/BaseDescription.ts'
import { BaseName } from '../../../primitives/bases/domain/value-objects/BaseName.ts'
import { BaseSlug } from '../../../primitives/bases/domain/value-objects/BaseSlug.ts'
import { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import { RootState } from '../../../primitives/roots/domain/value-objects/RootState.ts'
import { TempoUpdatedAt } from '../../../primitives/tempos/domain/value-objects/TempoUpdatedAt.ts'
import type { ITeamRepository } from '../domain/ITeamRepository.ts'
import { Team } from '../domain/models/Team.ts'
import {
  TeamAlreadyExistsError,
  TeamNotFoundError,
} from '../domain/TeamErrors.ts'

export class EditTeam {
  private readonly _teamRepository: ITeamRepository

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository
  }

  async handler(id: string, name: string, description: string): Promise<void> {
    const teamToEdit: Team | null = await this._teamRepository.findOne(
      RootId.create(id)
    )
    if (!teamToEdit) throw new TeamNotFoundError('Team not found!')

    const teamName: BaseName = BaseName.create(name)
    const teamSlug: BaseSlug = BaseSlug.create(teamName.value)

    if (teamSlug.value !== teamToEdit.slug.value) {
      const teamExists: boolean =
        await this._teamRepository.ensureAlreadyExists(teamSlug)
      if (teamExists) throw new TeamAlreadyExistsError('Team already exists!')
    }

    return await this._teamRepository.edit(
      new Team(
        teamToEdit.id,
        teamSlug,
        teamName,
        BaseDescription.create(description),
        RootState.create('ACTIVE'),
        teamToEdit.createdAt,
        TempoUpdatedAt.create(getTemporalNow()),
        teamToEdit.archivedAt
      )
    )
  }
}
