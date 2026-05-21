import type { TempoArchivedAt } from './value-objects/TempoArchivedAt.ts'
import type { TempoCreatedAt } from './value-objects/TempoCreatedAt.ts'
import type { TempoUpdatedAt } from './value-objects/TempoUpdatedAt.ts'

export abstract class Tempo {
  private _createdAt: TempoCreatedAt
  private _updatedAt: TempoUpdatedAt
  private _archivedAt: TempoArchivedAt

  constructor(
    createdAt: TempoCreatedAt,
    updatedAt: TempoUpdatedAt,
    archivedAt: TempoArchivedAt
  ) {
    this._createdAt = createdAt
    this._updatedAt = updatedAt
    this._archivedAt = archivedAt
  }

  get createdAt(): TempoCreatedAt {
    return this._createdAt
  }

  get updatedAt(): TempoUpdatedAt {
    return this._updatedAt
  }

  get archivedAt(): TempoArchivedAt {
    return this._archivedAt
  }
}
