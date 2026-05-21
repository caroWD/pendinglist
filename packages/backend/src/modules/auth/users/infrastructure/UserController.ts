import { v7 as UUIDv7 } from 'uuid'
import { SignJWT } from 'jose'
import type { NextFunction, Request, Response } from 'express'
import {
  addUserRequestSchema,
  authUserRequestSchema,
  editPasswordUserRequestSchema,
  editUserRequestSchema,
  userIdRequestSchema,
  type AddUserRequest,
  type AuthUserRequest,
  type EditPasswordUserRequest,
  type EditUserRequest,
  type UserIdRequest,
} from './services/userSchema.ts'
import {
  idBaseRequestSchema,
  type BaseResponse,
  type IdBaseRequest,
} from '../../../primitives/bases/infrastructure/baseSchema.ts'
import { serviceContainer } from '../../../../shared/serviceContainer.ts'
import type { RoleDto } from '../../../access-controls/globals/roles/domain/models/RoleDto.ts'
import type { UserDto } from '../domain/models/UserDto.ts'
import type { TeamRoleDto } from '../../../access-controls/teams/team-roles/domain/models/TeamRoleDto.ts'
import { TeamRoleNotFoundError } from '../../../access-controls/teams/team-roles/domain/TeamRoleErrors.ts'
import {
  UnauthorizedUserError,
  UserEmailAlreadyExistsError,
  UserHandleAlreadyExistsError,
  UserNotFoundError,
} from '../domain/UserErros.ts'
import { TeamAlreadyExistsError } from '../../../workspaces/teams/domain/TeamErrors.ts'
import { RoleNotFoundError } from '../../../access-controls/globals/roles/domain/RoleErrors.ts'
import type { UserAuthDto } from '../domain/models/UserAuthDto.ts'
import {
  JWT_ALG,
  JWT_AUDIENCE,
  JWT_CLAIM,
  JWT_ISSUER,
  JWT_SECRET,
  NODE_ENV,
} from '../../../../config/config.ts'
import type { TeamDto } from '../../../workspaces/teams/domain/models/TeamDto.ts'

const adminRoles: string[] = [
  'Super admin',
  'Catalog moderator',
  'Technical support',
]

export class UserController {
  async add(
    req: Request<AddUserRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        id,
        handle,
        firstName,
        lastName,
        email,
        password,
        avatar,
        roleId,
      } = await addUserRequestSchema.parseAsync(req.body)

      await serviceContainer.auth.user.add(
        id,
        handle,
        firstName,
        lastName,
        email,
        password,
        avatar,
        roleId
      )

      adminRoles.push('Guest user')

      const role: RoleDto =
        await serviceContainer.accessControl.global.role.findOne(roleId)
      if (!adminRoles.includes(role.name)) {
        const user: UserDto = await serviceContainer.auth.user.findOne(id)

        const teamId: string = UUIDv7()
        await serviceContainer.workspace.team.add(
          teamId,
          `${user.handle}'s team`,
          `${user.fullName}'s personal team`
        )

        const teamRoleOwner: TeamRoleDto | undefined = (
          await serviceContainer.accessControl.team.role.findAll()
        )
          .filter((teamRole) => teamRole.name === 'Team owner')
          .at(0)
        if (!teamRoleOwner)
          throw new TeamRoleNotFoundError('TeamRole not found!')

        await serviceContainer.workspace.team.addUserToTeam(
          teamId,
          user.id,
          teamRoleOwner.id
        )
      }

      res.status(201).json({ message: 'User successfully added!', state: true })
    } catch (error) {
      if (
        error instanceof UserHandleAlreadyExistsError ||
        error instanceof UserEmailAlreadyExistsError ||
        error instanceof TeamAlreadyExistsError
      )
        res.status(422).json({ message: error.message, state: false })

      if (
        error instanceof RoleNotFoundError ||
        error instanceof UserNotFoundError ||
        error instanceof TeamRoleNotFoundError
      )
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async auth(
    req: Request<AuthUserRequest>,
    res: Response<UserDto | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { handle, password } = await authUserRequestSchema.parseAsync(
        req.body
      )

      const user: UserAuthDto = await serviceContainer.auth.user.auth(
        handle,
        password
      )

      const jwt = await new SignJWT({
        [JWT_CLAIM]: true,
        id: user.id,
        handle: user.handle,
        fullName: user.fullName,
        email: user.emial,
        roleId: user.roleId,
        roleName: user.roleName,
        admin: adminRoles.includes(user.roleName),
      })
        .setProtectedHeader({ alg: JWT_ALG })
        .setIssuedAt()
        .setIssuer(JWT_ISSUER)
        .setAudience(JWT_AUDIENCE)
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode(JWT_SECRET))

      const userDto: UserDto = await serviceContainer.auth.user.findOne(user.id)

      res
        .status(200)
        .cookie('access-token', jwt, {
          httpOnly: true,
          secure: NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60,
        })
        .json(userDto)
    } catch (error) {
      if (error instanceof UnauthorizedUserError)
        res.status(401).json({ message: error.message, state: false })

      next(error)
    }
  }

  async editPassword(
    req: Request<EditPasswordUserRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, current, next } =
        await editPasswordUserRequestSchema.parseAsync(req.body)

      await serviceContainer.auth.user.editPassword(id, current, next)

      res
        .status(200)
        .json({ message: 'User successfully edited!', state: true })
    } catch (error) {
      if (error instanceof UserNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      if (error instanceof UnauthorizedUserError)
        res.status(401).json({ message: error.message, state: false })

      next(error)
    }
  }

  async edit(
    req: Request<EditUserRequest>,
    res: Response<BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, handle, firstName, lastName, email, avatar, roleId } =
        await editUserRequestSchema.parseAsync(req.body)

      await serviceContainer.auth.user.edit(
        id,
        handle,
        firstName,
        lastName,
        email,
        avatar,
        roleId
      )

      res
        .status(200)
        .json({ message: 'User successfully edited!', state: true })
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof RoleNotFoundError
      )
        res.status(404).json({ message: error.message, state: false })

      if (
        error instanceof UserHandleAlreadyExistsError ||
        error instanceof UserEmailAlreadyExistsError
      )
        res.status(422).json({ message: error.message, state: false })

      next(error)
    }
  }

  async findAll(
    _req: Request,
    res: Response<UserDto[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const users: UserDto[] = await serviceContainer.auth.user.findAll()

      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  async findOne(
    req: Request<IdBaseRequest>,
    res: Response<UserDto | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = await idBaseRequestSchema.parseAsync(req.params)
      const user: UserDto = await serviceContainer.auth.user.findOne(id)

      res.status(200).json(user)
    } catch (error) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof RoleNotFoundError
      )
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }

  async findTeams(
    req: Request<UserIdRequest>,
    res: Response<TeamDto[] | BaseResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = await userIdRequestSchema.parseAsync(req.params)
      const teams: TeamDto[] =
        await serviceContainer.auth.user.findTeams(userId)

      res.status(200).json(teams)
    } catch (error) {
      if (error instanceof UserNotFoundError)
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

      await serviceContainer.auth.user.remove(id)

      res
        .status(200)
        .json({ message: 'User successfully removed!', state: false })
    } catch (error) {
      if (error instanceof UserNotFoundError)
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

      await serviceContainer.auth.user.toggle(id)

      res
        .status(200)
        .json({ message: 'User successfully toggled!', state: true })
    } catch (error) {
      if (error instanceof UserNotFoundError)
        res.status(404).json({ message: error.message, state: false })

      next(error)
    }
  }
}
