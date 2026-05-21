import type { IBaseRepository } from '../../../../primitives/bases/domain/IBaseRepository.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { TeamPermission } from '../../team-permissions/domain/models/TeamPermission.ts'
import { TeamPermissionNotFoundError } from '../../team-permissions/domain/TeamPermissionErrors.ts'
import type { ITeamRoleRepository } from '../domain/ITeamRoleRepository.ts'
import type { TeamRole } from '../domain/models/TeamRole.ts'
import { TeamRoleNotFoundError } from '../domain/TeamRoleErrors.ts'

export class RemoveTeamPermissionToTeamRole {
  private readonly _teamRoleRepository: ITeamRoleRepository
  private readonly _teamPermissionRepository: IBaseRepository<TeamPermission>

  constructor(
    teamRoleRepository: ITeamRoleRepository,
    teamPermissionRepository: IBaseRepository<TeamPermission>
  ) {
    this._teamRoleRepository = teamRoleRepository
    this._teamPermissionRepository = teamPermissionRepository
  }

  async handler(teamRoleId: string, teamPermissionId: string): Promise<void> {
    const teamRole: TeamRole | null = await this._teamRoleRepository.findOne(
      RootId.create(teamRoleId)
    )
    if (!teamRole) throw new TeamRoleNotFoundError('TeamRole not found!')

    const teamPermission: TeamPermission | null =
      await this._teamPermissionRepository.findOne(
        RootId.create(teamPermissionId)
      )
    if (!teamPermission)
      throw new TeamPermissionNotFoundError('TeamPermission not found!')

    return await this._teamRoleRepository.removeTeamPermissionToTeamRole(
      teamRole.id,
      teamPermission.id
    )
  }
}
