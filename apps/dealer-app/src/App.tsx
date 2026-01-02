import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routes'

const router = createRouter({ routeTree })

export function App() {
    return <RouterProvider router={router} />
}
