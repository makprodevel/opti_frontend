import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IChangeNickname, IGetMe, ISearchResult } from '../models'

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
    }),
    changeNickname: build.mutation<IChangeNickname, string>({
      query: (newNickname: string) => ({
        url: 'api/me',
        method: 'PUT',
        body: { new_nickname: newNickname }
      })
    }),
    searchUser: build.query<ISearchResult, string>({
      query: (search: string) => ({
        url: 'api/search/user',
        method: 'GET',
        params: {
          q: search
        }
      })
    })
  })
})

export const {
  useLazyGetMeQuery,
  useChangeNicknameMutation,
  useLazySearchUserQuery
} = mainApi
