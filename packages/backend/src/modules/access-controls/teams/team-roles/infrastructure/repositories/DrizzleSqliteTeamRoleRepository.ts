import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import type { ITeamRoleRepository } from '../../domain/ITeamRoleRepository.ts'
import type { RootId } from '../../../../../primitives/roots/domain/value-objects/RootId.ts'
import {
  teamPermissionsTableSqlite,
  teamRolesTableSqlite,
  teamRoleTeamPermissionsTableSqlite,
} from '../../../../../../db/sqliteSchema.ts'
import { and, eq } from 'drizzle-orm'
import type { TeamPermission } from '../../../team-permissions/domain/models/TeamPermission.ts'
import type {
  BaseInsert,
  BaseSelect,
} from '../../../../../primitives/bases/infrastructure/baseSchema.ts'
import { TeamPermissionMapper } from '../../../team-permissions/infrastructure/services/TeamPermissionMaper.ts'
import type { TeamRole } from '../../domain/models/TeamRole.ts'
import { TeamRoleMapper } from '../services/TeamRoleMapper.ts'
import { TeamRoleNotFoundError } from '../../domain/TeamRoleErrors.ts'
import { getTemporalNow } from '../../../../../../helpers/temporalHelper.ts'
import type { BaseSlug } from '../../../../../primitives/bases/domain/value-objects/BaseSlug.ts'

export class DrizzleSqliteTeamRoleRepository implements ITeamRoleRepository {
  private readonly _sqlite: LibSQLDatabase

  constructor(sqlite: LibSQLDatabase) {
    this._sqlite = sqlite
  }

  async addTeamPermissionToTeamRole(
    teamRoleId: RootId,
    teamPermissionId: RootId
  ): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .insert(teamRoleTeamPermissionsTableSqlite)
      .values({
        teamRoleId: teamRoleId.value,
        teamPermissionId: teamPermissionId.value,
      })

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async removeTeamPermissionToTeamRole(
    teamRoleId: RootId,
    teamPermissionId: RootId
  ): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .delete(teamRoleTeamPermissionsTableSqlite)
      .where(
        and(
          eq(teamRoleTeamPermissionsTableSqlite.teamRoleId, teamRoleId.value),
          eq(
            teamRoleTeamPermissionsTableSqlite.teamPermissionId,
            teamPermissionId.value
          )
        )
      )

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findTeamPermissionsForTeamRole(
    teamRoleId: RootId
  ): Promise<TeamPermission[]> {
    const teamPermissions: BaseSelect[] = (
      await this._sqlite
        .select()
        .from(teamRoleTeamPermissionsTableSqlite)
        .where(
          eq(teamRoleTeamPermissionsTableSqlite.teamRoleId, teamRoleId.value)
        )
        .leftJoin(
          teamPermissionsTableSqlite,
          eq(
            teamRoleTeamPermissionsTableSqlite.teamPermissionId,
            teamPermissionsTableSqlite.id
          )
        )
    )
      .map((result) => result.team_permissions)
      .filter((result) => result !== null)

    return !teamPermissions.length
      ? []
      : await Promise.all(
          teamPermissions.map(
            async (teamPermission) =>
              await TeamPermissionMapper.mapToTeamPermission(teamPermission)
          )
        )
  }

  async ensureTeamRoleHasThisTeamPermission(
    teamRoleId: RootId,
    teamPermissionId: RootId
  ): Promise<boolean> {
    const [teamRoleTeamPermission] = await this._sqlite
      .select()
      .from(teamRoleTeamPermissionsTableSqlite)
      .where(
        and(
          eq(teamRoleTeamPermissionsTableSqlite.teamRoleId, teamRoleId.value),
          eq(
            teamRoleTeamPermissionsTableSqlite.teamPermissionId,
            teamPermissionId.value
          )
        )
      )

    return !teamRoleTeamPermission ? false : true
  }

  async add(entity: TeamRole): Promise<void> {
    const teamRoleMapped: BaseInsert =
      await TeamRoleMapper.mapToTeamRoleInsert(entity)

    const { rowsAffected } = await this._sqlite
      .insert(teamRolesTableSqlite)
      .values(teamRoleMapped)

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async edit(entity: TeamRole): Promise<void> {
    const teamRoleMapped: BaseInsert =
      await TeamRoleMapper.mapToTeamRoleInsert(entity)

    const { rowsAffected } = await this._sqlite
      .update(teamRolesTableSqlite)
      .set({
        slug: teamRoleMapped.slug,
        name: teamRoleMapped.name,
        description: teamRoleMapped.description,
        updatedAt: teamRoleMapped.updatedAt,
      })
      .where(eq(teamRolesTableSqlite.id, teamRoleMapped.id))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async toggle(id: RootId): Promise<void> {
    const [teamRole] = await this._sqlite
      .select({ state: teamRolesTableSqlite.state })
      .from(teamRolesTableSqlite)
      .where(eq(teamRolesTableSqlite.id, id.value))
    if (!teamRole) throw new TeamRoleNotFoundError('TeamRole not found!')

    const { rowsAffected } = await this._sqlite
      .update(teamRolesTableSqlite)
      .set({
        state: teamRole.state === 'active' ? 'archived' : 'active',
        updatedAt: getTemporalNow().toJSON(),
        archivedAt:
          teamRole.state === 'active' ? getTemporalNow().toJSON() : null,
      })
      .where(eq(teamRolesTableSqlite.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async remove(id: RootId): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .delete(teamRolesTableSqlite)
      .where(eq(teamRolesTableSqlite.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findAll(): Promise<TeamRole[]> {
    const teamRoles: BaseSelect[] = await this._sqlite
      .select()
      .from(teamRolesTableSqlite)

    return !teamRoles.length
      ? []
      : await Promise.all(
          teamRoles.map(
            async (teamRole) => await TeamRoleMapper.mapToTeamRole(teamRole)
          )
        )
  }

  async findOne(id: RootId): Promise<TeamRole | null> {
    const [teamRole] = await this._sqlite
      .select()
      .from(teamRolesTableSqlite)
      .where(eq(teamRolesTableSqlite.id, id.value))

    return !teamRole ? null : await TeamRoleMapper.mapToTeamRole(teamRole)
  }

  async ensureAlreadyExists(slug: BaseSlug): Promise<boolean> {
    const [teamRole] = await this._sqlite
      .select({ slug: teamRolesTableSqlite.slug })
      .from(teamRolesTableSqlite)
      .where(eq(teamRolesTableSqlite.slug, slug.value))

    return !teamRole ? false : true
  }
}
