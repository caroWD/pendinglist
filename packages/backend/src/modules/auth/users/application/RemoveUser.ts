import { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import type { IUserRepository } from '../domain/IUserRepository.ts'
import type { User } from '../domain/models/User.ts'
import { UserNotFoundError } from '../domain/UserErros.ts'

export class RemoveUser {
  private readonly _userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository
  }

  async handler(id: string): Promise<void> {
    const userToRemove: User | null = await this._userRepository.findOne(
      RootId.create(id)
    )
    if (!userToRemove) throw new UserNotFoundError('User not found!')

    return await this._userRepository.remove(userToRemove.id)
  }
}
