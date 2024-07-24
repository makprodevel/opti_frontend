import ListMessage from './ChatList.tsx'
import Chat from './Chat.tsx'
import { useChatContext } from './ChatContext.tsx'
import { useEffect, useRef } from 'react'
import {
  ActionBase,
  ActionType,
  IGetChat,
  IGetPreview,
  IReceivedMessage
} from '../models.ts'
import { useActions } from '../hooks/action.ts'

export default function Chatbox() {
  const { setWs, currentChat } = useChatContext()
  const isRun = useRef(false)
  const { GetPreview, AddChat, RecieveMessage } = useActions()
  useEffect(() => {
    if (!isRun.current) {
      isRun.current = true
      const new_ws = new WebSocket('ws://localhost:8000/chat/ws')
      setWs(new_ws)
      new_ws.onmessage = (e) => {
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
      new_ws.onopen = () => {
        new_ws.send(JSON.stringify({ action_type: 'get_preview' }))
      }
    }
  }, [])

  return (
    <main className="flex-1">
      <div className="mx-auto h-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex h-full justify-between gap-x-40">
          <ListMessage />
          {currentChat && <Chat />}
        </div>
      </div>
    </main>
  )
}
