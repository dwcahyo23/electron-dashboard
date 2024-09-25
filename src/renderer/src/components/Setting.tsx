import { Button, Notification, Stack, TextInput, Title } from '@mantine/core'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Setting() {
  const [baseUrl, setBaseUrl] = useState<string>('')
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'error' | null
  }>({ message: '', type: null })

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
        setNotification({ message: 'Failed to fetch base URL', type: 'error' })
      }
    }

    fetchBaseUrl()
  }, [])

  const handleSave = async () => {
    try {
      if (baseUrl === null) {
        throw new Error('Base URL is null')
      }
      await window.api.setBaseUrl(baseUrl)
      axios.defaults.baseURL = baseUrl
      setNotification({ message: 'Base URL updated successfully!', type: 'success' })
    } catch (error) {
      console.error(error)
      setNotification({ message: 'Failed to update base URL', type: 'error' })
    }
  }

  return (
    <Stack gap="lg" style={{ maxWidth: 400, margin: 'auto' }}>
      <Title order={2}>Settings</Title>
      <TextInput
        label="Base URL"
        placeholder="Enter the base URL"
        value={baseUrl}
        onChange={(e) => setBaseUrl(e.currentTarget.value)}
      />
      <Button onClick={handleSave}>Save</Button>
      {notification.type && (
        <Notification
          title={notification.type === 'success' ? 'Success' : 'Error'}
          color={notification.type === 'success' ? 'green' : 'red'}
          onClose={() => setNotification({ message: '', type: null })}
        >
          {notification.message}
        </Notification>
      )}
    </Stack>
  )
}
