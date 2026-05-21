import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { ITeamRoleRepository } from '../domain/ITeamRoleRepository.ts'
import type { TeamRole } from '../domain/models/TeamRole.ts'
import { TeamRoleNotFoundError } from '../domain/TeamRoleErrors.ts'

export class RemoveTeamRole {
  private readonly _teamRoleRepository: ITeamRoleRepository

  constructor(teamRoleRepository: ITeamRoleRepository) {
    this._teamRoleRepository = teamRoleRepository
  }

  async handler(id: string): Promise<void> {
    const teamRoleToRemove: TeamRole | null =
      await this._teamRoleRepository.findOne(RootId.create(id))
    if (!teamRoleToRemove)
      throw new TeamRoleNotFoundError('TeamRole not found!')

    return await this._teamRoleRepository.remove(teamRoleToRemove.id)
  }
}
