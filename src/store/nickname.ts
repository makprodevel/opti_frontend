import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface NicknameStore {
  nickname: string
}

const LS_NICKNAME = 'nickname'

const initialState: NicknameStore = {
  nickname: localStorage.getItem(LS_NICKNAME) || LS_NICKNAME
}

export const nicknameSlice = createSlice({
  name: 'nickname',
  initialState,
  reducers: {
    setNickname(state: NicknameStore, action: PayloadAction<string>) {
      state.nickname = action.payload
      localStorage.setItem(LS_NICKNAME, action.payload)
    }
  }
})

export const nicknameAction = nicknameSlice.actions
export const nicknameReducer = nicknameSlice.reducer
