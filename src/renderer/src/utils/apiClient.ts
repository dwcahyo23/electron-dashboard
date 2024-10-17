// apiClient.js
import axios from 'axios'

export const createAxiosInstances = async () => {
  const portalSetting = await window.api.settings.getPortalSetting()

  // console.log(portalSetting)

  const baseApi = axios.create({
    baseURL: portalSetting.baseApi.url,
    headers: {
      Authorization: portalSetting.baseApi.token
    }
  })

  const EmqxApi = axios.create({
    baseURL: portalSetting.baseEmqx.url,
    auth: {
      username: portalSetting.baseEmqx.key,
      password: portalSetting.baseEmqx.secret_key
    }
  })

  return { baseApi, EmqxApi }
}
