import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import type { ITeamRepository } from '../../domain/ITeamRepository.ts'
import { RootId } from '../../../../primitives/roots/domain/value-objects/RootId.ts'
import {
  teamsTableSqlite,
  usersTableSqlite,
  userTeamsTeamRolesTableSqlite,
} from '../../../../../db/sqliteSchema.ts'
import { getTemporalNow } from '../../../../../helpers/temporalHelper.ts'
import { and, eq } from 'drizzle-orm'
import {
  TeamNotFoundError,
  UserDoesNotExistsOnTeamError,
} from '../../domain/TeamErrors.ts'
import { User } from '../../../../auth/users/domain/models/User.ts'
import type { Team } from '../../domain/models/Team.ts'
import type {
  BaseInsert,
  BaseSelect,
} from '../../../../primitives/bases/infrastructure/baseSchema.ts'
import { TeamMapper } from '../services/TeamMapper.ts'
import type { BaseSlug } from '../../../../primitives/bases/domain/value-objects/BaseSlug.ts'
import { UserMapper } from '../../../../auth/users/infrastructure/services/UserMapper.ts'

export class DrizzleSqliteTeamRepository implements ITeamRepository {
  private readonly _sqlite: LibSQLDatabase

  constructor(sqlite: LibSQLDatabase) {
    this._sqlite = sqlite
  }

  async addUserToTeam(
    teamId: RootId,
    userId: RootId,
    teamRoleId: RootId
  ): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .insert(userTeamsTeamRolesTableSqlite)
      .values({
        userId: userId.value,
        teamId: teamId.value,
        teamRoleId: teamRoleId.value,
      })

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async editTeamUser(
    teamId: RootId,
    userId: RootId,
    teamRoleId: RootId
  ): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .update(userTeamsTeamRolesTableSqlite)
      .set({
        teamRoleId: teamRoleId.value,
        updatedAt: getTemporalNow().toJSON(),
      })
      .where(
        and(
          eq(userTeamsTeamRolesTableSqlite.teamId, teamId.value),
          eq(userTeamsTeamRolesTableSqlite.userId, userId.value)
        )
      )

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async toggleTeamUser(teamId: RootId, userId: RootId): Promise<void> {
    const [userTeamsRoles] = await this._sqlite
      .select({ state: userTeamsTeamRolesTableSqlite.state })
      .from(userTeamsTeamRolesTableSqlite)
      .where(
        and(
          eq(userTeamsTeamRolesTableSqlite.userId, userId.value),
          eq(userTeamsTeamRolesTableSqlite.teamId, teamId.value)
        )
      )

    if (!userTeamsRoles)
      throw new UserDoesNotExistsOnTeamError('User does not exists on team!')

    const { rowsAffected } = await this._sqlite
      .update(userTeamsTeamRolesTableSqlite)
      .set({
        state: userTeamsRoles.state === 'active' ? 'archived' : 'active',
        archivedAt:
          userTeamsRoles.state === 'active' ? getTemporalNow().toJSON() : null,
      })
      .where(
        and(
          eq(userTeamsTeamRolesTableSqlite.userId, userId.value),
          eq(userTeamsTeamRolesTableSqlite.teamId, teamId.value)
        )
      )

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async removeTeamUser(teamId: RootId, userId: RootId): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .delete(userTeamsTeamRolesTableSqlite)
      .where(
        and(
          eq(userTeamsTeamRolesTableSqlite.userId, userId.value),
          eq(userTeamsTeamRolesTableSqlite.teamId, teamId.value)
        )
      )

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findUsersByTeam(teamId: RootId): Promise<User[]> {
    const users = (
      await this._sqlite
        .select()
        .from(userTeamsTeamRolesTableSqlite)
        .where(eq(userTeamsTeamRolesTableSqlite.teamId, teamId.value))
        .leftJoin(
          usersTableSqlite,
          eq(userTeamsTeamRolesTableSqlite.userId, usersTableSqlite.id)
        )
    )
      .map((result) => result.users)
      .filter((result) => result !== null)

    return !users.length
      ? []
      : await Promise.all(
          users.map(async (user) => await UserMapper.mapToUser(user))
        )
  }

  async ensureUserAlreadyExistsOnTeam(
    teamId: RootId,
    userId: RootId
  ): Promise<boolean> {
    const [exists] = await this._sqlite
      .select({
        userId: userTeamsTeamRolesTableSqlite.userId,
        teamId: userTeamsTeamRolesTableSqlite.teamId,
      })
      .from(userTeamsTeamRolesTableSqlite)
      .where(
        and(
          eq(userTeamsTeamRolesTableSqlite.userId, userId.value),
          eq(userTeamsTeamRolesTableSqlite.teamId, teamId.value)
        )
      )

    return !exists ? false : true
  }

  async add(entity: Team): Promise<void> {
    const teamMapped: BaseInsert = await TeamMapper.mapToTeamInsert(entity)

    const { rowsAffected } = await this._sqlite
      .insert(teamsTableSqlite)
      .values(teamMapped)

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async edit(entity: Team): Promise<void> {
    const teamMapped: BaseInsert = await TeamMapper.mapToTeamInsert(entity)

    const { rowsAffected } = await this._sqlite
      .update(teamsTableSqlite)
      .set({
        slug: teamMapped.slug,
        name: teamMapped.name,
        description: teamMapped.description,
        updatedAt: teamMapped.updatedAt,
      })
      .where(eq(teamsTableSqlite.id, teamMapped.id))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async toggle(id: RootId): Promise<void> {
    const [team] = await this._sqlite
      .select({ state: teamsTableSqlite.state })
      .from(teamsTableSqlite)
      .where(eq(teamsTableSqlite.id, id.value))
    if (!team) throw new TeamNotFoundError('Team not found!')

    const { rowsAffected } = await this._sqlite
      .update(teamsTableSqlite)
      .set({
        state: team.state === 'active' ? 'archived' : 'active',
        archivedAt: team.state === 'active' ? getTemporalNow().toJSON() : null,
      })
      .where(eq(teamsTableSqlite.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async remove(id: RootId): Promise<void> {
    const { rowsAffected } = await this._sqlite
      .delete(teamsTableSqlite)
      .where(eq(teamsTableSqlite.id, id.value))

    if (!rowsAffected)
      throw new Error('Something went wrong! Please contact the administrator.')
  }

  async findAll(): Promise<Team[]> {
    const teams: BaseSelect[] = await this._sqlite
      .select()
      .from(teamsTableSqlite)

    return !teams.length
      ? []
      : await Promise.all(
          teams.map(async (team) => await TeamMapper.mapToTeam(team))
        )
  }

  async findOne(id: RootId): Promise<Team | null> {
    const [teamFinded] = await this._sqlite
      .select()
      .from(teamsTableSqlite)
      .where(eq(teamsTableSqlite.id, id.value))

    return !teamFinded ? null : await TeamMapper.mapToTeam(teamFinded)
  }

  async ensureAlreadyExists(slug: BaseSlug): Promise<boolean> {
    const [exists] = await this._sqlite
      .select({ slug: teamsTableSqlite.slug })
      .from(teamsTableSqlite)
      .where(eq(teamsTableSqlite.slug, slug.value))

    return !exists ? false : true
  }
}
