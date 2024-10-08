import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  GetGoogleClientId,
  IChangeNickname,
  IGetMe,
  ISearchResult
} from '../models'
import { userAction } from './user.slice'
import { BACKEND_URL } from '../config'

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
    baseUrl: `${BACKEND_URL}/api/`,
    fetchFn: customFetch
  }),
  endpoints: (build) => ({
    getGoogleClientId: build.query<GetGoogleClientId, void>({
      query: () => ({
        url: 'auth/googleclientid',
        method: 'GET'
      })
    }),
    getCookieToken: build.query<void, string>({
      query: (token: string) => ({
        url: 'auth/google',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }),
    getUserData: build.mutation<IGetMe, void>({
      query: () => ({
        url: 'user/me'
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(userAction.setUser(data))
        } catch (err) {
          console.error('Error get current user:', err)
        }
      }
    }),
    changeNickname: build.mutation<IChangeNickname, string>({
      query: (newNickname: string) => ({
        url: 'user/me',
        method: 'PUT',
        body: { new_nickname: newNickname }
      })
    }),
    searchUser: build.query<ISearchResult, string>({
      query: (search: string) => ({
        url: 'user/search',
        method: 'GET',
        params: {
          q: search
        }
      })
    })
  })
})

export const {
  useGetGoogleClientIdQuery,
  useLazyGetCookieTokenQuery,
  useGetUserDataMutation,
  useChangeNicknameMutation,
  useLazySearchUserQuery
} = mainApi
