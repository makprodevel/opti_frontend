import { RadioGroup } from '@headlessui/react'
import { useAppSelector } from '../../hooks/redux'
import ChatRow from './ChatRow'
import SearchUser from '../SearchUser'
import { useMemo, useState } from 'react'
import { Message, User } from '../../models'

export interface IChatPreview {
  user: User
  message?: Message
}

export default function ChatList() {
  const { messages, users } = useAppSelector((state) => state.chat)
  const [searchList, setSearchList] = useState<User[] | null>(null)
  const { id: currentUserId } = useAppSelector((state) => state.user)

  const listChat: IChatPreview[] =
    useMemo(() => {
      const result: IChatPreview[] = []
      ;(searchList ?? users).forEach((user) => {
        const msgList = messages.filter((msg) => {
          if (user.id != currentUserId)
            return msg.sender_id == user.id || msg.recipient_id == user.id
          else return msg.sender_id == msg.recipient_id
        })
        if (msgList.length) {
          result.push({
            user,
            message: msgList.sort((a, b) => {
              return new Date(b.time).getTime() - new Date(a.time).getTime()
            })[0]
          } as IChatPreview)
        } else if (searchList) result.push({ user } as IChatPreview)
      })
      result.sort((p1, p2) => {
        if (p1.message && p2.message) {
          if (p1.message.is_viewed !== p2.message.is_viewed) {
            return Number(p1.message.is_viewed) - Number(p2.message.is_viewed)
          }
          return (
            new Date(p2.message.time).getTime() -
            new Date(p1.message.time).getTime()
          )
        } else {
          return p2.user.id.localeCompare(p1.user.id)
        }
      })
      return result
    }, [messages, searchList]) || []

  return (
    <div className="relative flex h-full w-full flex-col md:w-60 md:min-w-60 md:max-w-60 md:overflow-hidden md:rounded-lg">
      <SearchUser setSearchList={setSearchList} />
      <RadioGroup className="h-full w-full divide-y divide-gray-100 bg-gray-200">
        {listChat.length ? (
          listChat.map((chatRow) => (
            <ChatRow key={chatRow.user.id} {...chatRow} />
          ))
        ) : (
          <p className="p-3 text-gray-600">Ничего не найдено</p>
        )}
      </RadioGroup>
    </div>
  )
}
