import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/zeitplan/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/zeitplan/"!</div>
}
