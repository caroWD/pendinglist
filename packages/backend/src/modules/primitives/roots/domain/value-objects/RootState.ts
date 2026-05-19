import { DomainError } from '../../../errors/domain/DomainError.ts'

const Status = {
  active: 'ACTIVE',
  archived: 'ARCHIVED',
} as const

export type RootStateEmun = (typeof Status)[keyof typeof Status]

export class RootState {
  value: RootStateEmun

  private constructor(value: RootStateEmun) {
    this.value = value
  }

  public static create(value: RootStateEmun): RootState {
    if (value === null) throw new DomainError('The State cannot be null.')

    if (typeof value !== 'string')
      throw new DomainError('The State must be a string.')

    if (value !== 'ACTIVE' && value !== 'ARCHIVED')
      throw new DomainError('The State must be a RootStateEnum.')

    return new RootState(value)
  }
}
