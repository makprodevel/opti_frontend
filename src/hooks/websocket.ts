import { useEffect, useRef } from 'react'
import { useChatContext } from '../ChatContext'
import {
  ActionBase,
  ActionType,
  IGetChat,
  IGetPreview,
  IReceivedMessage,
  UUID
} from '../models'
import { useActions } from './action'
import { useAppSelector } from './redux'

export default function useWebsocket() {
  const { ws, setIsWsOpen } = useChatContext()
  const { GetPreview, AddChat, RecieveMessage } = useActions()
  const { isLogin } = useAppSelector((state) => state.login)
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
      wsSend(ActionType.getPreview)
    }
    ws_.onclose = () => {
      setIsWsOpen(false)
      OpenWebsocket()
    }
  }

  useEffect(() => {
    if (isLogin && ws.current == null && !isRun.current) {
      isRun.current = true
      OpenWebsocket()
    }
  }, [isLogin])

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

  return { getChat, sendMessage, deleteChat }
}
