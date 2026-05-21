import { UserNotFoundError } from '../../../auth/users/domain/UserErros.ts'
import { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import type { ITeamRepository } from '../domain/ITeamRepository.ts'
import type { Team } from '../domain/models/Team.ts'
import { TeamDto } from '../domain/models/TeamDto.ts'

export class FindOneTeam {
  private readonly _teamRepository: ITeamRepository

  constructor(teamRepository: ITeamRepository) {
    this._teamRepository = teamRepository
  }

  async handler(id: string): Promise<TeamDto> {
    const teamFinded: Team | null = await this._teamRepository.findOne(
      RootId.create(id)
    )
    if (!teamFinded) throw new UserNotFoundError('User not found!')

    return new TeamDto(
      teamFinded.id.value,
      teamFinded.name.value,
      teamFinded.description.value,
      teamFinded.state.value === 'ACTIVE' ? false : true,
      teamFinded.createdAt.value.toJSON(),
      teamFinded.updatedAt.value.toJSON()
    )
  }
}
