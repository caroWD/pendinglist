import type { IBaseRepository } from '../../../../../primitives/bases/domain/IBaseRepository.ts'
import type { TeamPermission } from '../../../team-permissions/domain/models/TeamPermission.ts'
import type { TeamPermissionDto } from '../../../team-permissions/domain/models/TeamPermissionDto.ts'
import { AddTeamPermissionToTeamRole } from '../../application/AddTeamPermissionToTeamRole.ts'
import { AddTeamRole } from '../../application/AddTeamRole.ts'
import { EditTeamRole } from '../../application/EditTeamRole.ts'
import { FindAllTeamRole } from '../../application/FindAllTeamRole.ts'
import { FindOneTeamRole } from '../../application/FindOneTeamRole.ts'
import { FindTeamPermissionsForTeamRole } from '../../application/FindTeamPermissionsForTeamRole.ts'
import { RemoveTeamPermissionToTeamRole } from '../../application/RemoveTeamPermissionToTeamRole.ts'
import { RemoveTeamRole } from '../../application/RemoveTeamRole.ts'
import { ToggleTeamRole } from '../../application/ToggleTeamRole.ts'
import type { ITeamRoleRepository } from '../../domain/ITeamRoleRepository.ts'
import type { TeamRoleDto } from '../../domain/models/TeamRoleDto.ts'

export class TeamRoleShared {
  private readonly _add: AddTeamRole
  private readonly _addTeamPermissionToTeamRole: AddTeamPermissionToTeamRole
  private readonly _edit: EditTeamRole
  private readonly _toggle: ToggleTeamRole
  private readonly _remove: RemoveTeamRole
  private readonly _removeTeamPermissionToTeamRole: RemoveTeamPermissionToTeamRole
  private readonly _findAll: FindAllTeamRole
  private readonly _findOne: FindOneTeamRole
  private readonly _findTeamPermissionsForTeamRole: FindTeamPermissionsForTeamRole

  constructor(
    teamRoleRepository: ITeamRoleRepository,
    teamPermissionRepository: IBaseRepository<TeamPermission>
  ) {
    this._add = new AddTeamRole(teamRoleRepository)
    this._addTeamPermissionToTeamRole = new AddTeamPermissionToTeamRole(
      teamRoleRepository,
      teamPermissionRepository
    )
    this._edit = new EditTeamRole(teamRoleRepository)
    this._toggle = new ToggleTeamRole(teamRoleRepository)
    this._remove = new RemoveTeamRole(teamRoleRepository)
    this._removeTeamPermissionToTeamRole = new RemoveTeamPermissionToTeamRole(
      teamRoleRepository,
      teamPermissionRepository
    )
    this._findAll = new FindAllTeamRole(teamRoleRepository)
    this._findOne = new FindOneTeamRole(teamRoleRepository)
    this._findTeamPermissionsForTeamRole = new FindTeamPermissionsForTeamRole(
      teamRoleRepository
    )
  }

  async add(id: string, name: string, description: string): Promise<void> {
    return await this._add.handler(id, name, description)
  }

  async addTeamPermissionToTeamRole(
    teamRoleId: string,
    teamPermissionId: string
  ): Promise<void> {
    return await this._addTeamPermissionToTeamRole.handler(
      teamRoleId,
      teamPermissionId
    )
  }

  async edit(id: string, name: string, description: string): Promise<void> {
    return await this._edit.handler(id, name, description)
  }

  async toggle(id: string): Promise<void> {
    return await this._toggle.handler(id)
  }

  async remove(id: string): Promise<void> {
    return await this._remove.handler(id)
  }

  async removeTeamPermissionToTeamRole(
    teamRoleId: string,
    teamPermissionId: string
  ): Promise<void> {
    return await this._removeTeamPermissionToTeamRole.handler(
      teamRoleId,
      teamPermissionId
    )
  }

  async findAll(): Promise<TeamRoleDto[]> {
    return await this._findAll.handler()
  }

  async findOne(id: string): Promise<TeamRoleDto> {
    return await this._findOne.handler(id)
  }

  async findTeamPermissionsForTeamRole(
    teamRoleId: string
  ): Promise<TeamPermissionDto[]> {
    return await this._findTeamPermissionsForTeamRole.handler(teamRoleId)
  }
}
