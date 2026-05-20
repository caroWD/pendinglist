import { v7 as UUIDv7 } from 'uuid'
import * as z from 'zod'
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
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { NavLink } from 'react-router'
import {
  emailSchema,
  firstNameSchema,
  handleSchema,
  lastNameSchema,
  passwordSchema,
} from '@/lib/zodUtils'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '../ui/input-group'
import { IconEye, IconEyeOff } from '@tabler/icons-react'

const singUpFormSchema = z
  .object({
    handle: handleSchema,
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirm: passwordSchema,
  })
  .refine((data) => data.password === data.confirm, {
    error: 'Las contraseñas no coinciden.',
    path: ['confirm'],
  })

type SignUpRequest = z.infer<typeof singUpFormSchema>

type MessageReponse = {
  message: string
  state: boolean
}

export const SignUpForm = ({ className, ...props }: ComponentProps<'div'>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const signUpForm = useForm<SignUpRequest>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(singUpFormSchema as any),
    defaultValues: {
      handle: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm: '',
    },
  })

  const onSubmit = (data: SignUpRequest) => {
    const fetchLogin = async () => {
      const response = await fetch('http://localhost:8765/api/v1/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: UUIDv7(),
          handle: `@${data.handle}`,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          avatar: null,
          roleId: '019e41c6-deae-7af1-9511-f29da7a3d5d1',
        }),
      })

      if (!response.ok) {
        toast.error('Error al crear el usuario.')

        return
      }

      const responseData: MessageReponse =
        (await response.json()) as MessageReponse

      if (!responseData.state) {
        toast.error(responseData.message)

        return
      }

      toast.success(responseData.message)

      signUpForm.reset()
    }

    fetchLogin()
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="font-bold">Crear una cuenta</CardTitle>
          <CardDescription>
            Escribe tus datos a continuación para crear tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-signup" onSubmit={signUpForm.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="handle"
                control={signUpForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-handle">
                      Nombre de usuario
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id="form-signup-handle"
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
                name="firstName"
                control={signUpForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-first-name">
                      Nombre
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-signup-first-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Jhon"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="lastName"
                control={signUpForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-last-name">
                      Apellido
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-signup-last-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Wick"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={signUpForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-emial">
                      Correo electrónico
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-signup-emial"
                      aria-invalid={fieldState.invalid}
                      placeholder="ejemplo@dominio.com"
                      autoComplete="off"
                    />
                    <FieldDescription>
                      Usaremos esta dirección para ponernos en contacto contigo.
                      No compartiremos tu correo electrónico con nadie más.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={signUpForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-password">
                      Contraseña
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        className="items-center"
                        {...field}
                        id="form-signup-password"
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
                    <FieldDescription>
                      Debe tener al menos 8 caracteres.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirm"
                control={signUpForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-signup-confirm">
                      Confirmar contraseña
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        className="items-center"
                        {...field}
                        id="form-signup-confirm"
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
                    <FieldDescription>Confirma tu contraseña.</FieldDescription>
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
            <Button type="submit" form="form-signup">
              Crear cuenta
            </Button>
            <Button
              type="reset"
              variant="outline"
              onClick={() => signUpForm.reset()}
            >
              Restablecer
            </Button>
            <FieldDescription className="text-center">
              ¿Ya tienes una cuenta?{' '}
              <NavLink
                to="/auth"
                viewTransition
                className="hover:text-indigo-400!"
              >
                Inicia sesión
              </NavLink>
            </FieldDescription>
          </Field>
        </CardFooter>
      </Card>
    </div>
  )
}
