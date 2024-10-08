import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  Message,
  User,
  IChatsPreview,
  IReceiveMessages,
  UUID,
  IReadMessagesClient,
  IDeleteChatActionSchema
} from '../models'

const LS_CHAT = 'chat'

interface ChatStore {
  users: User[]
  messages: Message[]
}

const initialState: ChatStore = (localStorage.getItem(LS_CHAT) &&
  JSON.parse(localStorage.getItem(LS_CHAT) || '')) || {
  users: [],
  messages: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    GetPreview(state: ChatStore, action: PayloadAction<IChatsPreview>) {
      state.users = []
      state.messages = []
      action.payload.chat_list.forEach((chatPreview) => {
        const user = chatPreview.user
        if (chatPreview.count_unread_message)
          user.count_unread_message = chatPreview.count_unread_message
        state.users.push(user)
        state.messages.push(chatPreview.last_message)
      })

      localStorage.setItem(LS_CHAT, JSON.stringify(state))
    },

    AddUser(state: ChatStore, action: PayloadAction<User>) {
      state.users = state.users.filter((user) => user.id != action.payload.id)
      state.users.push(action.payload)

      localStorage.setItem(LS_CHAT, JSON.stringify(state))
    },

    RecieveMessages(state: ChatStore, action: PayloadAction<IReceiveMessages>) {
      const newMsgListId: UUID[] = action.payload.messages.map(
        (msg_) => msg_.id
      )
      state.messages = state.messages.filter(
        (msg) => !newMsgListId.includes(msg.id)
      )
      state.messages.push(...action.payload.messages)

      localStorage.setItem(LS_CHAT, JSON.stringify(state))
    },

    ReadMessages(state: ChatStore, action: PayloadAction<IReadMessagesClient>) {
      state.messages = state.messages.map((msg) => {
        if (action.payload.list_messages_id.includes(msg.id))
          msg.is_viewed = true
        return msg
      })

      localStorage.setItem(LS_CHAT, JSON.stringify(state))
    },

    DeleteChat(
      state: ChatStore,
      action: PayloadAction<IDeleteChatActionSchema>
    ) {
      const { otherId, currentId } = action.payload
      state.messages = state.messages.filter(
        (msg) =>
          !(
            (msg.sender_id == otherId && msg.recipient_id == currentId) ||
            (msg.recipient_id == otherId && msg.sender_id == currentId)
          )
      )

      localStorage.setItem(LS_CHAT, JSON.stringify(state))
    },

    DeletePreviewMark(state: ChatStore, action: PayloadAction<UUID>) {
      const user = state.users.find((user) => user.id == action.payload)
      if (user) {
        state.users = state.users.filter((user_) => user_.id != user.id)
        user.count_unread_message = undefined
        state.users.push(user)
      }
    }
  }
})

export const chatActions = chatSlice.actions
export const chatReducer = chatSlice.reducer
