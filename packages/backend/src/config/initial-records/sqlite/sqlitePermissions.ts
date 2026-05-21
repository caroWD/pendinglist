import type { permissionsTableSqlite } from '../../../db/sqliteSchema.js'

export const sqlitePermissions: (typeof permissionsTableSqlite.$inferInsert)[] =
  [
    {
      id: '019e41c2-324f-7f9e-99e8-612d11439c2c',
      slug: 'system-config-view',
      name: 'System config view',
      description:
        'Permite visualizar las configuraciones generales del sistema y logs de auditoría.',
    },
    {
      id: '019e41c2-8b4b-7cee-9e4c-a461c0994ee1',
      slug: 'system-config-manage',
      name: 'System config manage',
      description:
        'Permite modificar variables de entorno, límites de la plataforma y mantenimiento técnico.',
    },
    {
      id: '019e41c2-cce7-7f27-abba-6e1321c0530f',
      slug: 'users-view',
      name: 'Users view',
      description:
        'Permite listar y ver perfiles de usuarios registrados en la plataforma.',
    },
    {
      id: '019e41c2-f649-70b9-987e-a89ad7caffd7',
      slug: 'users-manage',
      name: 'Users manage',
      description:
        'Permite suspender, reactivar o modificar roles globales de cualquier usuario.',
    },
    {
      id: '019e41c3-5177-7151-bf4d-ffc4ad16a1a7',
      slug: 'teams-view-all',
      name: 'Teams view all',
      description:
        'Permite visualizar todos los equipos creados en la plataforma (fines de moderación).',
    },
    {
      id: '019e41ea-7088-75db-bdba-8a7b2ac67b87',
      slug: 'teams-view',
      name: 'Teams view',
      description:
        'Permite visualizar los equipos propios creados en la plataforma.',
    },
    {
      id: '019e41c5-2518-7081-93a4-ba7cd57cefef',
      slug: 'reports-global-view',
      name: 'Reports global view',
      description:
        'Permite acceder a métricas de las tareas a nivel plataforma.',
    },
  ]
