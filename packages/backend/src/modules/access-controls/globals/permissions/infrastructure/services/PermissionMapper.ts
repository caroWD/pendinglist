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
import { Permission } from '../../domain/models/Permission.ts'

export class PermissionMapper {
  public static async mapToPermission(
    permission: BaseSelect
  ): Promise<Permission> {
    return new Permission(
      RootId.create(permission.id),
      BaseSlug.create(permission.slug),
      BaseName.create(permission.name),
      BaseDescription.create(permission.description),
      RootState.create(permission.state === 'active' ? 'ACTIVE' : 'ARCHIVED'),
      TempoCreatedAt.create(getTemporalFrom(permission.createdAt)),
      TempoUpdatedAt.create(getTemporalFrom(permission.updatedAt)),
      TempoArchivedAt.create(
        !permission.archivedAt ? null : getTemporalFrom(permission.archivedAt)
      )
    )
  }

  public static async mapToPermissionInsert(
    permission: Permission
  ): Promise<BaseInsert> {
    return {
      id: permission.id.value,
      slug: permission.slug.value,
      name: permission.name.value,
      description: permission.description.value,
      state: permission.state.value === 'ACTIVE' ? 'active' : 'archived',
      createdAt: permission.createdAt.value.toJSON(),
      updatedAt: permission.updatedAt.value.toJSON(),
      archivedAt: !permission.archivedAt.value
        ? null
        : permission.archivedAt.value.toJSON(),
    }
  }
}
