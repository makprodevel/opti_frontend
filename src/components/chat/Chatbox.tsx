import { useEffect, useRef, useState } from 'react'
import { useChatContext } from '../../ChatContext'
import Message from './Message'
import { useAppSelector } from '../../hooks/redux'
import {
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/react'
import { IMessage } from '../../store/chat'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { useWebsocketContext } from '../../hooks/websocket'

export default function Chatbox() {
  const { isWsOpen } = useWebsocketContext()
  const { currentChat, setCurrentChat } = useChatContext()
  const { chats, users } = useAppSelector((state) => state.chat)
  const [message, setMessage] = useState<string>('')
  const { getChat, sendMessage, deleteChat } = useWebsocketContext()

  const endOfMessagesRef = useRef<HTMLDivElement>(null)
  const inputMessageRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats])

  useEffect(() => {
    if (currentChat && isWsOpen) getChat(currentChat)
  }, [currentChat])

  async function sendMessageHandler(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    if (message.trim() && currentChat && isWsOpen) {
      await sendMessage(currentChat, message.trim())
      setMessage('')
      inputMessageRef.current?.focus()
    }
  }

  async function deleteThisChat() {
    if (currentChat && isWsOpen) {
      await deleteChat(currentChat)
    }
    setCurrentChat('')
  }

  return (
    <div className="flex h-full w-full flex-col bg-gray-200">
      <div className="flex h-16 items-center justify-between bg-gray-800 px-6 text-gray-100">
        <div className="text-bold text-lg">
          {currentChat && users[currentChat]}
        </div>
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton>
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open chat menu</span>
              <EllipsisHorizontalIcon className="w-8 rounded-full text-gray-400" />
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <MenuItem key="">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                onClick={deleteThisChat}
              >
                Удалить чат
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <div className="mb-4 flex h-4 flex-grow flex-col gap-4 overflow-y-auto scroll-auto py-4">
        {currentChat &&
          currentChat in chats &&
          chats[currentChat].map((msg: IMessage) => (
            <Message key={msg.id} {...msg} />
          ))}
        <div ref={endOfMessagesRef} />
      </div>
      <form
        className="flex h-16 grow-0 items-center justify-center"
        onSubmit={(event) => {
          sendMessageHandler(event)
        }}
      >
        <Input
          type="text"
          className="mr-4 w-full max-w-lg rounded-lg border border-gray-300 px-4 py-2"
          placeholder="Пиши"
          value={message}
          ref={inputMessageRef}
          onChange={(event) => {
            setMessage(event.target.value)
          }}
          autoFocus
        />
        <Button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => {
            sendMessageHandler()
          }}
          type="submit"
        >
          Отправить
        </Button>
      </form>
    </div>
  )
}
