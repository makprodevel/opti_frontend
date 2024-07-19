import { configureStore } from '@reduxjs/toolkit'
import { mainApi } from './api'
import { setupListeners } from '@reduxjs/toolkit/query/react'

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware)
})

setupListeners(store.dispatch)
