import { string, email } from 'zod'

export const handleSchema = string({
  error: 'El nombre de usuario debe ser una cadena de caracteres.',
})
  .min(5, {
    error: 'El nombre de usuario puede tener mínimo 5 caracteres de longitud.',
  })
  .max(30, {
    error:
      'El nombre de usuario no debe tener más de 30 caracteres de longitud.',
  })
  .refine((handle) => handle.at(0) === '@', {
    error: 'El nombre de usuario debe iniciar con un "@"',
  })

export const firstNameSchema = string({
  error: 'El nombre debe ser una cadena de caracteres.',
})
  .min(3, { error: 'El nombre puede tener mínimo 3 caracteres de longitud.' })
  .max(61, {
    error: 'El nombre no debe tener más de 61 caracteres de longitud.',
  })

export const lastNameSchema = string({
  error: 'El apellido debe ser una cadena de caracteres.',
})
  .min(3, { error: 'El apellido puede tener mínimo 3 caracteres de longitud.' })
  .max(61, {
    error: 'El apellido no debe tener más de 61 caracteres de longitud.',
  })

export const emailSchema = email({
  error:
    'El correo electrónico debe tener el siguiente formato: ejemplo@dominio.com',
})

export const passwordSchema = string({
  error: 'La contraseña debe ser una cadena de caracteres.',
})
  .refine((password) => !/\s+/g.test(password), {
    error: 'La contraseña no puede tener espacios en blanco.',
  })
  .regex(/^(?=.*[a-z]).+$/, {
    error: 'La contraseña debe contener al menos una letra minúscula.',
  })
  .regex(/^(?=.*[A-Z]).+$/, {
    error: 'La contraseña debe contener al menos una letra mayúscula.',
  })
  .regex(/^(?=.*[0-9]).+$/, {
    error: 'La contraseña debe contener al menos un número.',
  })
  .regex(/^(?=.*\d)(?=.*[$@$!%*?&/])([A-Za-z\d$@$!%*?&/]|[^ ]).+$/, {
    error:
      'La contraseña debe contener al menos uno de los siguientes caracteres especiales: "$@$!%*?&/".',
  })
  .regex(/^.{8,20}$/, {
    error:
      'La contraseña debe tener una longitud mínima de 8 caracteres y máxima de 20.',
  })
