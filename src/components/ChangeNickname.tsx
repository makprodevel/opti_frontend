import { Button, Field, Input } from '@headlessui/react'
import Modal from './Modal'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useActions } from '../hooks/action'
import { useChangeNicknameMutation } from '../store/mainApi'

interface ChangeNicknameProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function ChangeNickname(props: ChangeNicknameProps) {
  const [newNickname, setNewNickname] = useState<string>('')
  const { setNickname } = useActions()
  const [
    triggerChangeNickname,
    { data: changeNicknameData, isLoading: isChangingNickname }
  ] = useChangeNicknameMutation()

  async function changeNickname() {
    if (newNickname.trim()) {
      triggerChangeNickname(newNickname.trim())
      props.setIsOpen(false)
      setNewNickname('')
    }
  }

  useEffect(() => {
    if (!isChangingNickname && changeNicknameData)
      setNickname(changeNicknameData.new_nickname)
  }, [changeNicknameData, isChangingNickname])

  return (
    <Modal title="Смена имени" {...props}>
      <Field className="flex flex-col items-center justify-between gap-4">
        <Input
          type="text"
          className="rounded-xl border bg-gray-200 px-2 py-1"
          value={newNickname}
          onChange={(event) => {
            setNewNickname(event.target.value)
          }}
          placeholder="введите новое имя"
          autoFocus
        />
        <Button
          className="rounded-xl border bg-gray-200 px-6 py-3 hover:bg-gray-300"
          onClick={changeNickname}
        >
          Изменить
        </Button>
      </Field>
    </Modal>
  )
}
