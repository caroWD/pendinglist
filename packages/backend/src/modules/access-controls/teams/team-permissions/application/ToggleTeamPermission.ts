import type { IBaseRepository } from '../../../../primitives/bases/domain/IBaseRepository.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { TeamPermission } from '../domain/models/TeamPermission.ts'
import { TeamPermissionNotFoundError } from '../domain/TeamPermissionErrors.ts'

export class ToggleTeamPermission {
  private readonly _teamPermissionRepository: IBaseRepository<TeamPermission>

  constructor(teamPermissionRepository: IBaseRepository<TeamPermission>) {
    this._teamPermissionRepository = teamPermissionRepository
  }

  async handler(id: string): Promise<void> {
    const teamPermission: TeamPermission | null =
      await this._teamPermissionRepository.findOne(RootId.create(id))
    if (!teamPermission)
      throw new TeamPermissionNotFoundError('TeamPermission not found!')

    return await this._teamPermissionRepository.toggle(teamPermission.id)
  }
}
