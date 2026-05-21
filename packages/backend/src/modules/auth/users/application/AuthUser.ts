import type { IRoleRepository } from '../../../access-controls/globals/roles/domain/IRoleRepository.ts'
import type { Role } from '../../../access-controls/globals/roles/domain/models/Role.ts'
import { RoleNotFoundError } from '../../../access-controls/globals/roles/domain/RoleErrors.ts'
import type { IUserRepository } from '../domain/IUserRepository.ts'
import type { User } from '../domain/models/User.ts'
import { UserAuthDto } from '../domain/models/UserAuthDto.ts'
import { UnauthorizedUserError } from '../domain/UserErros.ts'
import { UserHandle } from '../domain/value-objects/UserHandle.ts'

export class AuthUser {
  private readonly _userRepository: IUserRepository
  private readonly _roleRepository: IRoleRepository

  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository
  ) {
    this._userRepository = userRepository
    this._roleRepository = roleRepository
  }

  async handler(handle: string): Promise<UserAuthDto> {
    const authUser: User | null = await this._userRepository.auth(
      UserHandle.create(handle)
    )
    if (!authUser) throw new UnauthorizedUserError('Unauthorized user!')

    const role: Role | null = await this._roleRepository.findOne(
      authUser.roleId
    )
    if (!role) throw new RoleNotFoundError('Role not found!')

    return new UserAuthDto(
      authUser.id.value,
      authUser.handle.value,
      authUser.fullName,
      authUser.email.value,
      authUser.password.value,
      role.id.value,
      role.name.value,
      authUser.state.value === 'ACTIVE' ? false : true
    )
  }
}
