import { Home } from './Home'
import { Route, Routes } from './AppRouter.types'
import { onNavigation } from './AppRouter.utils'

export const useRoutes = (): Route[] => [
  {
    path: Routes.HOME,
    isRouteEnabled: true,
    isNavigationEnabled: true,
    element: <Home />,
    title: 'Home',
    onClick: onNavigation,
  },
]
