declare global {
  interface Window {
    api: {
      getBaseUrl: () => Promise<string>
      setBaseUrl: (url: string) => Promise<void>
      getAccessToken: () => Promise<string | null>
      setAccessToken: (token: string) => Promise<void>
      removeAccessToken: () => Promise<void>
      getUserData: () => Promise<any | null>
      setUserData: (data: { uid?: string; displayName?: string }) => Promise<void>
      removeUserData: () => Promise<void>
      getLoginStatus: () => Promise<boolean>
      setLoginStatus: (status: boolean) => Promise<void>
    }
  }
}

// This is required to make TypeScript recognize this file as a module
export { }

