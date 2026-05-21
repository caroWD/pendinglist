import { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import type { Team } from '../../../workspaces/teams/domain/models/Team.ts'
import { TeamDto } from '../../../workspaces/teams/domain/models/TeamDto.ts'
import type { IUserRepository } from '../domain/IUserRepository.ts'
import type { User } from '../domain/models/User.ts'
import { UserNotFoundError } from '../domain/UserErros.ts'

export class FindTeamsByUser {
  private readonly _userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository
  }

  async handler(userId: string): Promise<TeamDto[]> {
    const user: User | null = await this._userRepository.findOne(
      RootId.create(userId)
    )
    if (!user) throw new UserNotFoundError('User not found!')

    const teams: Team[] = await this._userRepository.findTeamsByUser(user.id)

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
