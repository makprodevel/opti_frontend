import { useEffect, useRef, useState } from 'react'
import { useChatContext } from './ChatContext'
import Message from './Message'
import { useAppSelector } from '../hooks/redux'
import { Button, Input } from '@headlessui/react'
import { ActionType } from '../models'
import { IMessage } from '../store/chat'

export default function Chat() {
  const { currentChat, ws } = useChatContext()
  const { chats } = useAppSelector((state) => state.chat)
  const [message, setMessage] = useState<string>('')

  const endOfMessagesRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats])

  useEffect(() => {
    if (currentChat && ws.readyState == WebSocket.OPEN)
      ws.send(
        JSON.stringify({
          action_type: 'get_chat',
          recipient_id: currentChat
        })
      )
  }, [currentChat])

  async function sendMessage() {
    if (message && currentChat && ws.readyState === WebSocket.OPEN) {
      await ws.send(
        JSON.stringify({
          action_type: ActionType.sendMessage,
          recipient_id: currentChat,
          message: message
        })
      )
      setMessage('')
    }
  }

  return (
    <div className="flex h-full w-full flex-col bg-gray-200">
      <div className="mb-4 flex h-40 flex-grow flex-col gap-4 overflow-y-auto scroll-auto py-4">
        {currentChat in chats &&
          chats[currentChat].map((msg: IMessage) => (
            <Message key={msg.id} {...msg} />
          ))}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="flex h-16 grow-0 items-center justify-center">
        <Input
          type="text"
          className="mr-4 w-full max-w-lg rounded-lg border border-gray-300 px-4 py-2"
          placeholder="Пиши"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value)
          }}
        />
        <Button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={sendMessage}
        >
          Отправить
        </Button>
      </div>
    </div>
  )
}
