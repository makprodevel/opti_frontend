import { Radio } from '@headlessui/react'
import { Message, User } from '../../models'
import { formatDate } from '../../utils'
import { useActions } from '../../hooks/action'
import { useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { useAppSelector } from '../../hooks/redux'

export interface IChatRowProps {
  user: User
  message?: Message
}

export default function ChatRow({ user, message }: IChatRowProps) {
  const { AddUser } = useActions()
  const { messages } = useAppSelector((state) => state.chat)
  const { id: myId } = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const switchChatOnClick = () => {
    AddUser(user)
    navigate(`/chat/${user.id}`)
  }

  const countUnreadMessage = useMemo(() => {
    return messages.filter(
      (msg) => msg.recipient_id == myId && msg.is_viewed == false
    ).length
  }, [messages])

  return (
    <Radio
      key={user.id}
      value={user}
      className="flex flex-col items-start justify-between border bg-blue-50 p-3 text-sm hover:bg-gray-300 data-[checked]:bg-gray-300"
      onClick={switchChatOnClick}
    >
      <div className="flex w-full justify-between gap-x-1">
        {message !== undefined ? (
          <>
            <div className="truncate leading-6 text-gray-900">
              {user.nickname}
            </div>
            <div className="flex items-center justify-center text-xs">
              {message.time && formatDate(message.time)}
            </div>
          </>
        ) : (
          <div className="truncate text-sm text-gray-900">{user.nickname}</div>
        )}
      </div>

      {message && (
        <div className="flex w-full justify-between gap-x-1">
          <div className="truncate">{message.text}</div>
          {user.count_unread_message && (
            <div className="flex-0 flex items-center justify-center rounded-full bg-blue-500 px-2 py-[0.2rem] text-xs text-gray-200">
              {user.count_unread_message ?? countUnreadMessage}
            </div>
          )}
        </div>
      )}
    </Radio>
  )
}
