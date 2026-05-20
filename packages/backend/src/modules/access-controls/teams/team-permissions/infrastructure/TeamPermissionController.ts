import type { NextFunction, Request, Response } from 'express'
import {
  baseRequestSchema,
  idBaseRequestSchema,
  type BaseRequest,
  type BaseResponse,
  type IdBaseRequest,
} from '../../../../primitives/bases/infrastructure/baseSchema.ts'
import { serviceContainer } from '../../../../../shared/serviceContainer.ts'
import {
  TeamPermissionAlreadyExistsError,
  TeamPermissionNotFoundError,
} from '../domain/TeamPermissionErrors.ts'
import type { TeamPermissionDto } from '../domain/models/TeamPermissionDto.ts'

export class TeamPermissionController {
  async add(
    req: Request<BaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, name, description } = await baseRequestSchema.parseAsync(
        req.body
      )

      await serviceContainer.accessControl.team.permission.add(
        id,
        name,
        description
      )

      res
        .status(201)
        .json({ message: 'TeamPermission added successfully!', state: true })
    } catch (error) {
      if (error instanceof TeamPermissionAlreadyExistsError)
        res.status(422).json({ message: error.message, state: false })

      next(error)
    }
  }

  async edit(
    req: Request<BaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, name, description } = await baseRequestSchema.parseAsync(
        req.body
      )

      await serviceContainer.accessControl.team.permission.edit(
        id,
        name,
        description
      )

      res
        .status(200)
        .json({ message: 'TeamPermission edited successfully!', state: true })
    } catch (error) {
      if (error instanceof TeamPermissionNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      if (error instanceof TeamPermissionAlreadyExistsError)
        res.status(422).json({ message: error.message, state: false })

      next(error)
    }
  }

  async toggle(
    req: Request<IdBaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = await idBaseRequestSchema.parseAsync(req.body)

      await serviceContainer.accessControl.team.permission.toggle(id)

      res
        .status(200)
        .json({ message: 'TeamPermission toggled successfully!', state: true })
    } catch (error) {
      if (error instanceof TeamPermissionNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async remove(
    req: Request<IdBaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = await idBaseRequestSchema.parseAsync(req.body)

      await serviceContainer.accessControl.team.permission.remove(id)

      res
        .status(200)
        .json({ message: 'TeamPermission removed successfully!', state: true })
    } catch (error) {
      if (error instanceof TeamPermissionNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async findAll(
    _req: Request,
    res: Response<TeamPermissionDto[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const teamPermissions: TeamPermissionDto[] =
        await serviceContainer.accessControl.team.permission.findAll()

      res.status(200).json(teamPermissions)
    } catch (error) {
      next(error)
    }
  }

  async findOne(
    req: Request<IdBaseRequest>,
    res: Response<TeamPermissionDto | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = await idBaseRequestSchema.parseAsync(req.params)

      const teamPermission: TeamPermissionDto =
        await serviceContainer.accessControl.team.permission.findOne(id)

      res.status(200).json(teamPermission)
    } catch (error) {
      if (error instanceof TeamPermissionNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }
}
