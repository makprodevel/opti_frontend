import { Button, Field, Input } from '@headlessui/react'
import Modal from './Modal'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useActions } from '../hooks/action'
import { useChangeNicknameMutation } from '../store/mainApi'
import { useTranslation } from 'react-i18next'

interface ChangeNicknameProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function ChangeNickname(props: ChangeNicknameProps) {
  const { t } = useTranslation()
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
    <Modal title={t('changeNicnameBlock.title')} {...props}>
      <Field className="flex flex-col items-center justify-between gap-4 pt-2">
        <Input
          type="text"
          className="rounded-md border bg-gray-200 px-2 py-1"
          value={newNickname}
          onChange={(event) => {
            setNewNickname(event.target.value)
          }}
          placeholder={t('changeNicnameBlock.placeholder')}
          autoFocus
        />
        <Button
          className="rounded-md border bg-gray-200 px-3 py-1.5 hover:bg-gray-300"
          onClick={changeNickname}
        >
          {t('changeNicnameBlock.buttonText')}
        </Button>
      </Field>
    </Modal>
  )
}
