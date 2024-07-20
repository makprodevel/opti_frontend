import { Radio } from '@headlessui/react'

export interface IUser {
  id: number
  name: string
  count_unread_message: number
}

export default function ChatRow(person: IUser) {
  return (
    <Radio
      key={person.id}
      value={person}
      className="flex justify-between gap-x-6 py-5 data-[checked]:bg-black"
    >
      <div className="flex  min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {person.name}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="mt-1 text-xs leading-5 text-gray-500">
          {person.count_unread_message > 0 && person.count_unread_message}
        </p>
      </div>
    </Radio>
  )
}
