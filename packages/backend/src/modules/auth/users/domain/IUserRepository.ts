import type { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import type { Team } from '../../../workspaces/teams/domain/models/Team.ts'
import type { User } from './models/User.ts'
import type { UserEmail } from './value-objects/UserEmail.ts'
import type { UserHandle } from './value-objects/UserHandle.ts'
import type { UserPassword } from './value-objects/UserPassword.ts'

export interface IUserRepository {
  add(user: User): Promise<void>

  edit(user: User): Promise<void>

  editPassword(
    id: RootId,
    current: UserPassword,
    next: UserPassword
  ): Promise<void>

  toggle(id: RootId): Promise<void>

  remove(id: RootId): Promise<void>

  auth(handle: UserHandle): Promise<User | null>

  findAll(): Promise<User[]>

  findOne(id: RootId): Promise<User | null>

  findTeamsByUser(userId: RootId): Promise<Team[]>

  ensureHandleAlreadyExists(handle: UserHandle): Promise<boolean>

  ensureEmailAlreadyExists(email: UserEmail): Promise<boolean>
}
