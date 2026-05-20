import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { TeamPermission } from '../../team-permissions/domain/models/TeamPermission.ts'
import { TeamPermissionDto } from '../../team-permissions/domain/models/TeamPermissionDto.ts'
import type { ITeamRoleRepository } from '../domain/ITeamRoleRepository.ts'

export class FindTeamPermissionsForTeamRole {
  private readonly _teamRoleRepository: ITeamRoleRepository

  constructor(teamRoleRepository: ITeamRoleRepository) {
    this._teamRoleRepository = teamRoleRepository
  }

  async handler(teamRoleId: string): Promise<TeamPermissionDto[]> {
    const teamPermissions: TeamPermission[] =
      await this._teamRoleRepository.findTeamPermissionsForTeamRole(
        RootId.create(teamRoleId)
      )

    return !teamPermissions.length
      ? []
      : teamPermissions.map(
          (teamPermission) =>
            new TeamPermissionDto(
              teamPermission.id.value,
              teamPermission.name.value,
              teamPermission.description.value,
              teamPermission.state.value === 'ACTIVE' ? false : true,
              teamPermission.createdAt.value.toJSON(),
              teamPermission.updatedAt.value.toJSON(),
              teamPermission.archivedAt.value?.toJSON() || null
            )
        )
  }
}
