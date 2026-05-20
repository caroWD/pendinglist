import { compare } from 'bcryptjs'
import type { IRoleRepository } from '../../../../access-controls/globals/roles/domain/IRoleRepository.ts'
import { AddUser } from '../../application/AddUser.ts'
import { AuthUser } from '../../application/AuthUser.ts'
import { EditPasswordUser } from '../../application/EditPassword.ts'
import { EditUser } from '../../application/EditUser.ts'
import { FindAllUser } from '../../application/FindAllUser.ts'
import { FindOneUser } from '../../application/FindOneUser.ts'
import { FindTeamsByUser } from '../../application/FindTeamsByUser.ts'
import { RemoveUser } from '../../application/RemoveUser.ts'
import { ToggleUser } from '../../application/ToggleUser.ts'
import type { IUserRepository } from '../../domain/IUserRepository.ts'
import type { UserAuthDto } from '../../domain/models/UserAuthDto.ts'
import { UnauthorizedUserError } from '../../domain/UserErros.ts'
import type { UserDto } from '../../domain/models/UserDto.ts'
import type { TeamDto } from '../../../../workspaces/teams/domain/models/TeamDto.ts'

export class UserShared {
  private readonly _add: AddUser
  private readonly _auth: AuthUser
  private readonly _editPassword: EditPasswordUser
  private readonly _edit: EditUser
  private readonly _findAll: FindAllUser
  private readonly _findOne: FindOneUser
  private readonly _findTeams: FindTeamsByUser
  private readonly _remove: RemoveUser
  private readonly _toggle: ToggleUser

  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository
  ) {
    this._add = new AddUser(userRepository, roleRepository)
    this._auth = new AuthUser(userRepository, roleRepository)
    this._edit = new EditUser(userRepository, roleRepository)
    this._editPassword = new EditPasswordUser(userRepository)
    this._findAll = new FindAllUser(userRepository, roleRepository)
    this._findOne = new FindOneUser(userRepository, roleRepository)
    this._findTeams = new FindTeamsByUser(userRepository)
    this._remove = new RemoveUser(userRepository)
    this._toggle = new ToggleUser(userRepository)
  }

  async add(
    id: string,
    handle: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatar: string | null,
    roleId: string
  ): Promise<void> {
    return await this._add.handler(
      id,
      handle,
      firstName,
      lastName,
      email,
      password,
      avatar,
      roleId
    )
  }

  async auth(handle: string, password: string): Promise<UserAuthDto> {
    const user: UserAuthDto = await this._auth.handler(handle)

    if (!(await compare(password, user.password)) || user.archived)
      throw new UnauthorizedUserError('Unauthorized user!')

    return user
  }

  async editPassword(id: string, current: string, next: string): Promise<void> {
    return await this._editPassword.handler(id, current, next)
  }

  async edit(
    id: string,
    handle: string,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string | null,
    roleId: string
  ): Promise<void> {
    return await this._edit.handler(
      id,
      handle,
      firstName,
      lastName,
      email,
      avatar,
      roleId
    )
  }

  async findAll(): Promise<UserDto[]> {
    return await this._findAll.handler()
  }

  async findOne(id: string): Promise<UserDto> {
    return await this._findOne.handler(id)
  }

  async findTeams(userId: string): Promise<TeamDto[]> {
    return await this._findTeams.handler(userId)
  }

  async remove(id: string): Promise<void> {
    return await this._remove.handler(id)
  }

  async toggle(id: string): Promise<void> {
    return await this._toggle.handler(id)
  }
}
