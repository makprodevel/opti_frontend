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
  count: number
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
          is_viewed: chatRow.is_viewed,
          count: chatRow.count
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
      const other_id: UUID = action.payload.other_id
      const msg = action.payload
      if (!(other_id in state.chats)) state.chats[other_id] = []
      if (
        state.chats[other_id].filter((msgg) => msgg.id == msg.id).length === 0
      ) {
        state.chats[other_id].push(msg)

        state.chatList.map((row) => {
          if (row.user == other_id) {
            row.text = msg.text
            row.time = msg.time
            row.is_viewed = false
            row.count++
          }
        })
      }

      localStorage.setItem(LS_CHAT, JSON.stringify(state))
    },

    SetUserNickname(state: ChatStore, action: PayloadAction<[UUID, string]>) {
      const [id, nickname] = action.payload
      state.users[id] = nickname
      localStorage.setItem(LS_CHAT, JSON.stringify(state))
    }
  }
})

export const chatActions = chatSlice.actions
export const chatReducer = chatSlice.reducer
