// electron.d.ts
import { PortalSetting, UserData } from '../../preload/interfaces'

declare global {
  interface Window {
    electron: {
      // Define any methods you expose from electronAPI
    }
    api: {
      auth: {
        getAccessToken: () => Promise<string>
        setAccessToken: (token: string) => Promise<void>
        removeAccessToken: () => Promise<void>
        getLoginStatus: () => Promise<boolean>
        setLoginStatus: (status: boolean) => Promise<void>
        setLoginCache: (cache: { nik: string; password: string }) => Promise<void>
        getLoginCache: () => Promise<{ nik: string; password: string } | null>
      }
      user: {
        setUserData: (userData: UserData) => Promise<void>
        getUserData: () => Promise<any>
        removeUserData: () => Promise<void>
      }
      settings: {
        getBaseUrl: () => Promise<string>
        setBaseUrl: (url: string) => Promise<void>
        getPortalSetting: () => Promise<PortalSetting>
        setPortalSetting: (portalSetting: PortalSetting) => Promise<void>
      }
    }
  }
}
