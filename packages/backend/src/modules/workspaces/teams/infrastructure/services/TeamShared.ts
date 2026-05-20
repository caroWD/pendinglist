import type { IRoleRepository } from '../../../../access-controls/globals/roles/domain/IRoleRepository.ts'
import type { ITeamRoleRepository } from '../../../../access-controls/teams/team-roles/domain/ITeamRoleRepository.ts'
import type { IUserRepository } from '../../../../auth/users/domain/IUserRepository.ts'
import type { UserDto } from '../../../../auth/users/domain/models/UserDto.ts'
import { AddTeam } from '../../application/AddTeam.ts'
import { AddUserToTeam } from '../../application/AddUserToTeam.ts'
import { EditTeam } from '../../application/EditTeam.ts'
import { EditTeamUser } from '../../application/EditTeamUser.ts'
import { FindAllTeam } from '../../application/FindAllTeam.ts'
import { FindOneTeam } from '../../application/FindOneTeam.ts'
import { FindUsersByTeam } from '../../application/FindUsersByTeam.ts'
import { RemoveTeam } from '../../application/RemoveTeam.ts'
import { RemoveTeamUser } from '../../application/RemoveTeamUser.ts'
import { ToggleTeam } from '../../application/ToggleTeam.ts'
import { ToggleTeamUser } from '../../application/ToggleTeamUser.ts'
import type { ITeamRepository } from '../../domain/ITeamRepository.ts'
import type { TeamDto } from '../../domain/models/TeamDto.ts'

export class TeamShared {
  private readonly _add: AddTeam
  private readonly _addUserToTeam: AddUserToTeam
  private readonly _edit: EditTeam
  private readonly _editTeamUser: EditTeamUser
  private readonly _findAll: FindAllTeam
  private readonly _findOne: FindOneTeam
  private readonly _findUsersByTeam: FindUsersByTeam
  private readonly _remove: RemoveTeam
  private readonly _removeTeamUser: RemoveTeamUser
  private readonly _toggle: ToggleTeam
  private readonly _toggleTeamUser: ToggleTeamUser

  constructor(
    teamRepository: ITeamRepository,
    userRepository: IUserRepository,
    teamRoleRepository: ITeamRoleRepository,
    roleRepository: IRoleRepository
  ) {
    this._add = new AddTeam(teamRepository)
    this._addUserToTeam = new AddUserToTeam(
      teamRepository,
      userRepository,
      teamRoleRepository
    )
    this._edit = new EditTeam(teamRepository)
    this._editTeamUser = new EditTeamUser(
      teamRepository,
      userRepository,
      teamRoleRepository
    )
    this._findAll = new FindAllTeam(teamRepository)
    this._findOne = new FindOneTeam(teamRepository)
    this._findUsersByTeam = new FindUsersByTeam(teamRepository, roleRepository)
    this._remove = new RemoveTeam(teamRepository)
    this._removeTeamUser = new RemoveTeamUser(teamRepository, userRepository)
    this._toggle = new ToggleTeam(teamRepository)
    this._toggleTeamUser = new ToggleTeamUser(teamRepository, userRepository)
  }

  async add(id: string, name: string, description: string): Promise<void> {
    return await this._add.handler(id, name, description)
  }

  async addUserToTeam(
    teamId: string,
    userId: string,
    teamRoleId: string
  ): Promise<void> {
    return await this._addUserToTeam.handler(teamId, userId, teamRoleId)
  }

  async edit(id: string, name: string, description: string): Promise<void> {
    return this._edit.handler(id, name, description)
  }

  async editTeamUser(
    teamId: string,
    userId: string,
    teamRoleId: string
  ): Promise<void> {
    return await this._editTeamUser.handler(teamId, userId, teamRoleId)
  }

  async findAll(): Promise<TeamDto[]> {
    return await this._findAll.handler()
  }

  async findOne(id: string): Promise<TeamDto> {
    return await this._findOne.handler(id)
  }

  async findUsersByTeam(teamId: string): Promise<UserDto[]> {
    return await this._findUsersByTeam.handler(teamId)
  }

  async remove(id: string): Promise<void> {
    return await this._remove.handler(id)
  }

  async removeTeamUser(teamId: string, userId: string): Promise<void> {
    return await this._removeTeamUser.handler(teamId, userId)
  }

  async toggle(id: string): Promise<void> {
    return await this._toggle.handler(id)
  }

  async toggleTeamUser(teamId: string, userId: string): Promise<void> {
    return await this._toggleTeamUser.handler(teamId, userId)
  }
}
