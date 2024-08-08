import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'

import {
  ActionBase,
  ClientActionType,
  IChatsPreview,
  IReceiveMessages,
  ServerActionType,
  UUID
} from './models'

import { useActions } from './hooks/action'

interface IWebsocketContext {
  getChat(chat: UUID): Promise<void>
  sendMessage(chat: UUID, message: string): Promise<void>
  deleteChat(chat: UUID): Promise<void>
  isWsOpen: boolean
}

const WebsocketContext = createContext<IWebsocketContext>({
  getChat: async () => {},
  sendMessage: async () => {},
  deleteChat: async () => {},
  isWsOpen: false
})

export const useWebsocketContext = () => {
  return useContext(WebsocketContext)
}

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const ws = useRef<WebSocket | null>(null)
  const [isWsOpen, setIsWsOpen] = useState<boolean>(false)

  const { GetPreview, RecieveMessages } = useActions()
  const isRun = useRef<boolean>(false)

  const wsSend = async (
    action_type: ServerActionType,
    data?: { [key: string]: any }
  ) => {
    if (ws.current?.readyState == WebSocket.OPEN) {
      await ws.current?.send(
        JSON.stringify({
          action_type,
          ...data
        })
      )
    }
  }

  function OpenWebsocket() {
    const ws_ = new WebSocket('ws://localhost:8000/chat/ws')
    ws.current = ws_
    ws_.onmessage = (e) => {
      const data: ActionBase = JSON.parse(JSON.parse(e.data))
      switch (data.action_type as ClientActionType) {
        case ClientActionType.getPreview:
          GetPreview(data as IChatsPreview)
          break
        case ClientActionType.receiveMessages:
          RecieveMessages(data as IReceiveMessages)
          break
        default:
          console.error('unhandled data: ', data)
      }
    }
    ws_.onopen = () => {
      setIsWsOpen(true)
    }
    ws_.onclose = () => {
      setIsWsOpen(false)
      if (isRun.current) OpenWebsocket()
    }
    ws_.onerror = (err) => {
      console.error('WebSocket encountered error: ', err, 'Closing socket')
      ws_.close()
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
    await wsSend(ServerActionType.getChat, {
      user_id: chat
    })
  }

  async function sendMessage(chat: UUID, message: string) {
    await wsSend(ServerActionType.sendMessage, {
      recipient_id: chat,
      message
    })
  }

  async function deleteChat(chat: UUID) {
    await wsSend(ServerActionType.deleteChat, {
      user_id: chat
    })
  }

  return (
    <WebsocketContext.Provider
      value={{ getChat, sendMessage, deleteChat, isWsOpen }}
    >
      {children}
    </WebsocketContext.Provider>
  )
}
