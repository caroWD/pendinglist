import { getTemporalFrom } from '../../../../../helpers/temporalHelper.ts'
import { BaseDescription } from '../../../../primitives/bases/domain/value-objects/BaseDescription.ts'
import { BaseName } from '../../../../primitives/bases/domain/value-objects/BaseName.ts'
import { BaseSlug } from '../../../../primitives/bases/domain/value-objects/BaseSlug.ts'
import type {
  BaseInsert,
  BaseSelect,
} from '../../../../primitives/bases/infrastructure/baseSchema.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import { RootState } from '../../../../primitives/roots/domain/value-objects/RootState.ts'
import { TempoArchivedAt } from '../../../../primitives/tempos/domain/value-objects/TempoArchivedAt.ts'
import { TempoCreatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoCreatedAt.ts'
import { TempoUpdatedAt } from '../../../../primitives/tempos/domain/value-objects/TempoUpdatedAt.ts'
import { Team } from '../../domain/models/Team.ts'

export class TeamMapper {
  public static async mapToTeam(team: BaseSelect): Promise<Team> {
    return new Team(
      RootId.create(team.id),
      BaseSlug.create(team.slug),
      BaseName.create(team.name),
      BaseDescription.create(team.description),
      RootState.create(team.state === 'active' ? 'ACTIVE' : 'ARCHIVED'),
      TempoCreatedAt.create(getTemporalFrom(team.createdAt)),
      TempoUpdatedAt.create(getTemporalFrom(team.updatedAt)),
      TempoArchivedAt.create(
        !team.archivedAt ? null : getTemporalFrom(team.archivedAt)
      )
    )
  }

  public static async mapToTeamInsert(team: Team): Promise<BaseInsert> {
    return {
      id: team.id.value,
      slug: team.slug.value,
      name: team.name.value,
      description: team.description.value,
      createdAt: team.createdAt.value.toJSON(),
      updatedAt: team.updatedAt.value.toJSON(),
      archivedAt: team.archivedAt.value?.toJSON() || null,
      state: team.state.value === 'ACTIVE' ? 'active' : 'archived',
    }
  }
}
