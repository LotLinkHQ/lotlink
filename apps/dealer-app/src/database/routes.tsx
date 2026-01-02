import { RootRoute, Route, RootRouteWithContext } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'

// Layouts
import RootLayout from './layouts/RootLayout'

// Pages
import DashboardPage from './pages/dashboard'
import AppointmentsPage from './pages/appointments'
import AppointmentDetailPage from './pages/appointments/[id]'
import ConversationsPage from './pages/conversations'
import ConversationDetailPage from './pages/conversations/[id]'
import SchedulePage from './pages/schedule'
import AnalyticsPage from './pages/analytics'
import SettingsPage from './pages/settings'
import LoginPage from './pages/auth/login'
import NotFoundPage from './pages/404'

interface RouterContext {
    queryClient: QueryClient
}

const rootRoute = new RootRouteWithContext<RouterContext>()({
    component: RootLayout,
    notFoundComponent: NotFoundPage,
})

const dashboardRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: DashboardPage,
})

const appointmentsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/appointments',
    component: AppointmentsPage,
})

const appointmentDetailRoute = new Route({
    getParentRoute: () => appointmentsRoute,
    path: '$id',
    component: AppointmentDetailPage,
})

const conversationsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/conversations',
    component: ConversationsPage,
})

const conversationDetailRoute = new Route({
    getParentRoute: () => conversationsRoute,
    path: '$id',
    component: ConversationDetailPage,
})

const scheduleRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/schedule',
    component: SchedulePage,
})

const analyticsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/analytics',
    component: AnalyticsPage,
})

const settingsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/settings',
    component: SettingsPage,
})

const loginRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginPage,
})

export const routeTree = rootRoute.addChildren([
    dashboardRoute,
    appointmentsRoute.addChildren([appointmentDetailRoute]),
    conversationsRoute.addChildren([conversationDetailRoute]),
    scheduleRoute,
    analyticsRoute,
    settingsRoute,
    loginRoute,
  ])
