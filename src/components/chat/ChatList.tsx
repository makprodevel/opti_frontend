import { RadioGroup } from '@headlessui/react'
import { useAppSelector } from '../../hooks/redux'
import ChatRow from './ChatRow'
import SearchUser from '../SearchUser'
import { useState } from 'react'
import { UserInfo } from '../../models'

export default function ChatList() {
  const { chatList, users } = useAppSelector((state) => state.chat)
  const [searchList, setSearchList] = useState<UserInfo[]>([])

  return (
    <div className="relative flex h-full w-60 max-w-60 min-w-60 flex-col">
      <SearchUser setSearchList={setSearchList} />
      <RadioGroup className="h-full w-full divide-y divide-gray-100 bg-gray-200">
        {searchList.length
          ? searchList.map((user) => (
              <ChatRow key={user.id} user={user.id} nickname={user.nickname} />
            ))
          : [...chatList]
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
    </div>
  )
}
