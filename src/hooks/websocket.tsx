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
  ActionType,
  IGetChat,
  IGetPreview,
  IReceivedMessage,
  UUID
} from '../models'

import { useActions } from './action'

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

  const { GetPreview, AddChat, RecieveMessage } = useActions()
  const isRun = useRef<boolean>(false)

  const wsSend = async (
    action_type: ActionType,
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
      switch (data.action_type) {
        case ActionType.getPreview:
          GetPreview(data as IGetPreview)
          break
        case ActionType.getChat:
          AddChat(data as IGetChat)
          break
        case ActionType.recieveMessage:
          RecieveMessage(data as IReceivedMessage)
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
    await wsSend(ActionType.getChat, {
      recipient_id: chat
    })
  }

  async function sendMessage(chat: UUID, message: string) {
    await wsSend(ActionType.sendMessage, {
      recipient_id: chat,
      message
    })
  }

  async function deleteChat(chat: UUID) {
    await wsSend(ActionType.deleteChat, {
      id: chat
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
