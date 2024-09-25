declare module 'electron-store' {
  interface Store {
    get<T>(key: string, defaultValue?: T): T
    set(key: string, value: any): void
    delete(key: string): void
    clear(): void
    has(key: string): boolean
    // Add more methods as needed
  }

  export default class Store {
    constructor(schema?: Record<string, any>)
    get<T>(key: string, defaultValue?: T): T
    set(key: string, value: any): void
    delete(key: string): void
    clear(): void
    has(key: string): boolean
  }
}
