import { Tempo } from '../../tempos/domain/Tempo.ts'
import type { TempoArchivedAt } from '../../tempos/domain/value-objects/TempoArchivedAt.ts'
import type { TempoCreatedAt } from '../../tempos/domain/value-objects/TempoCreatedAt.ts'
import type { TempoUpdatedAt } from '../../tempos/domain/value-objects/TempoUpdatedAt.ts'
import type { RootId } from './value-objects/RootId.ts'
import type { RootState } from './value-objects/RootState.ts'

export abstract class Root extends Tempo {
  private _id: RootId
  private _state: RootState

  constructor(
    id: RootId,
    state: RootState,
    createdAt: TempoCreatedAt,
    updatedAt: TempoUpdatedAt,
    archivedAt: TempoArchivedAt
  ) {
    super(createdAt, updatedAt, archivedAt)
    this._id = id
    this._state = state
  }

  get id(): RootId {
    return this._id
  }

  get state(): RootState {
    return this._state
  }
}
