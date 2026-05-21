import z, { object } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useState, type ComponentProps } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '../ui/field'
import { Button } from '../ui/button'
import { NavLink, useNavigate } from 'react-router'
import { handleSchema, passwordSchema } from '@/lib/zodUtils'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '../ui/input-group'
import { IconEyeOff, IconEye } from '@tabler/icons-react'
import { fetchData } from '@/lib/fetchUtils'
import { useUserData } from '@/contexts/user-data/useUserData'
import type { UserData } from '@/contexts/user-data/UserDataProviderContext'

const loginFormSchema = object({
  handle: handleSchema,
  password: passwordSchema,
})

type LoginRequest = z.infer<typeof loginFormSchema>

const url: string = 'http://localhost:8765/api/v1/user/login'

export const LoginForm = ({ className, ...props }: ComponentProps<'div'>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { setUserData } = useUserData()

  const navigate = useNavigate()

  const loginForm = useForm<LoginRequest>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(loginFormSchema as any),
    defaultValues: {
      handle: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginRequest) => {
    toast.promise(
      () =>
        fetchData<UserData, LoginRequest>(url, {
          method: 'POST',
          request: {
            handle: `@${data.handle}`,
            password: data.password,
          },
        }),
      {
        loading: 'Cargando...',
        success: (response) => {
          if (!response) throw new Error('Usuario no autorizado')

          setUserData(response)

          navigate('/', { viewTransition: true })

          return 'Usuario autorizado'
        },
        error: (error) => {
          if (error instanceof Error) return error.message

          return error
        },
      }
    )
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">
            Inicia sesión en tu cuenta
          </CardTitle>
          <CardDescription>
            Introduce tu nombre de usuario y contraseña a continuación para
            iniciar sesión en tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-login" onSubmit={loginForm.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="handle"
                control={loginForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-login-handle">
                      Nombre de usuario
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id="form-login-handle"
                        aria-invalid={fieldState.invalid}
                        placeholder="john.wick"
                        autoComplete="off"
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={loginForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="form-login-password">
                        Contraseña
                      </FieldLabel>
                      <NavLink
                        to="#"
                        className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                      >
                        ¿Has olvidado tu contraseña?
                      </NavLink>
                    </div>
                    <InputGroup>
                      <InputGroupInput
                        className="items-center"
                        {...field}
                        id="form-login-password"
                        type={!showPassword ? 'password' : 'text'}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      <InputGroupAddon
                        align="inline-end"
                        className="cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {!showPassword ? <IconEyeOff /> : <IconEye />}
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field>
            <Button type="submit" form="form-login">
              Iniciar sesión
            </Button>
            <FieldDescription className="text-center">
              ¿No tienes una cuenta?{' '}
              <NavLink
                to="/auth/register"
                viewTransition
                className="hover:text-indigo-400!"
              >
                Regístrate
              </NavLink>
            </FieldDescription>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
