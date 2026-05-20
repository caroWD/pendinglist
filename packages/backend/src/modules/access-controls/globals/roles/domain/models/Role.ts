import { Base } from '../../../../../primitives/bases/domain/Base.ts'
import type { BaseDescription } from '../../../../../primitives/bases/domain/value-objects/BaseDescription.ts'
import type { BaseName } from '../../../../../primitives/bases/domain/value-objects/BaseName.ts'
import type { BaseSlug } from '../../../../../primitives/bases/domain/value-objects/BaseSlug.ts'
import type { RootId } from '../../../../../primitives/roots/domain/value-objects/RootId.ts'
import type { RootState } from '../../../../../primitives/roots/domain/value-objects/RootState.ts'
import type { TempoArchivedAt } from '../../../../../primitives/tempos/domain/value-objects/TempoArchivedAt.ts'
import type { TempoCreatedAt } from '../../../../../primitives/tempos/domain/value-objects/TempoCreatedAt.ts'
import type { TempoUpdatedAt } from '../../../../../primitives/tempos/domain/value-objects/TempoUpdatedAt.ts'

export class Role extends Base {
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
    super(id, slug, name, description, state, createdAt, updatedAt, archivedAt)
  }
}
