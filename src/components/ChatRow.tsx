import { Radio } from '@headlessui/react'
import { UUID } from '../models'
import { useActions } from '../hooks/action'
import { useChatContext } from './ChatContext'

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
      className="flex justify-between gap-x-6 py-5 data-[checked]:bg-gray-300"
      onClick={switchChatOnClick}
    >
      <div className="flex  min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {props.nickname}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="mt-1 text-xs leading-5 text-gray-500">
          {props.is_viewed && '*'}
        </p>
      </div>
    </Radio>
  )
}
