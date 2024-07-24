import { configureStore } from '@reduxjs/toolkit'
// import { mainApi } from './api'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { chatReducer } from './chat'
import { loginReducer } from './login'
import { nicknameReducer } from './nickname'

export const store = configureStore({
  reducer: {
    // [mainApi.reducerPath]: mainApi.reducer,
    chat: chatReducer,
    login: loginReducer,
    nickname: nicknameReducer
  }
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(mainApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
