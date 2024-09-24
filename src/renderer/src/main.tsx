import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const queryClient = new QueryClient()

/**
 * Axios HTTP Request defaults
 */
axios.defaults.baseURL = 'http://localhost:5001/'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Content-Type'] = 'application/json'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalClasses withStaticClasses>
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
