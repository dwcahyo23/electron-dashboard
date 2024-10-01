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
  useNavigate
} from 'react-router-dom'
import Clock from './components/Clock'
import DashboardAPQ from './pages/DashboardAPQ'
import MnWoForm from './pages/FormWo'
import Login from './pages/Login'
import PortalPage from './pages/PortalPage'
import UploadApq from './pages/UploadApq'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/Login" /> // Mengarahkan root ke login
  },
  {
    path: '/portal',
    element: <PortalPage /> // Halaman Portal
  },
  {
    path: '/app-apq',
    element: <Layout />,
    children: [
      { path: '', element: <Navigate to="DashboardAPQ" /> }, // Mengarahkan ke DashboardAPQ sebagai default
      { path: 'DashboardAPQ', element: <DashboardAPQ /> },
      { path: 'UploadAPQ', element: <UploadApq /> }
    ]
  },
  {
    path: '/app-mn-wo',
    element: <MnWoForm />
  },
  { path: '/Login', element: <Login /> },
  { path: '*', element: <Login /> }
])

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

function Layout() {
  const navigate = useNavigate()
  const [opened, { toggle }] = useDisclosure()
  const [userData, setUserData] = useState<any>()
  useMantineColorScheme()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await window.api.getUserData()
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
            <Group ml="md" gap="xs" visibleFrom="sm">
              <UnstyledButton component={Link} to="UploadAPQ">
                Upload
              </UnstyledButton>
              <UnstyledButton component={Link} to="DashboardAPQ">
                DashboardAPQ
              </UnstyledButton>
              <UnstyledButton component={Link} to="DashboardAPQ">
                FORM
              </UnstyledButton>
            </Group>
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
