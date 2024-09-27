import { Button, Paper, Stack, Tabs, TextInput, Title } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { BaseResponse } from '@renderer/types/base/response.type'
import { IconExternalLink, IconLock, IconLogout, IconUser } from '@tabler/icons-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Define types for user data and tokens
export type FuseSignIn = {
  user: FuseUpdate
  access_token?: string
  refresh_token?: string
}

export type FuseUpdate = {
  uid?: string
  role?: string[]
  data?: any
}

// Login Component
export default function Login() {
  const navigate = useNavigate()
  const [baseUrl, setBaseUrl] = useState<string>('')
  const [nik, setNik] = useState<string>('') // Login NIK input
  const [password, setPassword] = useState<string>('') // Login password input

  // State to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  // Fetch the current base URL when the component mounts
  useEffect(() => {
    const fetchBaseUrl = async () => {
      try {
        const url = await window.api.getBaseUrl()
        if (url === null) {
          throw new Error('Base URL is null')
        }
        setBaseUrl(url)
      } catch (error) {
        console.error(error)
        showNotification({
          title: 'Error',
          message: 'Failed to fetch base URL',
          color: 'red'
        })
      }
    }

    const fetchLoginStatus = async () => {
      try {
        const status = await window.api.getLoginStatus() // Fetch login status from Electron Store
        setIsLoggedIn(status)
      } catch (error) {
        console.error(error)
        showNotification({
          title: 'Error',
          message: 'Failed to fetch login status',
          color: 'red'
        })
      }
    }

    fetchBaseUrl()
    fetchLoginStatus()
  }, [])

  const handleSave = async () => {
    try {
      if (!baseUrl) {
        throw new Error('Base URL is null')
      }
      await window.api.setBaseUrl(baseUrl)
      axios.defaults.baseURL = baseUrl // Update Axios base URL
      showNotification({
        title: 'Success',
        message: 'Base URL updated successfully!',
        color: 'green'
      })
    } catch (error) {
      console.error(error)
      showNotification({
        title: 'Error',
        message: 'Failed to update base URL',
        color: 'red'
      })
    }
  }

  const handleLogin = async () => {
    if (!baseUrl) {
      showNotification({
        title: 'Warning',
        message: 'Please set the Base URL before logging in.',
        color: 'yellow'
      })
      return
    }

    if (!nik || !password) {
      showNotification({
        title: 'Warning',
        message: 'NIK and Password cannot be empty.',
        color: 'yellow'
      })
      return
    }

    try {
      const response = await axios.post<BaseResponse<FuseSignIn>>('/auth/sign-in', {
        nik,
        password
      })

      if (response.data.success && response.data.data.access_token) {
        const token = response.data.data.access_token
        // Set the JWT token in Axios headers for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setIsLoggedIn(true) // Update login status
        await window.api.setLoginStatus(true) // Save login status in Electron Store

        await window.api.setAccessToken(token) // Save the token in Electron Store
        await window.api.setUserData({
          uid: response.data.data.user?.uid,
          displayName: response.data.data.user?.data?.displayName
        })

        setIsLoggedIn(true) // Update login state
        showNotification({
          title: 'Success',
          message: 'Login successful!',
          color: 'green'
        })
        navigate('/portal')
      } else {
        throw new Error('Login failed')
      }
    } catch (error) {
      console.error(error)
      showNotification({
        title: 'Error',
        message: 'Failed to login',
        color: 'red'
      })
    }
  }

  const handleLogout = async () => {
    await window.api.removeAccessToken()
    delete axios.defaults.headers.common['Authorization']
    setIsLoggedIn(false) // Update login state
    await window.api.setLoginStatus(false) // Save login status in Electron Store
    await window.api.removeUserData()
    showNotification({
      title: 'Success',
      message: 'Logged out successfully!',
      color: 'green'
    })
    navigate('/Login')
  }

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', // Background gradient
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        style={{
          width: '100%',
          maxWidth: 600,
          background: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px'
        }}
      >
        <Stack gap="lg">
          <Title ta="center">LOGIN</Title>
          <Tabs defaultValue="login">
            <Tabs.List>
              <Tabs.Tab value="login">Login</Tabs.Tab>
              <Tabs.Tab value="baseUrl">Base URL</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="login">
              <Stack gap="lg">
                {!isLoggedIn ? (
                  <>
                    <TextInput
                      label="NIK"
                      placeholder="Enter your NIK"
                      value={nik}
                      onChange={(e) => setNik(e.currentTarget.value)}
                      leftSection={<IconUser size={16} />}
                    />
                    <TextInput
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      leftSection={<IconLock size={16} />}
                    />
                    <Button onClick={handleLogin} leftSection={<IconExternalLink size={16} />}>
                      Login
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleLogout}
                    mt={16}
                    color="red"
                    leftSection={<IconLogout size={16} />}
                  >
                    Logout
                  </Button>
                )}
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="baseUrl">
              <Stack gap="lg">
                <TextInput
                  label="Base URL"
                  placeholder="Enter the base URL"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.currentTarget.value)}
                  leftSection={<IconExternalLink size={16} />}
                />
                <Button onClick={handleSave} leftSection={<IconExternalLink size={16} />}>
                  Save
                </Button>
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Paper>
    </div>
  )
}
