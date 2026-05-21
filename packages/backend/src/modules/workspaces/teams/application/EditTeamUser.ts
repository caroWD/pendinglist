import type { ITeamRoleRepository } from '../../../access-controls/teams/team-roles/domain/ITeamRoleRepository.ts'
import type { TeamRole } from '../../../access-controls/teams/team-roles/domain/models/TeamRole.ts'
import { TeamRoleNotFoundError } from '../../../access-controls/teams/team-roles/domain/TeamRoleErrors.ts'
import type { IUserRepository } from '../../../auth/users/domain/IUserRepository.ts'
import type { User } from '../../../auth/users/domain/models/User.ts'
import { UserNotFoundError } from '../../../auth/users/domain/UserErros.ts'
import { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import type { ITeamRepository } from '../domain/ITeamRepository.ts'
import type { Team } from '../domain/models/Team.ts'
import {
  TeamNotFoundError,
  UserDoesNotExistsOnTeamError,
} from '../domain/TeamErrors.ts'

export class EditTeamUser {
  private readonly _teamRepository: ITeamRepository
  private readonly _userRepository: IUserRepository
  private readonly _teamRoleRepository: ITeamRoleRepository

  constructor(
    teamRepository: ITeamRepository,
    userRepository: IUserRepository,
    teamRoleRepository: ITeamRoleRepository
  ) {
    this._teamRepository = teamRepository
    this._userRepository = userRepository
    this._teamRoleRepository = teamRoleRepository
  }

  async handler(
    teamId: string,
    userId: string,
    teamRoleId: string
  ): Promise<void> {
    const team: Team | null = await this._teamRepository.findOne(
      RootId.create(teamId)
    )
    if (!team) throw new TeamNotFoundError('Team not found!')

    const user: User | null = await this._userRepository.findOne(
      RootId.create(userId)
    )
    if (!user) throw new UserNotFoundError('User not found!')

    const teamRole: TeamRole | null = await this._teamRoleRepository.findOne(
      RootId.create(teamRoleId)
    )
    if (!teamRole) throw new TeamRoleNotFoundError('TeamRole not found!')

    const userExistsOnTeam =
      await this._teamRepository.ensureUserAlreadyExistsOnTeam(team.id, user.id)
    if (!userExistsOnTeam)
      throw new UserDoesNotExistsOnTeamError('User does not exists on Team!')

    return await this._teamRepository.editTeamUser(
      team.id,
      user.id,
      teamRole.id
    )
  }
}
