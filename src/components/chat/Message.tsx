import { useMemo } from 'react'
import { IMessage } from '../../store/chat'

export default function Message(msg: IMessage) {
  const [time, own] = useMemo(() => {
    const date = new Date(msg.time)
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }
    const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(date)
    return [formattedDate, msg.owning]
  }, [msg])

  return (
    <div className={`flex ${own ? 'mr-4 justify-end' : 'ml-4 justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${own ? 'bg-blue-500' : 'bg-gray-100'}`}
      >
        <p className={`text-sm ${own ? 'text-white' : 'text-gray-900'}`}>
          {msg.text}
        </p>
        <p className="text-right text-[.6rem] text-gray-200">{time}</p>
      </div>
    </div>
  )
}
