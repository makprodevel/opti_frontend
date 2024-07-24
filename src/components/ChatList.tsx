import { RadioGroup } from '@headlessui/react'
import ChatRow from './ChatRow'
import { useAppSelector } from '../hooks/redux'

export default function ChatList() {
  const { chatList, users } = useAppSelector((state) => state.chat)

  return (
    <RadioGroup className="divide-y divide-gray-100 max-w-40 w-full bg-gray-200">
      {[...chatList]
        .sort((p1, p2) => {
          if (p1.is_viewed !== p2.is_viewed) {
            return Number(p1.is_viewed) - Number(p2.is_viewed)
          }
          return new Date(p1.time).getTime() - new Date(p2.time).getTime()
        })
        .map((chatRow) => (
          <ChatRow
            key={chatRow.user}
            {...chatRow}
            nickname={users[chatRow.user]}
          />
        ))}
    </RadioGroup>
  )
}
