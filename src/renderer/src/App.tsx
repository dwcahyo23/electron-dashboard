import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  Title,
  UnstyledButton,
  useMantineColorScheme
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconLogout, IconMoon, IconSun } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import {
  Link,
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
  useNavigate
} from 'react-router-dom'
import Clock from './components/Clock'
import DashboardAPQ from './pages/DashboardAPQ'
import DashboardQSense from './pages/DashboardQSense'
import MnWoForm from './pages/FormWo'
import Login from './pages/Login'
import PortalPage from './pages/PortalPage'
import UploadApq from './pages/UploadApq'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/Login" /> },
  { path: '/portal', element: <PortalPage /> },
  {
    path: '/',
    element: <Layout />, // Layout yang membungkus semua route di bawah ini
    children: [
      {
        path: 'app-apq',
        children: [
          { path: '', element: <Navigate to="dashboard-apq" /> },
          { path: 'dashboard-apq', element: <DashboardAPQ /> },
          { path: 'upload-apq', element: <UploadApq /> }
        ]
      },
      { path: 'app-mn-wo', element: <MnWoForm /> },
      { path: 'app-qsense', element: <DashboardQSense /> }
    ]
  },
  { path: '/Login', element: <Login /> },
  { path: '*', element: <Login /> }
])

function Layout() {
  const navigate = useNavigate()
  const [opened, { toggle }] = useDisclosure()
  const [userData, setUserData] = useState<any>()
  useMantineColorScheme()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const location = useLocation()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await window.api.user.getUserData()
        if (userData !== null) {
          setUserData(userData)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserData()
  }, [])

  const handleLogout = async () => {
    navigate('/portal') // Redirect to PortalPage instead of Login
  }

  const getBasePath = () => {
    const segments = location.pathname.split('/').filter(Boolean)
    return `/${segments[0]}` // Return the first part of the path (parent path)
  }

  const renderHeaderContent = () => {
    const basePath = getBasePath()
    switch (basePath) {
      case '/app-apq':
        return (
          <>
            <Group ml="md" gap="xs" visibleFrom="sm">
              <Title order={5}>OEEInsight</Title>
              <UnstyledButton component={Link} to="app-apq/upload-apq">
                Upload
              </UnstyledButton>
              <UnstyledButton component={Link} to="app-apq/dashboard-apq">
                DashboardAPQ
              </UnstyledButton>
            </Group>
          </>
        )
      case '/app-qsense':
        return (
          <>
            <Group ml="md" gap="xs" visibleFrom="sm">
              <Title order={5}>QSense</Title>
            </Group>
          </>
        )

      default:
        return <></>
    }
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            {renderHeaderContent()}
          </Group>
          <Group justify="flex-end" style={{ flex: 1 }}>
            <Group gap="sm" visibleFrom="sm">
              <Title order={5}>{userData?.displayName}</Title>
              <Clock />
              <ActionIcon
                onClick={toggleColorScheme}
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
              >
                {colorScheme === 'light' ? <IconSun /> : <IconMoon />}
              </ActionIcon>
              <ActionIcon onClick={handleLogout} variant="default" size="xl" aria-label="logout">
                <IconLogout size={16} />
              </ActionIcon>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
