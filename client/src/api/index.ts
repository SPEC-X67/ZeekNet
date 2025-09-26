import axios from 'axios'
import type { AxiosInstance } from 'axios'

let refreshPromise: Promise<string | null> | null = null
let getAuthToken: () => string | null = () => null
let logoutCallback: (() => void) | null = null

export const setAuthTokenGetter = (getter: () => string | null) => {
  getAuthToken = getter
}

export const setLogoutCallback = (callback: () => void) => {
  logoutCallback = callback
}

export const clearAuthToken = () => {
  getAuthToken = () => null
}

export const api: AxiosInstance = axios.create({
  baseURL: (import.meta as ImportMeta).env?.VITE_API_URL || 'http://localhost:4000',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token && config.headers) {
    const url = String(config.url || '')
    if (!url.startsWith('/api/auth/refresh')) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    const errorMessage = error?.response?.data?.message || ''
    
    // Handle blocked user (403 status)
    if (error?.response?.status === 403) {
      if ((errorMessage.includes('blocked') || errorMessage.includes('Company account is blocked')) && logoutCallback) {
        logoutCallback()
        return Promise.reject(error)
      }
    }
    
    // Handle invalid refresh token - don't retry, just logout
    if (error?.response?.status === 401 && errorMessage.includes('Invalid refresh token')) {
      if (logoutCallback) {
        logoutCallback()
      }
      return Promise.reject(error)
    }
    
    if (error?.response?.status === 401 && !original?._retry) {
      original._retry = true

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const resp = await api.post('/api/auth/refresh', {}, {
              headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
            })
            const newToken = resp.data?.token || resp.data?.data?.token || null
            return newToken
          } catch (refreshError: any) {
            // If refresh fails with invalid token, logout immediately
            const refreshErrorMessage = refreshError?.response?.data?.message || ''
            if (refreshErrorMessage.includes('Invalid refresh token') && logoutCallback) {
              logoutCallback()
            } else if (logoutCallback) {
              logoutCallback()
            }
            return null
          }
        })().finally(() => {
          refreshPromise = null
        })
      }

      const token = await refreshPromise
      if (token && original?.headers) {
        original.headers.Authorization = `Bearer ${token}`
        return api(original)
      } else {
        if (logoutCallback) {
          logoutCallback()
        }
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export { authApi } from './auth.api'
export { adminApi } from './admin.api'
export { companyApi } from './company.api'
export * from './base.api'
