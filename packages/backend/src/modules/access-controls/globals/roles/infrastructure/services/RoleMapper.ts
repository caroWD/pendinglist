import { getTemporalFrom } from '../../../../../../helpers/temporalHelper.ts'
import { BaseDescription } from '../../../../../primitives/bases/domain/value-objects/BaseDescription.ts'
import { BaseName } from '../../../../../primitives/bases/domain/value-objects/BaseName.ts'
import { BaseSlug } from '../../../../../primitives/bases/domain/value-objects/BaseSlug.ts'
import type {
  BaseInsert,
  BaseSelect,
} from '../../../../../primitives/bases/infrastructure/baseSchema.ts'
import { RootId } from '../../../../../primitives/roots/domain/value-objects/RootId.ts'
import { RootState } from '../../../../../primitives/roots/domain/value-objects/RootState.ts'
import { TempoArchivedAt } from '../../../../../primitives/tempos/domain/value-objects/TempoArchivedAt.ts'
import { TempoCreatedAt } from '../../../../../primitives/tempos/domain/value-objects/TempoCreatedAt.ts'
import { TempoUpdatedAt } from '../../../../../primitives/tempos/domain/value-objects/TempoUpdatedAt.ts'
import { Role } from '../../domain/models/Role.ts'

export class RoleMapper {
  public static async mapToRole(role: BaseSelect): Promise<Role> {
    return new Role(
      RootId.create(role.id),
      BaseSlug.create(role.slug),
      BaseName.create(role.name),
      BaseDescription.create(role.description),
      RootState.create(role.state === 'active' ? 'ACTIVE' : 'ARCHIVED'),
      TempoCreatedAt.create(getTemporalFrom(role.createdAt)),
      TempoUpdatedAt.create(getTemporalFrom(role.updatedAt)),
      TempoArchivedAt.create(
        !role.archivedAt ? null : getTemporalFrom(role.archivedAt)
      )
    )
  }

  public static async mapToRoleInsert(role: Role): Promise<BaseInsert> {
    return {
      id: role.id.value,
      slug: role.slug.value,
      name: role.name.value,
      description: role.description.value,
      state: role.state.value === 'ACTIVE' ? 'active' : 'archived',
      createdAt: role.createdAt.value.toJSON(),
      updatedAt: role.updatedAt.value.toJSON(),
      archivedAt: role.archivedAt.value?.toJSON() || null,
    }
  }
}
