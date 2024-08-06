export type UUID = string

export interface IChangeNickname {
  new_nickname: string
}

export interface ActionBase {
  action_type: ActionType
}

export enum ActionType {
  getPreview = 'get_preview',
  readMessage = 'read_message',
  getChat = 'get_chat',
  sendMessage = 'send_message',
  recieveMessage = 'receive_message',
  deleteChat = 'delete_chat'
}

export interface IGetMe {
  email: string
  nickname: string
}

export interface IReceivedMessage extends ActionBase, Message {
  other_id: UUID
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
  count: number
}

export interface IReadMessage extends ActionBase {
  recipient_id: UUID
  list_message: string[]
}
