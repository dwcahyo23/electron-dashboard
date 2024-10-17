import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'
import { LoginCache, PortalSetting, UserData } from './interfaces' // Importing the PortalSetting interface

// Group API Methods
const api = {
  onVersion: (callback: (arg0: any) => void) =>
    ipcRenderer.on('version', (_event, version) => callback(version)),
  auth: {
    getAccessToken: () => ipcRenderer.invoke('getAccessToken'),
    setAccessToken: (token: string) => ipcRenderer.invoke('setAccessToken', token),
    removeAccessToken: () => ipcRenderer.invoke('removeAccessToken'),
    getLoginStatus: () => ipcRenderer.invoke('getLoginStatus'),
    setLoginStatus: (status: boolean) => ipcRenderer.invoke('setLoginStatus', status),
    setLoginCache: (loginCache: LoginCache) => ipcRenderer.invoke('setLoginCache', loginCache),
    getLoginCache: () => ipcRenderer.invoke('getLoginCache')
  },
  user: {
    setUserData: (userData: UserData) => ipcRenderer.invoke('setUserData', userData),
    getUserData: () => ipcRenderer.invoke('getUserData'),
    removeUserData: () => ipcRenderer.invoke('removeUserData')
  },
  settings: {
    getBaseUrl: () => ipcRenderer.invoke('getBaseUrl'),
    setBaseUrl: (url: string) => ipcRenderer.invoke('setBaseUrl', url),
    getPortalSetting: () => ipcRenderer.invoke('getPortalSetting'),
    setPortalSetting: (portalSetting: PortalSetting) =>
      ipcRenderer.invoke('setPortalSetting', portalSetting)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
