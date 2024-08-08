import { RadioGroup } from '@headlessui/react'
import { useAppSelector } from '../../hooks/redux'
import ChatRow from './ChatRow'
import SearchUser from '../SearchUser'
import { useMemo, useState } from 'react'
import { User, IChatPreview } from '../../models'

export default function ChatList() {
  const { messages, users } = useAppSelector((state) => state.chat)
  const [searchList, setSearchList] = useState<User[]>([])

  const listChat: IChatPreview[] =
    useMemo(() => {
      const result: IChatPreview[] = []
      users.forEach((user) => {
        const msgList = messages.filter(
          (msg) => msg.sender_id == user.id || msg.recipient_id == user.id
        )
        if (msgList.length) {
          result.push({
            user,
            last_message: msgList.sort((a, b) => {
              return new Date(b.time).getTime() - new Date(a.time).getTime()
            })[0]
          } as IChatPreview)
        }
      })
      return result
    }, [messages]) || []

  return (
    <div className="relative flex h-full w-60 min-w-60 max-w-60 flex-col">
      <SearchUser setSearchList={setSearchList} />
      <RadioGroup className="h-full w-full divide-y divide-gray-100 bg-gray-200">
        {searchList.length
          ? searchList.map((user) => <ChatRow key={user.id} user={user} />)
          : listChat
              .sort((p1, p2) => {
                if (p1.last_message.is_viewed !== p2.last_message.is_viewed) {
                  return (
                    Number(p1.last_message.is_viewed) -
                    Number(p2.last_message.is_viewed)
                  )
                }
                return (
                  new Date(p2.last_message.time).getTime() -
                  new Date(p1.last_message.time).getTime()
                )
              })
              .map((chatRow) => (
                <ChatRow
                  key={chatRow.user.id}
                  user={chatRow.user}
                  message={chatRow.last_message}
                />
              ))}
      </RadioGroup>
    </div>
  )
}
