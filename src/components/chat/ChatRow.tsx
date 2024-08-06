import { Radio } from '@headlessui/react'
import { UUID } from '../../models'
import { useChatContext } from '../../ChatContext'
import { formatDate } from '../../utils'
import { useActions } from '../../hooks/action'

export interface IChatRowProps {
  user: UUID
  nickname: string
  text?: string
  time?: string
  is_viewed?: boolean
  count?: number
}

export default function ChatRow(props: IChatRowProps) {
  const { SetUserNickname } = useActions()
  const { setCurrentChat } = useChatContext()
  const switchChatOnClick = () => {
    SetUserNickname([props.user, props.nickname])
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
        {props.is_viewed !== undefined ? (
          <div className="truncate leading-6 text-gray-900">
            {props.nickname}
          </div>
        ) : (
          <div className="truncate text-sm text-gray-900">{props.nickname}</div>
        )}
        <div className="flex items-center justify-center text-xs">
          {props.time && formatDate(props.time)}
        </div>
      </div>

      {props.text && (
        <div className="flex w-full justify-between gap-x-1">
          <div className="truncate">{props.text}</div>
          {!props.is_viewed && (
            <div className="flex-0 flex items-center justify-center rounded-full bg-blue-500 px-2 py-[0.2rem] text-xs text-gray-200">
              {props.count}
            </div>
          )}
        </div>
      )}
    </Radio>
  )
}
