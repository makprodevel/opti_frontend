import { Radio } from '@headlessui/react'
import { UUID } from '../../models'
import { useChatContext } from '../../ChatContext'
import { formatDate } from '../../utils'

export interface ChatRowProps {
  user: UUID
  nickname: string
  text: string
  time: string
  is_viewed: boolean
  count: number
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
      className="flex flex-col items-start justify-between border bg-blue-50 p-3 text-sm hover:bg-gray-300 data-[checked]:bg-gray-300"
      onClick={switchChatOnClick}
    >
      <div className="flex w-full justify-between gap-x-1">
        <div className="truncate leading-6 text-gray-900">{props.nickname}</div>
        <div className="flex items-center justify-center text-xs">
          {formatDate(props.time)}
        </div>
      </div>

      <div className="flex w-full justify-between gap-x-1">
        <div className="truncate">{props.text}</div>
        {!props.is_viewed && (
          <div className="flex-0 flex items-center justify-center rounded-full bg-blue-500 px-2 py-[0.2rem] text-xs text-gray-200">
            {props.count}
          </div>
        )}
      </div>
    </Radio>
  )
}
