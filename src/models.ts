export type UUID = string

export interface ChatPageParams extends Record<string, string | undefined> {
  otherUserId?: UUID
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
  count_unread_message: number
}

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

interface ActionBase {
  action_type: ClientActionType | ServerActionType
}

export interface ClientActionBase extends ActionBase {
  action_type: ClientActionType
}

export interface ServerActionBase extends ActionBase {
  action_type: ServerActionType
}

export interface IChatsPreview extends ClientActionBase {
  action_type: ClientActionType.getPreview
  chat_list: IChatPreview[]
}

export interface IReceiveMessages extends ClientActionBase {
  action_type: ClientActionType.receiveMessages
  messages: Message[]
}

export interface IReadMessagesClient extends ClientActionBase {
  action_type: ClientActionType.readMessages
  list_messages_id: UUID[]
}

export interface IReadMessagesServer extends ServerActionBase {
  action_type: ServerActionType.readMessages
  other_user_id: UUID
  list_messages_id: UUID[]
}

export interface IGetChat extends ServerActionBase {
  action_type: ServerActionType.getChat
  user_id: UUID
}

export interface ISendMessage extends ServerActionBase {
  action_type: ServerActionType.sendMessage
  recipient_id: UUID
  message: string
}

export interface IDeleteChat extends ServerActionBase {
  action_type: ServerActionType.deleteChat
  user_id: UUID
}

export interface IDeleteChatClient extends ClientActionBase {
  action_type: ClientActionType.deleteChat
  other_user_id: UUID
}

export interface IDeleteChatActionSchema {
  currentId: UUID
  otherId: UUID
}
