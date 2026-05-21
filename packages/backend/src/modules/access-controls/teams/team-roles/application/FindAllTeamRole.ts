import type { ITeamRoleRepository } from '../domain/ITeamRoleRepository.ts'
import type { TeamRole } from '../domain/models/TeamRole.ts'
import { TeamRoleDto } from '../domain/models/TeamRoleDto.ts'

export class FindAllTeamRole {
  private readonly _teamRoleRepository: ITeamRoleRepository

  constructor(teamRoleRepository: ITeamRoleRepository) {
    this._teamRoleRepository = teamRoleRepository
  }

  async handler(): Promise<TeamRoleDto[]> {
    const teamRoles: TeamRole[] = await this._teamRoleRepository.findAll()

    return !teamRoles.length
      ? []
      : teamRoles.map(
          (teamRole) =>
            new TeamRoleDto(
              teamRole.id.value,
              teamRole.name.value,
              teamRole.description.value,
              teamRole.state.value === 'ACTIVE' ? false : true,
              teamRole.createdAt.value.toJSON(),
              teamRole.updatedAt.value.toJSON(),
              teamRole.archivedAt.value?.toJSON() || null
            )
        )
  }
}
