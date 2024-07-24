import { Button, Field, Input } from '@headlessui/react'
import Modal from './Modal'
import { Dispatch, SetStateAction, useState } from 'react'
import axios from 'axios'
import { useActions } from '../hooks/action'

interface ChangeNicknameProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function ChangeNickname(props: ChangeNicknameProps) {
  const [newNickname, setNewNickname] = useState<string>('')
  const { setNickname } = useActions()
  async function changeNickname() {
    const response = await axios.put(
      'http://localhost:8000/api/me',
      { new_nickname: newNickname },
      { withCredentials: true }
    )
    setNickname(response.data)
    props.setIsOpen(false)
  }

  return (
    <Modal title="Смена имени" {...props}>
      <Field className="flex flex-col items-center justify-between gap-4">
        <Input
          type="text"
          className="border bg-gray-100"
          value={newNickname}
          onChange={(event) => {
            setNewNickname(event.target.value)
          }}
        ></Input>
        <Button
          className="rounded-full border bg-gray-200 px-6 py-3 hover:bg-gray-300"
          onClick={changeNickname}
        >
          Изменить
        </Button>
      </Field>
    </Modal>
  )
}
