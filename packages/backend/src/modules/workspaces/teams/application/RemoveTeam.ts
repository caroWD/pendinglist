import { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import type { ITeamRepository } from '../domain/ITeamRepository.ts'
import type { Team } from '../domain/models/Team.ts'
import { TeamNotFoundError } from '../domain/TeamErrors.ts'

export class RemoveTeam {
  private readonly _teamRepository: ITeamRepository

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository
  }

  async handler(id: string): Promise<void> {
    const teamToRemove: Team | null = await this._teamRepository.findOne(
      RootId.create(id)
    )
    if (!teamToRemove) throw new TeamNotFoundError('Team not found!')

    return await this._teamRepository.remove(teamToRemove.id)
  }
}
