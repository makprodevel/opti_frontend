import { useEffect, useMemo } from 'react'
import { formatDate } from '../../utils'
import { useAppSelector } from '../../hooks/redux'
import { Message as MessageType } from '../../models'
import { CheckIcon } from '@heroicons/react/16/solid'
import useElementInViewport from '../../hooks/visible'
import { useWebsocketContext } from '../../WebsocketContext'
import { useParams } from 'react-router-dom'

interface IMessageProps {
  msg: MessageType
  container: React.RefObject<HTMLDivElement>
}

export default function Message({ msg, container }: IMessageProps) {
  const { readMessages } = useWebsocketContext()
  const { id: userId } = useAppSelector((state) => state.user)
  const [isVisible, elementRef] = useElementInViewport(container)
  const [time, own] = useMemo(() => {
    const formattedDate = formatDate(msg.time)
    return [formattedDate, msg.sender_id == userId]
  }, [msg])
  const { otherUserId } = useParams()

  useEffect(() => {
    if (isVisible && !msg.is_viewed) readMessages(otherUserId || '', [msg.id])
  }, [isVisible])

  return (
    <>
      {own ? (
        <div className="mr-4 flex justify-end">
          <div className="max-w-[80%] rounded-lg bg-blue-500 px-3 py-1 pr-5">
            <p className="text-sm text-white">{msg.text}</p>
            <div className="relative flex justify-end">
              <p className="text-right text-[.6rem] text-gray-200">{time}</p>
              <CheckIcon className="absolute -bottom-1 -right-5 w-4 text-blue-100 opacity-70" />
              {msg.is_viewed && (
                <CheckIcon className="absolute -bottom-1 -right-4 w-4 text-blue-100 opacity-70" />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="ml-4 flex justify-start"
          ref={elementRef as React.RefObject<HTMLDivElement>}
        >
          <div className="max-w-[80%] rounded-lg bg-gray-100 px-3 py-1">
            <p className="text-sm text-gray-900">{msg.text}</p>
            <p className="text-right text-[.6rem] text-gray-900">{time}</p>
          </div>
        </div>
      )}
    </>
  )
}
