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
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, Outlet, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import Clock from './components/Clock'
import DashboardAPQ from './pages/DashboardAPQ'
import Login from './pages/Login'
import UploadApq from './pages/UploadApq'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'DashboardAPQ', element: <DashboardAPQ /> },
      { path: 'uploadApq', element: <UploadApq /> },
      { path: '*', element: <N404 /> }
    ]
  },
  { path: 'Login', element: <Login /> }
])

function N404() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
      {/* <UpdateElectron /> */}
    </div>
  )
}

function Layout() {
  const navigate = useNavigate()
  const [opened, { toggle }] = useDisclosure()
  const [userData, setUserData] = useState<any>()
  useMantineColorScheme()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  // const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })

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
    await window.api.removeAccessToken()
    delete axios.defaults.headers.common['Authorization']
    await window.api.setLoginStatus(false)
    await window.api.removeUserData()
    navigate('/Login')
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
              <UnstyledButton component={Link} to="uploadApq">
                Upload
              </UnstyledButton>
              <UnstyledButton component={Link} to="DashboardAPQ">
                DashboardAPQ
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
