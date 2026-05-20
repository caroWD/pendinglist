import type { User } from '../../../auth/users/domain/models/User.ts'
import type { IBaseRepository } from '../../../primitives/bases/domain/IBaseRepository.ts'
import type { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import type { Team } from './models/Team.ts'

export interface ITeamRepository extends IBaseRepository<Team> {
  addUserToTeam(
    teamId: RootId,
    userId: RootId,
    teamRoleId: RootId
  ): Promise<void>

  editTeamUser(
    teamId: RootId,
    userId: RootId,
    teamRoleId: RootId
  ): Promise<void>

  toggleTeamUser(teamId: RootId, userId: RootId): Promise<void>

  removeTeamUser(teamId: RootId, userId: RootId): Promise<void>

  findUsersByTeam(teamId: RootId): Promise<User[]>

  ensureUserAlreadyExistsOnTeam(
    teamId: RootId,
    userId: RootId
  ): Promise<boolean>
}
