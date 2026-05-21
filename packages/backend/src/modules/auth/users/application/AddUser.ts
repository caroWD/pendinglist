import { getTemporalNow } from '../../../../helpers/temporalHelper.ts'
import type { IRoleRepository } from '../../../access-controls/globals/roles/domain/IRoleRepository.ts'
import type { Role } from '../../../access-controls/globals/roles/domain/models/Role.ts'
import { RoleNotFoundError } from '../../../access-controls/globals/roles/domain/RoleErrors.ts'
import { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import { RootState } from '../../../primitives/roots/domain/value-objects/RootState.ts'
import { TempoArchivedAt } from '../../../primitives/tempos/domain/value-objects/TempoArchivedAt.ts'
import { TempoCreatedAt } from '../../../primitives/tempos/domain/value-objects/TempoCreatedAt.ts'
import { TempoUpdatedAt } from '../../../primitives/tempos/domain/value-objects/TempoUpdatedAt.ts'
import type { IUserRepository } from '../domain/IUserRepository.ts'
import { User } from '../domain/models/User.ts'
import {
  UserEmailAlreadyExistsError,
  UserHandleAlreadyExistsError,
} from '../domain/UserErros.ts'
import { UserAvatar } from '../domain/value-objects/UserAvatar.ts'
import { UserEmail } from '../domain/value-objects/UserEmail.ts'
import { UserFirstName } from '../domain/value-objects/UserFirstName.ts'
import { UserHandle } from '../domain/value-objects/UserHandle.ts'
import { UserLastName } from '../domain/value-objects/UserLastName.ts'
import { UserPassword } from '../domain/value-objects/UserPassword.ts'

export class AddUser {
  private readonly _userRepository: IUserRepository
  private readonly _roleRepository: IRoleRepository

  constructor(
    userRepository: IUserRepository,
    roleRepository: IRoleRepository
  ) {
    this._userRepository = userRepository
    this._roleRepository = roleRepository
  }

  async handler(
    id: string,
    handle: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatar: string | null,
    roleId: string
  ): Promise<void> {
    const userHandle: UserHandle = UserHandle.create(handle)
    const userHandleExists: boolean =
      await this._userRepository.ensureHandleAlreadyExists(userHandle)
    if (userHandleExists)
      throw new UserHandleAlreadyExistsError('Handle already exists!')

    const userEmail: UserEmail = UserEmail.create(email)
    const userEmailExists: boolean =
      await this._userRepository.ensureEmailAlreadyExists(userEmail)
    if (userEmailExists)
      throw new UserEmailAlreadyExistsError('Email already exists!')

    const role: Role | null = await this._roleRepository.findOne(
      RootId.create(roleId)
    )
    if (!role) throw new RoleNotFoundError('Role not found!')

    return await this._userRepository.add(
      new User(
        RootId.create(id),
        userHandle,
        UserFirstName.create(firstName),
        UserLastName.create(lastName),
        userEmail,
        UserPassword.create(password),
        UserAvatar.create(avatar),
        role.id,
        RootState.create('ACTIVE'),
        TempoCreatedAt.create(getTemporalNow()),
        TempoUpdatedAt.create(getTemporalNow()),
        TempoArchivedAt.create(null)
      )
    )
  }
}
