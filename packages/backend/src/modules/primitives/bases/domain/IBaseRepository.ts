import type { RootId } from '../../roots/domain/value-objects/RootId.ts'
import type { BaseSlug } from './value-objects/BaseSlug.ts'

export interface IBaseRepository<T> {
  add(entity: T): Promise<void>

  edit(entity: T): Promise<void>

  toggle(id: RootId): Promise<void>

  remove(id: RootId): Promise<void>

  findAll(): Promise<T[]>

  findOne(id: RootId): Promise<T | null>

  ensureAlreadyExists(slug: BaseSlug): Promise<boolean>
}
