import { Button, Paper, Stack, Tabs, TextInput, Title } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { BaseResponse } from '@renderer/types/base/response.type'
import { IconExternalLink, IconLock, IconLogout, IconUser } from '@tabler/icons-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PortalSetting } from 'src/preload/interfaces'

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
  const [nik, setNik] = useState<string>('') // Login NIK input
  const [password, setPassword] = useState<string>('') // Login password input
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false) // State to manage login status
  const [portalSetting, setPortalSetting] = useState<PortalSetting>({
    baseApi: { url: '', token: '' },
    baseEmqx: { url: '', key: '', secret_key: '' },
    baseMqqt: { url: '' }
  })

  // Fetch the current base URL and login status when the component mounts
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const status = await window.api.auth.getLoginStatus()
        setIsLoggedIn(status)

        const cache = await window.api.auth.getLoginCache()
        if (cache) {
          setNik(cache.nik)
          setPassword(cache.password)
        }

        const portalSetting = await window.api.settings.getPortalSetting()
        setPortalSetting(portalSetting)
      } catch (error) {
        console.error(error)
        showNotification({
          title: 'Error',
          message: 'Failed to fetch initial data',
          color: 'red'
        })
      }
    }

    fetchInitialData()
  }, [])

  const handleSave = async () => {
    try {
      if (!portalSetting) {
        throw new Error('Portal Setting is null')
      }
      await window.api.settings.setPortalSetting(portalSetting)

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
    if (!portalSetting) {
      showNotification({
        title: 'Warning',
        message: 'Please set the Base URL before logging in.',
        color: 'yellow'
      })
      return
    }

    try {
      const response = await axios.post<BaseResponse<FuseSignIn>>(
        `${portalSetting.baseApi.url}/auth/sign-in`,
        {
          nik,
          password
        }
      )
      const { data } = response
      if (data.success) {
        // Save the baseApi token to window.api
        window.api.settings.setPortalSetting({
          ...portalSetting,
          baseApi: {
            ...portalSetting.baseApi,
            token: data.data.access_token
          }
        })
        // Set login status to true
        window.api.auth.setLoginStatus(true)
        // Navigate to the app page
        navigate('/app-apq')
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

  // const handleLogin = async () => {
  //   // Check if the base URL is set
  //   if (!portalSetting) {
  //     showNotification({
  //       title: 'Warning',
  //       message: 'Please set the Base URL before logging in.',
  //       color: 'yellow'
  //     })
  //     return
  //   }

  //   // Validate input fields
  //   if (!nik || !password) {
  //     showNotification({
  //       title: 'Warning',
  //       message: 'NIK and Password cannot be empty.',
  //       color: 'yellow'
  //     })
  //     return
  //   }

  //   try {
  //     // Make the login request
  //     const response = await axios.post<BaseResponse<FuseSignIn>>('/auth/sign-in', {
  //       nik,
  //       password
  //     })

  //     // Check if the login was successful
  //     if (response.data.success && response.data.data.access_token) {
  //       const token = response.data.data.access_token

  //       // Set JWT token for future requests
  //       // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

  //       // Update login status
  //       setIsLoggedIn(true)
  //       await window.api.auth.setLoginStatus(true) // Save login status in Electron Store
  //       await window.api.auth.setAccessToken(token) // Save the token

  //       // Prepare user data
  //       const userData = {
  //         displayName: response.data.data.user?.data?.displayName,
  //         uid: response.data.data.user?.uid
  //       }

  //       // Log the user data for debugging
  //       console.log('User Data:', userData)

  //       // Validate user data
  //       if (!userData.displayName || !userData.uid) {
  //         throw new Error('Invalid user data: displayName or uid is missing')
  //       }

  //       // Save user data
  //       await window.api.user.setUserData(userData)

  //       // Show success notification
  //       showNotification({
  //         title: 'Success',
  //         message: 'Login successful!',
  //         color: 'green'
  //       })

  //       // Navigate to the portal
  //       navigate('/portal')
  //     } else {
  //       // Handle unsuccessful login attempt
  //       throw new Error('Login failed: access token not found')
  //     }
  //   } catch (error: any) {
  //     console.error('Error during login:', error.response?.data || error.message || error)

  //     // Display error notification
  //     showNotification({
  //       title: 'Error',
  //       message: `Failed to login: ${error.response?.data?.message || error.message}`,
  //       color: 'red'
  //     })
  //   }
  // }

  const handleLogout = async () => {
    setIsLoggedIn(false) // Update login state
    await window.api.auth.setLoginStatus(false) // Save login status in Electron Store
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
              <Tabs.Tab value="setting">Setting</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="login">
              <Stack gap="lg" mt="md">
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
                  <>
                    <Button
                      onClick={() => navigate('/portal')}
                      leftSection={<IconExternalLink size={16} />}
                    >
                      Back to Portal
                    </Button>
                    <Button
                      onClick={handleLogout}
                      mt={16}
                      color="red"
                      leftSection={<IconLogout size={16} />}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="setting">
              <Stack gap="lg" mt="md">
                <TextInput
                  label="Base API URL"
                  placeholder="Enter Base API URL"
                  value={portalSetting.baseApi.url || ''}
                  onChange={(e) =>
                    setPortalSetting({ ...portalSetting, baseApi: { url: e.currentTarget.value } })
                  }
                />

                <TextInput
                  label="Base EMQX URL"
                  placeholder="Enter Base EMQX URL"
                  value={portalSetting.baseEmqx.url || ''}
                  onChange={(e) =>
                    setPortalSetting({
                      ...portalSetting,
                      baseEmqx: { ...portalSetting.baseEmqx, url: e.currentTarget.value }
                    })
                  }
                />
                <TextInput
                  label="EMQX Key"
                  placeholder="Enter EMQX Key"
                  value={portalSetting.baseEmqx.key || ''}
                  onChange={(e) =>
                    setPortalSetting({
                      ...portalSetting,
                      baseEmqx: { ...portalSetting.baseEmqx, key: e.currentTarget.value }
                    })
                  }
                />
                <TextInput
                  label="EMQX Secret Key"
                  placeholder="Enter EMQX Secret Key"
                  value={portalSetting.baseEmqx.secret_key || ''}
                  onChange={(e) =>
                    setPortalSetting({
                      ...portalSetting,
                      baseEmqx: { ...portalSetting.baseEmqx, secret_key: e.currentTarget.value }
                    })
                  }
                />
                <TextInput
                  label="Base MQTT URL"
                  placeholder="Enter Base MQTT URL"
                  value={portalSetting.baseMqqt.url || ''}
                  onChange={(e) =>
                    setPortalSetting({ ...portalSetting, baseMqqt: { url: e.currentTarget.value } })
                  }
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
