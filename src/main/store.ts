// main/store.ts
import Store from 'electron-store'

// Define JSON Schema for validation
const schema = {
  baseURL: {
    type: 'string',
    format: 'uri',
    default: 'http://192.168.192.7:5001/api/v1'
  },
  accessToken: {
    type: 'string',
    minLength: 10,
    nullable: true
  },
  userData: {
    type: 'object',
    properties: {
      uid: { type: 'string' },
      displayName: { type: 'string' }
    },
    required: ['uid', 'displayName']
  },
  loginStatus: {
    type: 'boolean',
    default: false
  },
  loginCache: {
    type: 'object',
    properties: {
      nik: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['nik', 'password']
  },
  version: {
    type: 'string'
  },
  portalSetting: {
    type: 'object',
    properties: {
      baseApi: {
        type: 'object',
        properties: {
          url: { type: 'string', default: 'http://192.168.192.7:5001/api/v1' },
          token: { type: 'string', default: '' }
        },
        required: ['url']
      },
      baseEmqx: {
        type: 'object',
        properties: {
          url: { type: 'string', default: 'mqtt://192.168.192.7:1883' },
          key: { type: 'string', default: 'emqx' },
          secret_key: { type: 'string', default: 'emqx' }
        },
        required: ['url', 'key', 'secret_key']
      },
      baseMqqt: {
        type: 'object',
        properties: {
          url: { type: 'string', default: 'http://192.168.192.7:5001/api/v1/mqtt' }
        },
        required: ['url']
      }
    },
    required: ['baseApi', 'baseEmqx', 'baseMqqt']
  }
}

// Create an instance of the store
const store = new Store({ schema })

export default store
