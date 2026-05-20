import type { IRoleRepository } from '../../../access-controls/globals/roles/domain/IRoleRepository.ts'
import type { Role } from '../../../access-controls/globals/roles/domain/models/Role.ts'
import { RoleNotFoundError } from '../../../access-controls/globals/roles/domain/RoleErrors.ts'
import type { User } from '../../../auth/users/domain/models/User.ts'
import { UserDto } from '../../../auth/users/domain/models/UserDto.ts'
import { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import type { ITeamRepository } from '../domain/ITeamRepository.ts'
import type { Team } from '../domain/models/Team.ts'
import { TeamNotFoundError } from '../domain/TeamErrors.ts'

export class FindUsersByTeam {
  private readonly _teamRepository: ITeamRepository
  private readonly _roleRepository: IRoleRepository

  constructor(
    teamRepository: ITeamRepository,
    roleRepository: IRoleRepository
  ) {
    this._teamRepository = teamRepository
    this._roleRepository = roleRepository
  }

  async handler(teamId: string): Promise<UserDto[]> {
    const team: Team | null = await this._teamRepository.findOne(
      RootId.create(teamId)
    )
    if (!team) throw new TeamNotFoundError('Team not found!')

    const users: User[] = await this._teamRepository.findUsersByTeam(team.id)

    return !users.length
      ? []
      : await Promise.all(
          users.map(async (user) => {
            const role: Role | null = await this._roleRepository.findOne(
              user.roleId
            )
            if (!role) throw new RoleNotFoundError('Role not found!')

            return new UserDto(
              user.id.value,
              user.handle.value,
              user.firstName.value,
              user.lastName.value,
              user.fullName,
              user.email.value,
              user.avatar.value || null,
              role.id.value,
              role.name.value,
              user.state.value === 'ACTIVE' ? false : true,
              user.createdAt.value.toJSON(),
              user.updatedAt.value.toJSON()
            )
          })
        )
  }
}
