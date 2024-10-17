// main/ipHandlers.ts
import { ipcMain } from 'electron'
import { PortalSetting, UserData } from '../preload/interfaces'
import store from './store' // Import the store you created

// Function to setup IPC handlers
export function setupIpcHandlers() {
  // IPC handlers using electron-store
  ipcMain.handle('getBaseUrl', () => {
    const url = store.get('baseURL')
    if (url === null) {
      throw new Error('Base URL is null')
    }
    return url
  })

  ipcMain.handle('setBaseUrl', (_event, url: string | null) => {
    if (url === null) {
      throw new Error('Base URL is null')
    }
    store.set('baseURL', url)
  })

  ipcMain.handle('getAccessToken', () => {
    const token = store.get('accessToken')
    if (token === null) {
      throw new Error('Access token is null')
    }
    return token
  })

  ipcMain.handle('setAccessToken', (_event, token: string | null) => {
    if (token === null) {
      throw new Error('Access token is null')
    }

    if (token.length < 10) {
      throw new Error('Invalid access token')
    }

    store.set('accessToken', token)
  })

  ipcMain.handle('removeAccessToken', () => {
    store.delete('accessToken')
  })

  ipcMain.handle('getUserData', () => {
    const data = store.get('userData')
    if (data === null) {
      throw new Error('User data is null')
    }
    return data
  })

  ipcMain.handle('setUserData', (_event, data: UserData | null) => {
    if (data === null) {
      throw new Error('User data is null')
    }

    store.set('userData', data)
  })

  ipcMain.handle('removeUserData', () => {
    store.delete('userData')
  })

  ipcMain.handle('getLoginStatus', () => {
    const status = store.get('loginStatus')
    if (status === null) {
      throw new Error('Login status is null')
    }
    return status
  })

  ipcMain.handle('setLoginStatus', (_event, status: boolean) => {
    store.set('loginStatus', status)
  })

  ipcMain.handle('getLoginCache', () => {
    const cache = store.get('loginCache')
    if (cache === null) {
      throw new Error('Login cache is null')
    }
    return cache
  })

  ipcMain.handle('setLoginCache', (_event, cache: { nik: string; password: string } | null) => {
    if (cache === null) {
      throw new Error('Login cache is null')
    }

    store.set('loginCache', cache)
  })

  // Portal settings handlers
  ipcMain.handle('getPortalSetting', () => {
    const portalSetting = store.get('portalSetting')
    if (portalSetting === null) {
      throw new Error('Portal setting is null')
    }
    return portalSetting
  })

  ipcMain.handle('setPortalSetting', (_event, portalSetting: PortalSetting | null) => {
    if (portalSetting === null) {
      throw new Error('Portal setting is null')
    }

    // Validate portalSetting structure before setting
    store.set('portalSetting', portalSetting)
  })
}
