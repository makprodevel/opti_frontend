import { Field, RadioGroup, Radio } from '@headlessui/react'
import ChatRow, { IUser } from './ChatRow'

const people: IUser[] = [
  {
    id: 1,
    name: 'Leslie Alexander',
    count_unread_message: 3
  },
  {
    id: 2,
    count_unread_message: 0,
    name: 'Michael Foster'
  },
  {
    id: 3,
    name: 'Dries Vincent',
    count_unread_message: 6
  },
  {
    id: 4,
    name: 'Lindsay Walton',
    count_unread_message: 23
  },
  {
    id: 5,
    count_unread_message: 0,
    name: 'Courtney Henry'
  },
  {
    id: 6,
    name: 'Tom Cook1',
    count_unread_message: 3
  },
  {
    id: 7,
    count_unread_message: 0,
    name: 'Tom Cook2'
  },
  {
    id: 8,
    name: 'Tom Cook',
    count_unread_message: 1
  },
  {
    count_unread_message: 0,
    id: 9,
    name: 'Tom Cook5'
  }
]

export default function ChatList() {
  return (
    <RadioGroup className="divide-y divide-gray-100 max-w-40 w-full">
      {people
        .sort((p1, p2) => p2.count_unread_message - p1.count_unread_message)
        .map((person) => (
          <ChatRow key={person.id} {...person} />
        ))}
    </RadioGroup>
  )
}
