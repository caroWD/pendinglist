import type { teamRolesTableSqlite } from '../../../db/sqliteSchema.js'

export const sqliteTeamRoles: (typeof teamRolesTableSqlite.$inferInsert)[] = [
  {
    id: '019e41cc-6d20-758b-bbcc-376a41e6540e',
    slug: 'team-owner',
    name: 'Team owner',
    description:
      'Control total sobre el equipo. Es el único que puede eliminar el equipo o gestionar suscripciones. Tiene todos los permisos de administración, edición y lectura.',
  },
  {
    id: '019e41cc-907b-755d-b639-24622510ba3f',
    slug: 'team-manager',
    name: 'Team manager',
    description:
      'Gestiona la operatividad del grupo. Puede invitar o eliminar miembros, crear tableros y gestionar todas las tareas, pero no puede eliminar el equipo.',
  },
  {
    id: '019e41cc-ad0f-7b78-a43d-cfef11add7d5',
    slug: 'contributor',
    name: 'Contributor',
    description:
      'Rol operativo. Puede ver las tareas y actualizarlas, pero no puede crear nuevos tableros.',
  },
  {
    id: '019e41cc-c8a0-73a6-b822-1928fc1994f2',
    slug: 'observer',
    name: 'Observer',
    description:
      'Acceso de solo lectura. Útil para miembros que solo necesitan consultar los reportes o ver las tareas.',
  },
]
