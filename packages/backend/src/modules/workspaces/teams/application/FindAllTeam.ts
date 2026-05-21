import type { ITeamRepository } from '../domain/ITeamRepository.ts'
import type { Team } from '../domain/models/Team.ts'
import { TeamDto } from '../domain/models/TeamDto.ts'

export class FindAllTeam {
  private readonly _teamRepository: ITeamRepository

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository
  }

  async handler(): Promise<TeamDto[]> {
    const teams: Team[] = await this._teamRepository.findAll()

    return !teams.length
      ? []
      : teams.map(
          (team) =>
            new TeamDto(
              team.id.value,
              team.name.value,
              team.description.value,
              team.state.value === 'ACTIVE' ? false : true,
              team.createdAt.value.toJSON(),
              team.updatedAt.value.toJSON()
            )
        )
  }
}
