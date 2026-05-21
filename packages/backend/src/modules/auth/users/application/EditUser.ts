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
  UserNotFoundError,
} from '../domain/UserErros.ts'
import { UserAvatar } from '../domain/value-objects/UserAvatar.ts'
import { UserEmail } from '../domain/value-objects/UserEmail.ts'
import { UserFirstName } from '../domain/value-objects/UserFirstName.ts'
import { UserHandle } from '../domain/value-objects/UserHandle.ts'
import { UserLastName } from '../domain/value-objects/UserLastName.ts'

export class EditUser {
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
    avatar: string | null,
    roleId: string
  ): Promise<void> {
    const userToEdit: User | null = await this._userRepository.findOne(
      RootId.create(id)
    )
    if (!userToEdit) throw new UserNotFoundError('User not found!')

    const userHandle: UserHandle = UserHandle.create(handle)
    if (userHandle.value !== userToEdit.handle.value) {
      const userHandleExists: boolean =
        await this._userRepository.ensureHandleAlreadyExists(userHandle)
      if (userHandleExists)
        throw new UserHandleAlreadyExistsError('Handle already exists!')
    }

    const userEmail: UserEmail = UserEmail.create(email)
    if (userEmail.value !== userToEdit.email.value) {
      const userEmailExists: boolean =
        await this._userRepository.ensureEmailAlreadyExists(userEmail)
      if (userEmailExists)
        throw new UserEmailAlreadyExistsError('Email already exists!')
    }

    const role: Role | null = await this._roleRepository.findOne(
      RootId.create(roleId)
    )
    if (!role) throw new RoleNotFoundError('Role not found!')

    return await this._userRepository.edit(
      new User(
        userToEdit.id,
        userHandle,
        UserFirstName.create(firstName),
        UserLastName.create(lastName),
        userEmail,
        userToEdit.password,
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
