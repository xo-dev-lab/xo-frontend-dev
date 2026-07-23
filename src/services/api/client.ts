import axios, { type AxiosError, type AxiosInstance } from 'axios'

const apiBaseURL = import.meta.env.VITE_API_URL as string | undefined

export const apiClient: AxiosInstance = axios.create({
  baseURL: apiBaseURL ?? '',
  timeout: 15000,
})

apiClient.interceptors.request.use((config) => {
  // No auth; add headers here later.
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Centralized place for future error normalization.
    return Promise.reject(error)
  }
)

