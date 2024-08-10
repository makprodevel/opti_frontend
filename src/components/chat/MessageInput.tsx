import { useState } from 'react'
import { UUID } from '../../models'
import { useWebsocketContext } from '../../WebsocketContext'
import { Button, Input } from '@headlessui/react'

interface IMessageInputProps {
  inputRef: React.RefObject<HTMLInputElement>
  sendingUserId: UUID
}

export function MessageInput({ inputRef, sendingUserId }: IMessageInputProps) {
  const [messageText, setMessageText] = useState<string>('')
  const { isWsOpen, sendMessage } = useWebsocketContext()

  async function sendMessageHandler(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    if (messageText.trim() && sendingUserId && isWsOpen) {
      await sendMessage(sendingUserId, messageText.trim())
      setMessageText('')
      inputRef.current?.focus()
    }
  }

  return (
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
        ref={inputRef}
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
  )
}
