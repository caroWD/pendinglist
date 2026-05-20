import type { IBaseRepository } from '../../../../primitives/bases/domain/IBaseRepository.ts'
import type { TeamPermission } from '../domain/models/TeamPermission.ts'
import { TeamPermissionDto } from '../domain/models/TeamPermissionDto.ts'

export class FindAllTeamPermission {
  private readonly _teamPermissionRepository: IBaseRepository<TeamPermission>

  constructor(teamPermissionRepository: IBaseRepository<TeamPermission>) {
    this._teamPermissionRepository = teamPermissionRepository
  }

  async handler(): Promise<TeamPermissionDto[]> {
    const teamPermissions: TeamPermission[] =
      await this._teamPermissionRepository.findAll()

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
