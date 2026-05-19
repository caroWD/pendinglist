import type { rolesTableSqlite } from '../../../db/sqliteSchema.js'

export const sqliteRoles: (typeof rolesTableSqlite.$inferInsert)[] = [
  {
    id: '019e41c6-5bf5-79d5-8ca7-d3ade49c448c',
    slug: 'super-admin',
    name: 'Super admin',
    description:
      'Acceso total al sistema, gestión de configuraciones globales, auditoría y control de todos los roles y permisos.',
  },
  {
    id: '019e41c6-8e57-72f2-b071-4221492f0f69',
    slug: 'technical-support',
    name: 'Technical support',
    description:
      'Acceso limitado para visualizar perfiles de usuario y equipos con el fin de resolver incidencias reportadas por los clientes.',
  },
  {
    id: '019e41c6-b5fb-7eef-b8f9-1bdca0c7b570',
    slug: 'premium-user',
    name: 'Premium user',
    description:
      'Usuario con acceso a todas las funcionalidades estándar, además de reportes avanzados, comparativas históricas ilimitadas y mayor capacidad de creación de equipos.',
  },
  {
    id: '019e41c6-deae-7af1-9511-f29da7a3d5d1',
    slug: 'standard-user',
    name: 'Standard user',
    description:
      'Rol básico por defecto. Permite crear equipos, listas de compras y participar en tableros con límites definidos por la plataforma.',
  },
  {
    id: '019e41c7-0a80-70cb-ad56-2d5f335455b0',
    slug: 'guest-user',
    name: 'Guest user',
    description:
      'Rol con acceso restringido, generalmente para usuarios que solo visualizan listas compartidas públicamente o que están en periodo de prueba.',
  },
]
