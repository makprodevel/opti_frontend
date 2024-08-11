import { Dispatch, ReactNode, SetStateAction } from 'react'
import { createPortal } from 'react-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Button
} from '@headlessui/react'

interface ModalProps {
  children: ReactNode
  title: string
  description?: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function Modal({
  children,
  title,
  description = '',
  isOpen,
  setIsOpen
}: ModalProps) {
  return createPortal(
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-30"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <div className="absolute inset-0 z-10 bg-black opacity-60"></div>
        <DialogPanel className="relative z-20 max-w-lg space-y-4 rounded-lg border bg-gray-100 px-8 py-4">
          <Button
            className="absolute right-4 top-4"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon className="w-7" />
          </Button>
          <DialogTitle className="ml-auto text-center text-lg font-bold">
            {title}
          </DialogTitle>
          <Description>{description}</Description>
          {children}
        </DialogPanel>
      </div>
    </Dialog>,
    document.getElementById('modal') as HTMLElement
  )
}
