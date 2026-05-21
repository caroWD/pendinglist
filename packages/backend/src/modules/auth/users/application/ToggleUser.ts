import { RootId } from '../../../primitives/roots/domain/value-objects/RootId.ts'
import type { IUserRepository } from '../domain/IUserRepository.ts'
import type { User } from '../domain/models/User.ts'
import { UserNotFoundError } from '../domain/UserErros.ts'

export class ToggleUser {
  private readonly _userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository
  }

  async handler(id: string): Promise<void> {
    const userToToggle: User | null = await this._userRepository.findOne(
      RootId.create(id)
    )
    if (!userToToggle) throw new UserNotFoundError('User not found!')

    return await this._userRepository.toggle(userToToggle.id)
  }
}
