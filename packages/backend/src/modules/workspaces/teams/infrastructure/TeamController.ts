import type { NextFunction, Request, Response } from 'express'
import {
  baseRequestSchema,
  idBaseRequestSchema,
  type BaseRequest,
  type BaseResponse,
  type IdBaseRequest,
} from '../../../primitives/bases/infrastructure/baseSchema.ts'
import { serviceContainer } from '../../../../shared/serviceContainer.ts'
import {
  TeamAlreadyExistsError,
  TeamNotFoundError,
  UserAlreadyExistsOnTeamError,
  UserDoesNotExistsOnTeamError,
} from '../domain/TeamErrors.ts'
import {
  teamIdRequestSchema,
  teamUserRequestSchema,
  userTeamRoleRequestSchema,
  type TeamIdRequest,
  type TeamUserRequest,
  type UserTeamRoleRequest,
} from './services/teamSchema.ts'
import { UserNotFoundError } from '../../../auth/users/domain/UserErros.ts'
import { TeamRoleNotFoundError } from '../../../access-controls/teams/team-roles/domain/TeamRoleErrors.ts'
import type { TeamDto } from '../domain/models/TeamDto.ts'
import type { UserDto } from '../../../auth/users/domain/models/UserDto.ts'

export class TeamController {
  async add(
    req: Request<BaseRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, name, description } = await baseRequestSchema.parseAsync(
        req.body
      )

      await serviceContainer.workspace.team.add(id, name, description)

      res.status(201).json({ message: 'Team successfully added!', state: true })
    } catch (error) {
      if (error instanceof TeamAlreadyExistsError)
        res.status(422).json({ message: error.message, state: false })

      next(error)
    }
  }

  async addUserToTeam(
    req: Request<UserTeamRoleRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { teamId, userId, teamRoleId } =
        await userTeamRoleRequestSchema.parseAsync(req.body)

      await serviceContainer.workspace.team.addUserToTeam(
        teamId,
        userId,
        teamRoleId
      )

      res
        .status(200)
        .json({ message: 'User successfully added to the Team!', state: true })
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof TeamNotFoundError ||
        error instanceof TeamRoleNotFoundError
      )
        res.status(404).json({ message: error.message, state: false })

      if (error instanceof UserAlreadyExistsOnTeamError)
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

      await serviceContainer.workspace.team.edit(id, name, description)

      res
        .status(200)
        .json({ message: 'Team successfully edited!', state: true })
    } catch (error) {
      if (error instanceof TeamNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      if (error instanceof TeamAlreadyExistsError)
        res.status(422).json({ message: error.message, state: false })

      next(error)
    }
  }

  async editTeamUser(
    req: Request<UserTeamRoleRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { teamId, userId, teamRoleId } =
        await userTeamRoleRequestSchema.parseAsync(req.body)

      await serviceContainer.workspace.team.editTeamUser(
        teamId,
        userId,
        teamRoleId
      )

      res
        .status(200)
        .json({ message: 'User successfully edited to the Team!', state: true })
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof TeamNotFoundError ||
        error instanceof TeamRoleNotFoundError ||
        error instanceof UserDoesNotExistsOnTeamError
      )
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async findAll(
    _req: Request,
    res: Response<TeamDto[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const teams: TeamDto[] = await serviceContainer.workspace.team.findAll()

      res.status(200).json(teams)
    } catch (error) {
      next(error)
    }
  }

  async findOne(
    req: Request<IdBaseRequest>,
    res: Response<TeamDto | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = await idBaseRequestSchema.parseAsync(req.params)

      const team: TeamDto = await serviceContainer.workspace.team.findOne(id)

      res.status(200).json(team)
    } catch (error) {
      if (error instanceof TeamNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async findUsersByTeam(
    req: Request<TeamIdRequest>,
    res: Response<UserDto[] | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { teamId } = await teamIdRequestSchema.parseAsync(req.params)

      const users: UserDto[] =
        await serviceContainer.workspace.team.findUsersByTeam(teamId)

      res.status(200).json(users)
    } catch (error) {
      if (error instanceof TeamNotFoundError)
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

      await serviceContainer.workspace.team.remove(id)

      res
        .status(200)
        .json({ message: 'Team successfully removed!', state: true })
    } catch (error) {
      if (error instanceof TeamNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async removeTeamUser(
    req: Request<TeamUserRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { teamId, userId } = await teamUserRequestSchema.parseAsync(
        req.body
      )

      await serviceContainer.workspace.team.removeTeamUser(teamId, userId)

      res.status(200).json({
        message: 'User successfully removed to the Team!',
        state: true,
      })
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof TeamNotFoundError ||
        error instanceof UserDoesNotExistsOnTeamError
      )
        res.status(404).json({ message: error.message, state: false })

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

      await serviceContainer.workspace.team.toggle(id)

      res
        .status(200)
        .json({ message: 'Team successfully toggled!', state: true })
    } catch (error) {
      if (error instanceof TeamNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async toggleTeamUser(
    req: Request<TeamUserRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { teamId, userId } = await teamUserRequestSchema.parseAsync(
        req.body
      )

      await serviceContainer.workspace.team.toggleTeamUser(teamId, userId)

      res.status(200).json({
        message: 'User successfully toggled to the Team!',
        state: true,
      })
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof TeamNotFoundError ||
        error instanceof UserDoesNotExistsOnTeamError
      )
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }
}
