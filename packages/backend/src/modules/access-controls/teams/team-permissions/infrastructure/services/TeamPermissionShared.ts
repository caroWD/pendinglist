import type { IBaseRepository } from '../../../../../primitives/bases/domain/IBaseRepository.ts'
import { AddTeamPermission } from '../../application/AddTeamPermission.ts'
import { EditTeamPermission } from '../../application/EditTeamPermission.ts'
import { FindAllTeamPermission } from '../../application/FindAllTeamPermission.ts'
import { FindOneTeamPermission } from '../../application/FindOneTeamPermission.ts'
import { RemoveTeamPermission } from '../../application/RemoveTeamPermissionCommand.ts'
import { ToggleTeamPermission } from '../../application/ToggleTeamPermission.ts'
import type { TeamPermission } from '../../domain/models/TeamPermission.ts'
import type { TeamPermissionDto } from '../../domain/models/TeamPermissionDto.ts'

export class TeamPermissionShared {
  private readonly _add: AddTeamPermission
  private readonly _edit: EditTeamPermission
  private readonly _toggle: ToggleTeamPermission
  private readonly _remove: RemoveTeamPermission
  private readonly _findAll: FindAllTeamPermission
  private readonly _findOne: FindOneTeamPermission

  constructor(teamPermissionRepository: IBaseRepository<TeamPermission>) {
    this._add = new AddTeamPermission(teamPermissionRepository)
    this._edit = new EditTeamPermission(teamPermissionRepository)
    this._toggle = new ToggleTeamPermission(teamPermissionRepository)
    this._remove = new RemoveTeamPermission(teamPermissionRepository)
    this._findAll = new FindAllTeamPermission(teamPermissionRepository)
    this._findOne = new FindOneTeamPermission(teamPermissionRepository)
  }

  async add(id: string, name: string, description: string): Promise<void> {
    return await this._add.handler(id, name, description)
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

  async findAll(): Promise<TeamPermissionDto[]> {
    return await this._findAll.handler()
  }

  async findOne(id: string): Promise<TeamPermissionDto> {
    return await this._findOne.handler(id)
  }
}
