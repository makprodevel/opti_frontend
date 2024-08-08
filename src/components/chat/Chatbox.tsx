import { useEffect, useMemo, useRef, useState } from 'react'
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
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { useWebsocketContext } from '../../WebsocketContext'
import { Message as MessageType } from '../../models'
import { useNavigate, useParams } from 'react-router-dom'

export default function Chatbox() {
  const { otherUserId } = useParams()
  const navigate = useNavigate()
  const { isWsOpen } = useWebsocketContext()
  const { messages, users } = useAppSelector((state) => state.chat)
  const { id: meId } = useAppSelector((state) => state.user)
  const [messageText, setMessageText] = useState<string>('')
  const { getChat, sendMessage, deleteChat } = useWebsocketContext()

  useEffect(() => {
    if (otherUserId && isWsOpen) getChat(otherUserId)
  }, [isWsOpen, otherUserId])

  const chatTile = useMemo(() => {
    if (otherUserId) {
      const currentUser = users.filter((user) => user.id == otherUserId)
      if (currentUser.length) return currentUser[0].nickname
    }
    return ''
  }, [otherUserId])

  const messageList: MessageType[] = useMemo(() => {
    if (otherUserId) {
      const listMessage: MessageType[] = messages.filter(
        (msg) =>
          (msg.sender_id == meId && msg.recipient_id == otherUserId) ||
          (msg.recipient_id == meId && msg.sender_id == otherUserId)
      )
      return listMessage
    }
    return []
  }, [otherUserId, messages])

  async function sendMessageHandler(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    if (messageText.trim() && otherUserId && isWsOpen) {
      await sendMessage(otherUserId, messageText.trim())
      setMessageText('')
      inputMessageRef.current?.focus()
    }
  }

  async function deleteThisChat() {
    if (otherUserId && isWsOpen) await deleteChat(otherUserId)
    navigate('/chat')
  }

  const endOfMessagesRef = useRef<HTMLDivElement>(null)
  const inputMessageRef = useRef<HTMLInputElement>(null)
  const messageContainerRef = useRef<HTMLDivElement>(null)
  // useEffect(() => {
  //   endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  // }, [messageList])
  // useEffect(() => {
  //   endOfMessagesRef.current?.scrollIntoView()
  // }, [otherUserId])

  return (
    <div className="flex h-full w-full flex-col bg-gray-200">
      <div className="flex h-16 items-center justify-between bg-gray-800 px-6 text-gray-100">
        <div className="text-bold text-lg">{chatTile}</div>
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton>
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Открыть меню чата</span>
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
      <div
        className="mb-4 flex h-4 flex-grow flex-col gap-4 overflow-y-auto scroll-auto py-4"
        ref={messageContainerRef}
      >
        {messageList.map((msg: MessageType) => (
          <Message key={msg.id} msg={msg} container={messageContainerRef} />
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
          value={messageText}
          ref={inputMessageRef}
          onChange={(event) => {
            setMessageText(event.target.value)
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
