import type { IRoleRepository } from '../../../access-controls/globals/roles/domain/IRoleRepository.ts'
import type { Role } from '../../../access-controls/globals/roles/domain/models/Role.ts'
import { RoleNotFoundError } from '../../../access-controls/globals/roles/domain/RoleErrors.ts'
import { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import type { IUserRepository } from '../domain/IUserRepository.ts'
import type { User } from '../domain/models/User.ts'
import { UserDto } from '../domain/models/UserDto.ts'
import { UserNotFoundError } from '../domain/UserErros.ts'

export class FindOneUser {
  private readonly _userRepository: IUserRepository
  private readonly _roleRepository: IRoleRepository

  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository
  ) {
    this._userRepository = userRepository
    this._roleRepository = roleRepository
  }

  async handler(id: string): Promise<UserDto> {
    const userFinded: User | null = await this._userRepository.findOne(
      RootId.create(id)
    )
    if (!userFinded) throw new UserNotFoundError('User not found!')

    const role: Role | null = await this._roleRepository.findOne(
      userFinded.roleId
    )
    if (!role) throw new RoleNotFoundError('Role not found!')

    return new UserDto(
      userFinded.id.value,
      userFinded.handle.value,
      userFinded.firstName.value,
      userFinded.lastName.value,
      userFinded.fullName,
      userFinded.email.value,
      userFinded.avatar.value,
      role.id.value,
      role.name.value,
      userFinded.state.value === 'ACTIVE' ? false : true,
      userFinded.createdAt.value.toJSON(),
      userFinded.updatedAt.value.toJSON()
    )
  }
}
