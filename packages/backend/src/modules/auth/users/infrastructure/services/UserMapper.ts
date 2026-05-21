import { hash } from 'bcryptjs'
import type { UserInsert, UserSelect } from './userSchema.ts'
import { User } from '../../domain/models/User.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import { UserHandle } from '../../domain/value-objects/UserHandle.ts'
import { UserFirstName } from '../../domain/value-objects/UserFirstName.ts'
import { UserLastName } from '../../domain/value-objects/UserLastName.ts'
import { UserEmail } from '../../domain/value-objects/UserEmail.ts'
import { UserPassword } from '../../domain/value-objects/UserPassword.ts'
import { UserAvatar } from '../../domain/value-objects/UserAvatar.ts'
import { RootState } from '../../../../primitives/roots/domain/value-objects/RootState.ts'
import { TempoCreatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoCreatedAt.ts'
import { TempoUpdatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoUpdatedAt.ts'
import { TempoArchivedAt } from '../../../../primitives/tempos/domain/value-objects/TempoArchivedAt.ts'
import { getTemporalFrom } from '../../../../../helpers/temporalHelper.ts'
import { SALT_ROUNDS } from '../../../../../config/config.ts'

export class UserMapper {
  public static async mapToUser(user: UserSelect): Promise<User> {
    return new User(
      RootId.create(user.id),
      UserHandle.create(user.handle),
      UserFirstName.create(user.firstName),
      UserLastName.create(user.lastName),
      UserEmail.create(user.email),
      UserPassword.create(user.password),
      UserAvatar.create(user.avatar),
      RootId.create(user.roleId),
      RootState.create(user.state === 'active' ? 'ACTIVE' : 'ARCHIVED'),
      TempoCreatedAt.create(getTemporalFrom(user.createdAt)),
      TempoUpdatedAt.create(getTemporalFrom(user.updatedAt)),
      TempoArchivedAt.create(
        !user.archivedAt ? null : getTemporalFrom(user.archivedAt)
      )
    )
  }

  public static async mapToUserInsert(user: User): Promise<UserInsert> {
    return {
      id: user.id.value,
      handle: user.handle.value,
      firstName: user.firstName.value,
      lastName: user.lastName.value,
      email: user.email.value,
      password: await hash(user.password.value, Number(SALT_ROUNDS)),
      avatar: user.avatar.value,
      roleId: user.roleId.value,
      state: user.state.value === 'ACTIVE' ? 'active' : 'archived',
      createdAt: user.createdAt.value.toJSON(),
      updatedAt: user.updatedAt.value.toJSON(),
      archivedAt: user.archivedAt.value?.toJSON() || null,
    }
  }
}
