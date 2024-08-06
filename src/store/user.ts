import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UUID } from '../models'

interface userStore {
  id: UUID | null
  email: string | null
  nickname: string | null
}

const LS_USERSTORE = 'userstore'

const initialState: userStore = (localStorage.getItem(LS_USERSTORE) &&
  JSON.parse(localStorage.getItem(LS_USERSTORE) || '')) || {
  id: null,
  email: null,
  nickname: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: userStore, action: PayloadAction<userStore>) {
      const { id, email, nickname } = action.payload
      state.id = id
      state.email = email
      state.nickname = nickname
      localStorage.setItem(LS_USERSTORE, JSON.stringify(state))
    },
    setNickname(state: userStore, action: PayloadAction<string | null>) {
      state.nickname = action.payload
      localStorage.setItem(LS_USERSTORE, JSON.stringify(state))
    },
    logOut(state: userStore) {
      state.id = null
      state.email = null
      state.nickname = null
      localStorage.setItem(LS_USERSTORE, JSON.stringify(state))
    }
  }
})

export const userAction = userSlice.actions
export const userReducer = userSlice.reducer
