import { Input } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useLazySearchUserQuery } from '../store/api'
import { useEffect, useState } from 'react'
import { useDelayed } from '../hooks/delayed'

export default function SearchUser() {
  const [searchText, setSearchText] = useState<string>('')
  const delayedSearchText = useDelayed<string>(searchText, 500)
  const [
    triggerSearchUser,
    { data: searchUserData, isLoading: isSearchingUser }
  ] = useLazySearchUserQuery()

  useEffect(() => {
    if (delayedSearchText.trim()) triggerSearchUser(delayedSearchText.trim())
  }, [delayedSearchText])

  useEffect(() => {
    if (searchUserData && !isSearchingUser) {
      console.error(searchUserData.users.length)
    }
  }, [searchUserData, isSearchingUser])

  return (
    <form className="h-16 w-full bg-gray-200 p-3">
      <div className="relative flex h-full w-full gap-x-2 border-b-2 border-gray-400">
        <MagnifyingGlassIcon className="w-6 flex-grow-0 text-gray-600" />
        <Input
          className="w-full bg-gray-200 outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </form>
  )
}
