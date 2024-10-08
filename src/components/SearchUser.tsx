import { Input } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useLazySearchUserQuery } from '../store/mainApi'
import { useEffect, useState } from 'react'
import { useDelayed } from '../hooks/delayed'
import { User } from '../models'

interface ISearchUserProps {
  setSearchList: React.Dispatch<React.SetStateAction<User[] | null>>
}

export default function SearchUser({ setSearchList }: ISearchUserProps) {
  const [searchText, setSearchText] = useState<string>('')
  const delayedSearchText = useDelayed<string>(searchText, 200)
  const [
    triggerSearchUser,
    { data: searchUserData, isLoading: isSearchingUser }
  ] = useLazySearchUserQuery()

  useEffect(() => {
    if (delayedSearchText.trim()) triggerSearchUser(delayedSearchText.trim())
    else setSearchList(null)
  }, [delayedSearchText])

  useEffect(() => {
    if (searchUserData && !isSearchingUser) setSearchList(searchUserData.users)
    else setSearchList(null)
  }, [searchUserData, isSearchingUser])

  const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <form
        onSubmit={formHandler}
        className="relative h-16 w-full bg-gray-200 p-3"
      >
        <div className="relative flex h-full w-full gap-x-2 border-b-2 border-gray-400">
          <MagnifyingGlassIcon className="w-6 flex-grow-0 text-gray-600" />
          <Input
            className="w-full bg-gray-200 outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </form>
    </>
  )
}
