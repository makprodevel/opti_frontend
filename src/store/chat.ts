import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IGetChat, IGetPreview, IReceivedMessage, UUID } from '../models'

const LS_CHAT = 'chat'

export interface IMessage {
  id: UUID
  text: string
  time: string
  is_viewed: boolean
  owning: boolean
}

export interface IChat {
  [key: UUID]: IMessage[]
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
  chats: IChat
}

const initialState: ChatStore = (localStorage.getItem(LS_CHAT) &&
  JSON.parse(localStorage.getItem(LS_CHAT) || '')) || {
  users: {},
  chatList: [],
  chats: {}
}

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

    AddChat(state: ChatStore, action: PayloadAction<IGetChat>) {
      const msg_list = action.payload.messages
      state.chats[action.payload.user_id] = []
      msg_list.forEach((msg) => state.chats[action.payload.user_id].push(msg))

      localStorage.setItem(LS_CHAT, JSON.stringify(state))
    },

    RecieveMessage(state: ChatStore, action: PayloadAction<IReceivedMessage>) {
      const sender: UUID = action.payload.sender_id
      const msg = action.payload
      console.log(msg)
      if (!(sender in state.chats)) state.chats[sender] = []
      console.log(state.chats[sender])
      if (state.chats[sender].filter((msgg) => msgg.id == msg.id).length === 0)
        state.chats[sender].push(msg) // на этой строке ошибка

      localStorage.setItem(LS_CHAT, JSON.stringify(state))
    }
  }
})

export const chatActions = chatSlice.actions
export const chatReducer = chatSlice.reducer
