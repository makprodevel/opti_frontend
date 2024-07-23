import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IGetPreview, UUID } from '../models'

const LS_CHAT = 'chat'

export interface IMessage {
  id: UUID
  text: string
  time: string
  is_viewed: boolean
  owning: boolean
}

export interface IChat {
  user_id: UUID
  messages: IMessage[]
}

interface IChatRow {
  user: UUID
  text: string
  time: string
  is_viewed: boolean
}

interface IUsers {
  [key: UUID]: string
}

interface ChatStore {
  users: IUsers
  chatList: IChatRow[]
  chats: IChat[]
}

const initialState: ChatStore = JSON.parse(
  localStorage.getItem(LS_CHAT) || '{users:{},chatList:[],chats:[]}'
)

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    GetPreview(state: ChatStore, action: PayloadAction<IGetPreview>) {
      state.chatList = []
      state.users = {}
      action.payload.chat_list.forEach((chatRow) => {
        state.users[chatRow.user_id] = chatRow.user_nickname
        state.chatList.push({
          user: chatRow.user_id,
          text: chatRow.message,
          time: chatRow.last_message_time,
          is_viewed: chatRow.is_viewed
        })
      })
      localStorage.setItem(LS_CHAT, JSON.stringify(state))
    },

    AddChat(state: ChatStore, action: PayloadAction<IChat>) {
      state.chats = state.chats.filter(
        (chat) => chat.user_id != action.payload.user_id
      )
      state.chats.push(action.payload)
      localStorage.setItem(LS_CHAT, JSON.stringify(state))
    }
  }
})

export const chatActions = chatSlice.actions
export const chatReducer = chatSlice.reducer
