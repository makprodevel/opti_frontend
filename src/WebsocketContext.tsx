import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import {
  ClientActionBase,
  ClientActionType,
  IChatsPreview,
  IDeleteChat,
  IDeleteChatClient,
  IGetChat,
  IReadMessagesClient,
  IReadMessagesServer,
  IReceiveMessages,
  ISendMessage,
  ServerActionBase,
  ServerActionType,
  UUID
} from './models'

import { useActions } from './hooks/action'
import { useAppSelector } from './hooks/redux'

interface IWebsocketContext {
  isWsOpen: boolean
  getChat(chat: UUID): Promise<void>
  sendMessage(chat: UUID, message: string): Promise<void>
  deleteChat(chat: UUID): Promise<void>
  readMessages: (chat: UUID, listMsgId: UUID[]) => Promise<void>
}

const WebsocketContext = createContext<IWebsocketContext>({
  isWsOpen: false,
  getChat: async () => {},
  sendMessage: async () => {},
  deleteChat: async () => {},
  readMessages: async () => {}
})

export const useWebsocketContext = () => {
  return useContext(WebsocketContext)
}

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const ws = useRef<WebSocket | null>(null)
  const [isWsOpen, setIsWsOpen] = useState<boolean>(false)
  const { id: userId } = useAppSelector((state) => state.user)

  const { GetPreview, RecieveMessages, ReadMessages, DeleteChat } = useActions()
  const isRun = useRef<boolean>(false)

  const DeleteChatHandler = (data: IDeleteChatClient) => {
    DeleteChat({ currentId: userId || '', otherId: data.other_user_id })
  }

  const wsSend = async (data: ServerActionBase) => {
    if (ws.current?.readyState == WebSocket.OPEN) {
      await ws.current.send(
        JSON.stringify({
          ...data
        })
      )
    }
  }

  function OpenWebsocket() {
    const newWs = new WebSocket('ws://localhost:8000/chat/ws')
    ws.current = newWs
    newWs.onmessage = (e) => {
      const data: ClientActionBase = JSON.parse(JSON.parse(e.data))
      console.log(data)
      switch (data.action_type as ClientActionType) {
        case ClientActionType.getPreview:
          GetPreview(data as IChatsPreview)
          break
        case ClientActionType.receiveMessages:
          RecieveMessages(data as IReceiveMessages)
          break
        case ClientActionType.readMessages:
          ReadMessages(data as IReadMessagesClient)
          break
        case ClientActionType.deleteChat:
          DeleteChatHandler(data as IDeleteChatClient)
          break
        default:
          console.error('unhandled data: ', data)
      }
    }
    newWs.onopen = () => {
      setIsWsOpen(true)
    }
    newWs.onclose = () => {
      setIsWsOpen(false)
      if (isRun.current) OpenWebsocket()
    }
    newWs.onerror = (err) => {
      console.error('WebSocket  error: ', err)
      newWs.close()
    }
  }

  useEffect(() => {
    isRun.current = true
    OpenWebsocket()

    return () => {
      isRun.current = false
      ws.current?.close()
    }
  }, [])

  async function getChat(chat: UUID) {
    await wsSend({
      action_type: ServerActionType.getChat,
      user_id: chat
    } as IGetChat)
  }

  async function sendMessage(chat: UUID, message: string) {
    await wsSend({
      action_type: ServerActionType.sendMessage,
      recipient_id: chat,
      message
    } as ISendMessage)
  }

  async function deleteChat(chat: UUID) {
    await wsSend({
      action_type: ServerActionType.deleteChat,
      user_id: chat
    } as IDeleteChat)
  }

  async function readMessages(chat: UUID, listMsgId: UUID[]) {
    await wsSend({
      action_type: ServerActionType.readMessages,
      other_user_id: chat,
      list_messages_id: listMsgId
    } as IReadMessagesServer)
  }

  return (
    <WebsocketContext.Provider
      value={{ isWsOpen, getChat, sendMessage, deleteChat, readMessages }}
    >
      {children}
    </WebsocketContext.Provider>
  )
}
