import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { Link, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import classes from '../src/styles/App.module.css'
import Clock from './components/Clock'
import Settings from './components/Setting'
import Test from './pages/Test'
import UploadApq from './pages/UploadApq'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'settings', element: <Settings /> },
      { path: 'test', element: <Test /> },
      { index: true, path: 'uploadApq', element: <UploadApq /> },
      { path: '*', element: <N404 /> }
    ]
  }
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
  const [opened, { toggle }] = useDisclosure()
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })

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
            <Group ml="md" gap={0} visibleFrom="sm">
              <UnstyledButton component={Link} to="uploadApq" className={classes.control}>
                Upload
              </UnstyledButton>
              <UnstyledButton component={Link} to="test" className={classes.control}>
                Test
              </UnstyledButton>
              <UnstyledButton component={Link} to="settings" className={classes.control}>
                Settings
              </UnstyledButton>
            </Group>
          </Group>
          <Group justify="flex-end" style={{ flex: 1 }}>
            <Group mr="md" gap={0} visibleFrom="sm">
              <Clock />
              <ActionIcon
                ml="md"
                onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
              >
                {computedColorScheme === 'light' ? (
                  <IconSun className={classes.icon} stroke={1.5} />
                ) : (
                  <IconMoon className={classes.icon} stroke={1.5} />
                )}
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
