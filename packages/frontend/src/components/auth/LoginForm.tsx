import z, { object } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'
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
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { NavLink } from 'react-router'
import { handleSchema, passwordSchema } from '@/lib/zodUtils'

const loginFormSchema = object({
  handle: handleSchema,
  password: passwordSchema,
})

type LoginRequest = z.infer<typeof loginFormSchema>

type MessageReponse = {
  message: string
  state: boolean
}

export const LoginForm = ({ className, ...props }: ComponentProps<'div'>) => {
  const loginForm = useForm<LoginRequest>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(loginFormSchema as any),
    defaultValues: {
      handle: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginRequest) => {
    const fetchLogin = async () => {
      const response = await fetch('http://localhost:8765/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        toast.error('Error al iniciar sesión')

        return
      }

      const responseData: MessageReponse =
        (await response.json()) as MessageReponse

      if (!responseData.state) {
        toast.error(responseData.message)

        return
      }

      toast.success(responseData.message)

      loginForm.reset()
    }

    fetchLogin()
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
                    <Input
                      {...field}
                      id="form-login-handle"
                      aria-invalid={fieldState.invalid}
                      placeholder="@john.wick"
                      autoComplete="off"
                    />
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
                    <Input
                      {...field}
                      id="form-login-password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
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
