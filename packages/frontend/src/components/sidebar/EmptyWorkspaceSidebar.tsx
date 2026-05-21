import { IconLayoutBoard, IconUsersGroup } from '@tabler/icons-react'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../ui/empty'
import { Button } from '../ui/button'

export type WorkspaceOption = 'equipo' | 'tablero'

interface EmptyWorkspaceSidebarProps {
  option: WorkspaceOption
}

export const EmptyWorkspaceSidebar = ({
  option,
}: EmptyWorkspaceSidebarProps) => {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {option === 'equipo' ? <IconUsersGroup /> : <IconLayoutBoard />}
        </EmptyMedia>
        <EmptyTitle>{`Aún no hay ${option}s`}</EmptyTitle>
        <EmptyDescription>
          {`Aún no has creado ningún ${option}. Empieza creando tu primer ${option}.`}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-col gap-2 *:w-full">
        <Button>{`Crear ${option.at!(0)?.toUpperCase() + option.substring!(1).toLowerCase()}`}</Button>
        <Button variant="outline">{`Importar ${option.at!(0)?.toUpperCase() + option.substring!(1).toLowerCase()}`}</Button>
      </EmptyContent>
    </Empty>
  )
}
