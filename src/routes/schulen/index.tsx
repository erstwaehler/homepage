import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/schulen/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/schulen/"!</div>
}
