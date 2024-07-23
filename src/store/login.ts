import { createSlice } from '@reduxjs/toolkit'

interface loginStore {
  isLogin: boolean
}

const LS_IS_LOGIN = 'isLogin'

const initialState: loginStore = {
  isLogin: Boolean(localStorage.getItem(LS_IS_LOGIN))
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logIn(state: loginStore) {
      state.isLogin = true
      localStorage.setItem(LS_IS_LOGIN, 'ok')
    },
    logOut(state: loginStore) {
      state.isLogin = false
      localStorage.removeItem(LS_IS_LOGIN)
    }
  }
})

export const loginAction = loginSlice.actions
export const loginReducer = loginSlice.reducer
