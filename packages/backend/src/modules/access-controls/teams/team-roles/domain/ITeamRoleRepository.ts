import type { IBaseRepository } from '../../../../primitives/bases/domain/IBaseRepository.ts'
import type { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { TeamPermission } from '../../team-permissions/domain/models/TeamPermission.ts'
import type { TeamRole } from './models/TeamRole.ts'

export interface ITeamRoleRepository extends IBaseRepository<TeamRole> {
  addTeamPermissionToTeamRole(
    teamRoleId: RootId,
    teamPermissionId: RootId
  ): Promise<void>

  removeTeamPermissionToTeamRole(
    teamRoleId: RootId,
    teamPermissionId: RootId
  ): Promise<void>

  findTeamPermissionsForTeamRole(teamRoleId: RootId): Promise<TeamPermission[]>

  ensureTeamRoleHasThisTeamPermission(
    teamRoleId: RootId,
    teamPermissionId: RootId
  ): Promise<boolean>
}
