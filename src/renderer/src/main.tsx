/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = 'http://localhost:5001/'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers.common['Content-Type'] = 'application/json'
import { MantineProvider } from '@mantine/core'
import { MantineEmotionProvider } from '@mantine/emotion'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import '@mantine/notifications/styles.css'

import '@mantine/core/styles.css'

const queryClient = new QueryClient()

const Main = () => {
  useEffect(() => {
    // Retrieve the base URL from Electron Store
    if (window.api) {
      window.api.getBaseUrl().then((url) => {
        if (url) {
          axios.defaults.baseURL = url // Set Axios base URL
        }
      })
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalClasses withStaticClasses>
        <MantineEmotionProvider>
          <Notifications />
          <App />
        </MantineEmotionProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
