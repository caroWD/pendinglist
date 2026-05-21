import { Root } from '../../roots/domain/Root.ts'
import type { RootId } from '../../roots/domain/value-objects/RootId.ts'
import type { RootState } from '../../roots/domain/value-objects/RootState.ts'
import type { TempoArchivedAt } from '../../tempos/domain/value-objects/TempoArchivedAt.ts'
import type { TempoCreatedAt } from '../../tempos/domain/value-objects/TempoCreatedAt.ts'
import type { TempoUpdatedAt } from '../../tempos/domain/value-objects/TempoUpdatedAt.ts'
import type { BaseDescription } from './value-objects/BaseDescription.ts'
import type { BaseName } from './value-objects/BaseName.ts'
import type { BaseSlug } from './value-objects/BaseSlug.ts'

export abstract class Base extends Root {
  private _slug: BaseSlug
  private _name: BaseName
  private _description: BaseDescription

  constructor(
    id: RootId,
    slug: BaseSlug,
    name: BaseName,
    description: BaseDescription,
    state: RootState,
    createdAt: TempoCreatedAt,
    updatedAt: TempoUpdatedAt,
    archivedAt: TempoArchivedAt
  ) {
    super(id, state, createdAt, updatedAt, archivedAt)
    this._slug = slug
    this._name = name
    this._description = description
  }

  get slug(): BaseSlug {
    return this._slug
  }

  get name(): BaseName {
    return this._name
  }

  get description(): BaseDescription {
    return this._description
  }
}
