import { useState } from 'react'
import { UUID } from '../../models'
import { useWebsocketContext } from '../../WebsocketContext'
import { Button, Input } from '@headlessui/react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

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
      className="mx-4 flex h-16 grow-0 items-center justify-center"
      onSubmit={(event) => {
        sendMessageHandler(event)
      }}
    >
      <Input
        type="text"
        className="mr-2 w-full max-w-lg rounded-lg border border-gray-300 px-4 py-2"
        placeholder="Пиши"
        value={messageText}
        ref={inputRef}
        onChange={(event) => {
          setMessageText(event.target.value)
        }}
        autoFocus
      />
      <Button
        className="rounded-full px-2 hover:bg-gray-300"
        onClick={() => {
          sendMessageHandler()
        }}
        type="submit"
      >
        <PaperAirplaneIcon className="w-6 py-2 text-blue-600" />
      </Button>
    </form>
  )
}
