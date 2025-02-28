import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(catalog)/filter')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(catalog)/filter"!</div>
}
