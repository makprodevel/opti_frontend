export type UUID = string

export interface IGetMe {
  id: UUID
  email: string
  nickname: string
}

export interface IChangeNickname {
  new_nickname: string
}

export interface ISearchResult {
  users: User[]
}

/**
 * type request to client
 */
export enum ClientActionType {
  getPreview = 'get_preview',
  receiveMessages = 'receive_messages',
  readMessages = 'read_messages',
  deleteChat = 'delete_chat'
}

/**
 * type request to server
 */
export enum ServerActionType {
  getChat = 'get_chat',
  sendMessage = 'send_message',
  readMessages = 'read_messages',
  deleteChat = 'delete_chat'
}

export interface ActionBase {
  action_type: ClientActionType | ServerActionType
}

export interface User {
  id: UUID
  nickname: string
  count_unread_message?: number
}

export interface Message {
  id: UUID
  sender_id: UUID
  recipient_id: UUID
  text: string
  time: string
  is_viewed: boolean
}

export interface IChatPreview {
  user: User
  last_message: Message
}

export interface IChatsPreview extends ActionBase {
  action_type: ClientActionType.getPreview
  chat_list: IChatPreview[]
}

export interface IReceiveMessages extends ActionBase {
  action_type: ClientActionType.receiveMessages
  messages: Message[]
}

export interface IReadMessages extends ActionBase {
  action_type: ServerActionType.readMessages | ClientActionType.readMessages
  other_user_id: UUID
  list_messages_id: UUID[]
}

export interface IGetChat extends ActionBase {
  action_type: ServerActionType.getChat
  user_id: string
}

export interface ISendMessage extends ActionBase {
  action_type: ServerActionType.sendMessage
  recipient_id: string
  message: string
}

export interface IDeleteChat extends ActionBase {
  action_type: ServerActionType.deleteChat
  user_id: string
}
