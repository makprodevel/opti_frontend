import { configureStore } from '@reduxjs/toolkit'
import { mainApi } from './api'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { chatReducer } from './chat'
import { userReducer } from './user'

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    chat: chatReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
