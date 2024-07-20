import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IGetMe } from '../models'

const customFetch = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, {
    ...init,
    credentials: 'include'
  })
  return response
}

export const mainApi = createApi({
  reducerPath: 'main/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    fetchFn: customFetch
  }),
  endpoints: (build) => ({
    getMe: build.query<IGetMe, void>({
      query: () => ({
        url: 'api/me'
      })
    })
  })
})

export const { useGetMeQuery } = mainApi
