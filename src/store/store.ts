import { configureStore } from '@reduxjs/toolkit'
import { mainApi } from './mainApi'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { chatReducer } from './chat.slice'
import { userReducer } from './user.slice'

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
