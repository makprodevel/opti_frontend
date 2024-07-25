import { Radio } from '@headlessui/react'
import { UUID } from '../models'
import { useChatContext } from '../ChatContext'

export interface ChatRowProps {
  user: UUID
  nickname: string
  text: string
  time: string
  is_viewed: boolean
}

export default function ChatRow(props: ChatRowProps) {
  const { setCurrentChat } = useChatContext()
  const switchChatOnClick = () => {
    setCurrentChat(props.user)
  }

  return (
    <Radio
      key={props.user}
      value={props}
      className="flex items-center justify-between gap-x-6 border hover:bg-gray-300 data-[checked]:bg-gray-300"
      onClick={switchChatOnClick}
    >
      <div className="flex min-w-0 gap-x-4 p-5">
        <div className="min-w-0 flex-auto">
          <p className="text-sm leading-6 text-gray-900">{props.nickname}</p>
        </div>
      </div>
      {!props.is_viewed && (
        <div className="shrink-0 p-4 sm:flex sm:flex-col sm:items-end">
          <div
            className="h-3 w-3 rounded-full bg-black opacity-40"
            id="rrr"
          ></div>
        </div>
      )}
    </Radio>
  )
}
