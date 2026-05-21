import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { getTemporalNow } from '../helpers/temporalHelper.ts'

export const permissionsTableSqlite = sqliteTable('permissions', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at').notNull().default(getTemporalNow().toJSON()),
  updatedAt: text('updated_at').notNull().default(getTemporalNow().toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const rolesTableSqlite = sqliteTable('roles', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at').notNull().default(getTemporalNow().toJSON()),
  updatedAt: text('updated_at').notNull().default(getTemporalNow().toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const rolePermissionsTableSqlite = sqliteTable(
  'role_permissions',
  {
    roleId: text('role_id')
      .notNull()
      .references(() => rolesTableSqlite.id),
    permissionId: text('permission_id')
      .notNull()
      .references(() => permissionsTableSqlite.id),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })]
)

export const usersTableSqlite = sqliteTable('users', {
  id: text('id').primaryKey(),
  handle: text('handle').notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  avatar: text('avatar')
    .$type<string | null>()
    .$onUpdate(() => null),
  roleId: text('role_id')
    .notNull()
    .references(() => rolesTableSqlite.id),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at').notNull().default(getTemporalNow().toJSON()),
  updatedAt: text('updated_at').notNull().default(getTemporalNow().toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const teamPermissionsTableSqlite = sqliteTable('team_permissions', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at').notNull().default(getTemporalNow().toJSON()),
  updatedAt: text('updated_at').notNull().default(getTemporalNow().toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const teamRolesTableSqlite = sqliteTable('team_roles', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at').notNull().default(getTemporalNow().toJSON()),
  updatedAt: text('updated_at').notNull().default(getTemporalNow().toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const teamRoleTeamPermissionsTableSqlite = sqliteTable(
  'team_role_team_permissions',
  {
    teamRoleId: text('team_role_id')
      .notNull()
      .references(() => teamRolesTableSqlite.id),
    teamPermissionId: text('team_permission_id')
      .notNull()
      .references(() => teamPermissionsTableSqlite.id),
  },
  (table) => [
    primaryKey({ columns: [table.teamRoleId, table.teamPermissionId] }),
  ]
)

export const tasksTableSqlite = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  icon: text('icon', {
    enum: ['work', 'talk', 'coffee', 'gym', 'book', 'alarm'],
  })
    .notNull()
    .default('work'),
  status: text('status', {
    enum: ['pending', 'in progress', 'completed', "wont't do"],
  })
    .notNull()
    .default('pending'),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at').notNull().default(getTemporalNow().toJSON()),
  updatedAt: text('updated_at').notNull().default(getTemporalNow().toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const teamsTableSqlite = sqliteTable('teams', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at').notNull().default(getTemporalNow().toJSON()),
  updatedAt: text('updated_at').notNull().default(getTemporalNow().toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const boardsTableSqlite = sqliteTable('boards', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  teamId: text('team_id')
    .notNull()
    .references(() => teamsTableSqlite.id),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at').notNull().default(getTemporalNow().toJSON()),
  updatedAt: text('updated_at').notNull().default(getTemporalNow().toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const boardTasksTableSqlite = sqliteTable(
  'board_tasks',
  {
    boardId: text('board_id')
      .notNull()
      .references(() => boardsTableSqlite.id),
    taskId: text('task_id')
      .notNull()
      .references(() => tasksTableSqlite.id),
  },
  (table) => [primaryKey({ columns: [table.boardId, table.taskId] })]
)

export const userTeamsTeamRolesTableSqlite = sqliteTable(
  'user_teams_team_roles',
  {
    userId: text('user_id')
      .notNull()
      .references(() => usersTableSqlite.id),
    teamId: text('team_id')
      .notNull()
      .references(() => teamsTableSqlite.id),
    teamRoleId: text('team_role_id')
      .notNull()
      .references(() => teamRolesTableSqlite.id),
    state: text('state', { enum: ['active', 'archived'] })
      .notNull()
      .default('active'),
    createdAt: text('created_at').notNull().default(getTemporalNow().toJSON()),
    updatedAt: text('updated_at').notNull().default(getTemporalNow().toJSON()),
    archivedAt: text('archived_at')
      .$type<string | null>()
      .$onUpdate(() => null),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.teamId, table.teamRoleId] }),
  ]
)
