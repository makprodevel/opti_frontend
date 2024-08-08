import { useMemo } from 'react'
import { formatDate } from '../../utils'
import { useAppSelector } from '../../hooks/redux'
import { Message as MessageType } from '../../models'

export default function Message(msg: MessageType) {
  const { id: userId } = useAppSelector((state) => state.user)
  const [time, own] = useMemo(() => {
    const formattedDate = formatDate(msg.time)
    return [formattedDate, msg.sender_id == userId]
  }, [msg])

  return (
    <>
      {own ? (
        <div className="mr-4 flex justify-end">
          <div className="max-w-[80%] rounded-lg bg-blue-500 px-4 py-2">
            <p className="text-sm text-white">{msg.text}</p>
            <p className="text-right text-[.6rem] text-gray-200">{time}</p>
          </div>
        </div>
      ) : (
        <div className="ml-4 flex justify-start">
          <div className="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2">
            <p className="text-sm text-gray-900">{msg.text}</p>
            <p className="text-right text-[.6rem] text-gray-900">{time}</p>
          </div>
        </div>
      )}
    </>
  )
}
