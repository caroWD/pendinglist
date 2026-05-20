import type { IRoleRepository } from '../../../access-controls/globals/roles/domain/IRoleRepository.ts'
import type { Role } from '../../../access-controls/globals/roles/domain/models/Role.ts'
import { RoleNotFoundError } from '../../../access-controls/globals/roles/domain/RoleErrors.ts'
import type { IUserRepository } from '../domain/IUserRepository.ts'
import type { User } from '../domain/models/User.ts'
import { UserDto } from '../domain/models/UserDto.ts'

export class FindAllUser {
  private readonly _userRepository: IUserRepository
  private readonly _roleRepository: IRoleRepository

  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository
  ) {
    this._userRepository = userRepository
    this._roleRepository = roleRepository
  }

  async handler(): Promise<UserDto[]> {
    const users: User[] = await this._userRepository.findAll()

    return !users.length
      ? []
      : await Promise.all(
          users.map(async (user) => {
            const role: Role | null = await this._roleRepository.findOne(
              user.roleId
            )
            if (!role) throw new RoleNotFoundError('Role not found!')

            return new UserDto(
              user.id.value,
              user.handle.value,
              user.firstName.value,
              user.lastName.value,
              user.fullName,
              user.email.value,
              user.avatar.value,
              role.id.value,
              role.name.value,
              user.state.value === 'ACTIVE' ? false : true,
              user.createdAt.value.toJSON(),
              user.updatedAt.value.toJSON()
            )
          })
        )
  }
}
