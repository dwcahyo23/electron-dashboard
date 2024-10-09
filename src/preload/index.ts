import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  getBaseUrl: () => ipcRenderer.invoke('getBaseUrl'),
  setBaseUrl: (url: string) => ipcRenderer.invoke('setBaseUrl', url),
  onVersion: (callback: (arg0: any) => void) =>
    ipcRenderer.on('version', (_event, version) => callback(version)),
  getAccessToken: () => ipcRenderer.invoke('getAccessToken'),
  setAccessToken: (token: any) => ipcRenderer.invoke('setAccessToken', token),
  removeAccessToken: () => ipcRenderer.invoke('removeAccessToken'),
  setUserData: (data: any) => ipcRenderer.invoke('setUserData', data),
  getUserData: (data: any) => ipcRenderer.invoke('getUserData', data),
  removeUserData: () => ipcRenderer.invoke('removeUserData'),
  getLoginStatus: () => ipcRenderer.invoke('getLoginStatus'),
  setLoginStatus: (status: any) => ipcRenderer.invoke('setLoginStatus', status),
  setLoginCache: (cache: { nik: string; password: string }) =>
    ipcRenderer.invoke('setLoginCache', cache),
  getLoginCache: () => ipcRenderer.invoke('getLoginCache')
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
