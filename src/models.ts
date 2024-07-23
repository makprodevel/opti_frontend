export type UUID = string

export interface ActionBase {
  action_type: ActionType
}

export enum ActionType {
  getPreview = 'get_preview',
  readMessage = 'read_message',
  getChat = 'get_chat',
  sendMessage = 'send_message'
}

export interface IGetMe {
  email: string
  nickname: string
}

export interface IReceivedMessage {
  id: UUID
  text: string
  time: Date
}

export interface ISendMessage extends ActionBase {
  message_id: UUID
  message: string
  message_time: string
  sender_id: UUID
}

export interface IGetChat extends ActionBase {
  user_id: UUID
  messages: Message[]
}

export interface Message {
  id: UUID
  text: string
  time: string
  is_viewed: boolean
  owning: boolean
}

export interface IGetPreview extends ActionBase {
  chat_list: ChatList[]
}

export interface ChatList {
  user_id: UUID
  user_nickname: string
  message: string
  last_message_time: string
  is_viewed: boolean
}

export interface IReadMessage extends ActionBase {
  recipient_id: UUID
  list_message: string[]
}
