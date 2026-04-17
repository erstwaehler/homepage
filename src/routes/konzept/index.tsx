import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/konzept/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/konzept/"!</div>
}
