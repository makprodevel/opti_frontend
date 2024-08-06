import { useMemo } from 'react'
import { IMessage } from '../../store/chat'
import { formatDate } from '../../utils'

export default function Message(msg: IMessage) {
  const [time, own] = useMemo(() => {
    const formattedDate = formatDate(msg.time)
    return [formattedDate, msg.owning]
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
