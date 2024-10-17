// preload/interfaces.ts

export interface BaseApi {
  url: string
  token?: string
}

export interface BaseEmqx {
  url: string
  key: string
  secret_key: string
}

export interface BaseMqqt {
  url: string
}

export interface PortalSetting {
  baseApi: BaseApi
  baseEmqx: BaseEmqx
  baseMqqt: BaseMqqt
}

export interface UserData {
  uid?: string
  displayName?: string
}

export interface LoginCache {
  nik: string
  password: string
}

// You can define other interfaces here as needed
