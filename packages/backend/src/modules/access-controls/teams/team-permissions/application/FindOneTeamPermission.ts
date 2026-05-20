import type { IBaseRepository } from '../../../../primitives/bases/domain/IBaseRepository.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { TeamPermission } from '../domain/models/TeamPermission.ts'
import { TeamPermissionDto } from '../domain/models/TeamPermissionDto.ts'
import { TeamPermissionNotFoundError } from '../domain/TeamPermissionErrors.ts'

export class FindOneTeamPermission {
  private readonly _teamPermissionRepository: IBaseRepository<TeamPermission>

  constructor(teamPermissionRepository: IBaseRepository<TeamPermission>) {
    this._teamPermissionRepository = teamPermissionRepository
  }

  async handler(id: string): Promise<TeamPermissionDto> {
    const teamPermission: TeamPermission | null =
      await this._teamPermissionRepository.findOne(RootId.create(id))
    if (!teamPermission)
      throw new TeamPermissionNotFoundError('TeamPermission not found!')

    return new TeamPermissionDto(
      teamPermission.id.value,
      teamPermission.name.value,
      teamPermission.description.value,
      teamPermission.state.value === 'ACTIVE' ? false : true,
      teamPermission.createdAt.value.toJSON(),
      teamPermission.updatedAt.value.toJSON(),
      teamPermission.archivedAt.value?.toJSON() || null
    )
  }
}
