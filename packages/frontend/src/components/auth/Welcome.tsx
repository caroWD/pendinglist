import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export const Welcome = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>!Bienvenido(a) a PendingList¡</CardTitle>
        <CardDescription>
          Revisa la bandeja de entrada del correo electrónico registrado para
          confirmar tu cuenta.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
