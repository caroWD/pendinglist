import { Root } from '../../../../primitives/roots/domain/Root.ts'
import type { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { RootState } from '../../../../primitives/roots/domain/value-objects/RootState.ts'
import type { TempoArchivedAt } from '../../../../primitives/tempos/domain/value-objects/TempoArchivedAt.ts'
import type { TempoCreatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoCreatedAt.ts'
import type { TempoUpdatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoUpdatedAt.ts'
import type { UserAvatar } from '../value-objects/UserAvatar.ts'
import type { UserEmail } from '../value-objects/UserEmail.ts'
import type { UserFirstName } from '../value-objects/UserFirstName.ts'
import type { UserHandle } from '../value-objects/UserHandle.ts'
import type { UserLastName } from '../value-objects/UserLastName.ts'
import type { UserPassword } from '../value-objects/UserPassword.ts'

export class User extends Root {
  private _handle: UserHandle
  private _firstName: UserFirstName
  private _lastName: UserLastName
  private _fullName: string
  private _email: UserEmail
  private _password: UserPassword
  private _avatar: UserAvatar
  private _roleId: RootId

  constructor(
    id: RootId,
    handle: UserHandle,
    firstName: UserFirstName,
    lastName: UserLastName,
    email: UserEmail,
    password: UserPassword,
    avatar: UserAvatar,
    roleId: RootId,
    state: RootState,
    createdAt: TempoCreatedAt,
    updatedAt: TempoUpdatedAt,
    archivedAt: TempoArchivedAt
  ) {
    super(id, state, createdAt, updatedAt, archivedAt)
    this._handle = handle
    this._firstName = firstName
    this._lastName = lastName
    this._fullName = `${firstName.value} ${lastName.value}`
    this._email = email
    this._password = password
    this._avatar = avatar
    this._roleId = roleId
  }

  get handle(): UserHandle {
    return this._handle
  }

  get firstName(): UserFirstName {
    return this._firstName
  }

  get lastName(): UserLastName {
    return this._lastName
  }

  get fullName(): string {
    return this._fullName
  }

  get email(): UserEmail {
    return this._email
  }

  get password(): UserPassword {
    return this._password
  }

  get avatar(): UserAvatar {
    return this._avatar
  }

  get roleId(): RootId {
    return this._roleId
  }
}
