import ListMessage from './ChatList.tsx'
import Chat from './Chat.tsx'
import { useChatContext } from './ChatContext.tsx'
import { useEffect, useRef } from 'react'
import { ActionBase, ActionType, IGetChat, IGetPreview } from '../models.ts'
import { useActions } from '../hooks/action.ts'

export default function Chatbox() {
  //@ts-ignore
  const { setWs } = useChatContext()
  const isRun = useRef(false)
  const { GetPreview, AddChat } = useActions()
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
            const buf = {}
            AddChat(data as IGetChat)
            break
          default:
            console.log(data)
        }
      }
      new_ws.onopen = () => {
        new_ws.send(JSON.stringify({ action_type: 'get_preview' }))
      }
    }
  }, [])

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between gap-x-40 h-full">
          <ListMessage />
          <Chat />
        </div>
      </div>
    </main>
  )
}
