import { RadioGroup } from '@headlessui/react'
import { useAppSelector } from '../../hooks/redux'
import ChatRow from './ChatRow'

export default function ChatList() {
  const { chatList, users } = useAppSelector((state) => state.chat)

  return (
    <>
      <RadioGroup className="w-full max-w-40 divide-y divide-gray-100 bg-gray-200">
        {[...chatList]
          .sort((p1, p2) => {
            if (p1.is_viewed !== p2.is_viewed) {
              return Number(p1.is_viewed) - Number(p2.is_viewed)
            }
            return new Date(p2.time).getTime() - new Date(p1.time).getTime()
          })
          .map((chatRow) => (
            <ChatRow
              key={chatRow.user}
              {...chatRow}
              nickname={users[chatRow.user]}
            />
          ))}
      </RadioGroup>
    </>
  )
}
