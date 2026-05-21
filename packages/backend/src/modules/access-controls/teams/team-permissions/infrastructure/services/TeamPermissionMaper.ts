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
import { TeamPermission } from '../../domain/models/TeamPermission.ts'

export class TeamPermissionMapper {
  public static async mapToTeamPermission(
    teamPermission: BaseSelect
  ): Promise<TeamPermission> {
    return new TeamPermission(
      RootId.create(teamPermission.id),
      BaseSlug.create(teamPermission.slug),
      BaseName.create(teamPermission.name),
      BaseDescription.create(teamPermission.description),
      RootState.create(
        teamPermission.state === 'active' ? 'ACTIVE' : 'ARCHIVED'
      ),
      TempoCreatedAt.create(getTemporalFrom(teamPermission.createdAt)),
      TempoUpdatedAt.create(getTemporalFrom(teamPermission.updatedAt)),
      TempoArchivedAt.create(
        !teamPermission.archivedAt
          ? null
          : getTemporalFrom(teamPermission.archivedAt)
      )
    )
  }

  public static async mapToTeamPermissionInsert(
    teamPermission: TeamPermission
  ): Promise<BaseInsert> {
    return {
      id: teamPermission.id.value,
      slug: teamPermission.slug.value,
      name: teamPermission.name.value,
      description: teamPermission.description.value,
      state: teamPermission.state.value === 'ACTIVE' ? 'active' : 'archived',
      createdAt: teamPermission.createdAt.value.toJSON(),
      updatedAt: teamPermission.updatedAt.value.toJSON(),
      archivedAt: teamPermission.archivedAt.value?.toJSON() || null,
    }
  }
}
