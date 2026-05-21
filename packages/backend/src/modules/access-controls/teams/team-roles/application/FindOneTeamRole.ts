import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { ITeamRoleRepository } from '../domain/ITeamRoleRepository.ts'
import type { TeamRole } from '../domain/models/TeamRole.ts'
import { TeamRoleDto } from '../domain/models/TeamRoleDto.ts'
import { TeamRoleNotFoundError } from '../domain/TeamRoleErrors.ts'

export class FindOneTeamRole {
  private readonly _teamRoleRepository: ITeamRoleRepository

  constructor(teamRoleRepository: ITeamRoleRepository) {
    this._teamRoleRepository = teamRoleRepository
  }

  async handler(id: string): Promise<TeamRoleDto> {
    const teamRole: TeamRole | null = await this._teamRoleRepository.findOne(
      RootId.create(id)
    )
    if (!teamRole) throw new TeamRoleNotFoundError('TeamRole not found!')

    return new TeamRoleDto(
      teamRole.id.value,
      teamRole.name.value,
      teamRole.description.value,
      teamRole.state.value === 'ACTIVE' ? false : true,
      teamRole.createdAt.value.toJSON(),
      teamRole.updatedAt.value.toJSON(),
      teamRole.archivedAt.value?.toJSON() || null
    )
  }
}
