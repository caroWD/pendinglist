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
import { TeamRole } from '../../domain/models/TeamRole.ts'

export class TeamRoleMapper {
  public static async mapToTeamRole(teamRole: BaseSelect): Promise<TeamRole> {
    return new TeamRole(
      RootId.create(teamRole.id),
      BaseSlug.create(teamRole.slug),
      BaseName.create(teamRole.name),
      BaseDescription.create(teamRole.description),
      RootState.create(teamRole.state === 'active' ? 'ACTIVE' : 'ARCHIVED'),
      TempoCreatedAt.create(getTemporalFrom(teamRole.createdAt)),
      TempoUpdatedAt.create(getTemporalFrom(teamRole.updatedAt)),
      TempoArchivedAt.create(
        !teamRole.archivedAt ? null : getTemporalFrom(teamRole.archivedAt)
      )
    )
  }

  public static async mapToTeamRoleInsert(
    teamRole: TeamRole
  ): Promise<BaseInsert> {
    return {
      id: teamRole.id.value,
      slug: teamRole.slug.value,
      name: teamRole.name.value,
      description: teamRole.description.value,
      state: teamRole.state.value === 'ACTIVE' ? 'active' : 'archived',
      createdAt: teamRole.createdAt.value.toJSON(),
      updatedAt: teamRole.updatedAt.value.toJSON(),
      archivedAt: teamRole.archivedAt.value?.toJSON() || null,
    }
  }
}
