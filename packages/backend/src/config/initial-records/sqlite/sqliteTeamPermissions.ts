import type { teamPermissionsTableSqlite } from '../../../db/sqliteSchema.js'

export const sqliteTeamPermissions: (typeof teamPermissionsTableSqlite.$inferInsert)[] =
  [
    {
      id: '019e41c9-ad8d-7cbc-80ef-7afdd1fb3721',
      slug: 'team-members-manage',
      name: 'Team members manage',
      description:
        'Permite invitar nuevos miembros, eliminar integrantes o cambiar sus roles dentro del equipo.',
    },
    {
      id: '019e41c9-d57b-77bc-91fd-0eb141ea3c0b',
      slug: 'team-settings-edit',
      name: 'Team settings edit',
      description:
        'Permite modificar el nombre, la descripción o la configuración de privacidad del equipo.',
    },
    {
      id: '019e41ca-007c-712d-819b-b67057f3a798',
      slug: 'team-delete',
      name: 'Team delete',
      description:
        'Permite eliminar el equipo de forma permanente junto con todos sus tableros y listas.',
    },
    {
      id: '019e41ca-2180-796d-afbc-55674d7b6115',
      slug: 'board-create',
      name: 'Board create',
      description:
        'Permite crear nuevos tableros dentro del equipo para organizar diferentes tareas.',
    },
    {
      id: '019e41ca-73af-7674-bd63-c81d1b4f6813',
      slug: 'board-edit',
      name: 'Board edit',
      description:
        'Permite renombrar o cambiar la descripción de los tableros existentes.',
    },
    {
      id: '019e41ca-a51b-7b4a-8aae-5c0a3e0cd2db',
      slug: 'board-delete',
      name: 'Board delete',
      description:
        'Permite eliminar tableros y desvincular las tareas asociadas a ellos.',
    },
    {
      id: '019e41ca-c79e-7c2c-9a48-3d31d6fa9890',
      slug: 'task-add',
      name: 'Task add',
      description: 'Permite agregar nuevos tareas a un tablero existente.',
    },
    {
      id: '019e41ca-ebb7-795d-be1b-8914684100df',
      slug: 'task-update',
      name: 'Task update',
      description: 'Permite cambiar el estado de las tareas.',
    },
    {
      id: '019e41cb-127b-7370-a9c7-dbb0c0eea10e',
      slug: 'task-remove',
      name: 'Task remove',
      description: 'Permite eliminar tareas de un tablero.',
    },
    {
      id: '019e41cb-40ba-7bf9-8d86-78fbb721916d',
      slug: 'team-reports-view',
      name: 'Team reports view',
      description: 'Permite visualizar las comparativas de las tereas.',
    },
  ]
