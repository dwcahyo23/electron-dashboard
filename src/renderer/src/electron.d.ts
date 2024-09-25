declare global {
  interface Window {
    api: {
      getBaseUrl: () => Promise<string>
      setBaseUrl: (url: string) => Promise<void>
    }
  }
}

// This is required to make TypeScript recognize this file as a module
export {}
