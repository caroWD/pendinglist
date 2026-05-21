import { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import type { IUserRepository } from '../domain/IUserRepository.ts'
import type { User } from '../domain/models/User.ts'
import { UserNotFoundError } from '../domain/UserErros.ts'
import { UserPassword } from '../domain/value-objects/UserPassword.ts'

export class EditPasswordUser {
  private readonly _userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository
  }

  async handler(id: string, current: string, next: string): Promise<void> {
    const userToEdit: User | null = await this._userRepository.findOne(
      RootId.create(id)
    )
    if (!userToEdit) throw new UserNotFoundError('User not found!')

    return await this._userRepository.editPassword(
      userToEdit.id,
      UserPassword.create(current),
      UserPassword.create(next)
    )
  }
}
