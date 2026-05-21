import { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import type { ITeamRepository } from '../domain/ITeamRepository.ts'
import type { Team } from '../domain/models/Team.ts'
import { TeamNotFoundError } from '../domain/TeamErrors.ts'

export class ToggleTeam {
  private readonly _teamRepository: ITeamRepository

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository
  }

  async handler(id: string): Promise<void> {
    const teamToToggle: Team | null = await this._teamRepository.findOne(
      RootId.create(id)
    )
    if (!teamToToggle) throw new TeamNotFoundError('Team not found!')

    return await this._teamRepository.toggle(teamToToggle.id)
  }
}
