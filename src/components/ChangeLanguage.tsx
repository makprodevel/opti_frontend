import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const LS_LANGUAGE = 'language_value'

enum Language {
  en = 'en',
  ru = 'ru'
}

const languageOptions = [
  { id: 1, name: 'English', value: Language.en },
  { id: 2, name: 'Русский', value: Language.ru }
]

export default function ChangeLanguage() {
  const { i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    (localStorage.getItem(LS_LANGUAGE) as Language) || Language.en
  )

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage)
    localStorage.setItem(LS_LANGUAGE, selectedLanguage)
  }, [selectedLanguage])

  return (
    <div>
      <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
        <ListboxButton className="flex w-full justify-between px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
          {languageOptions.find((option) => option.value === selectedLanguage)
            ?.name || 'Select Language'}
          <ChevronDownIcon className="w-6" />
        </ListboxButton>
        <ListboxOptions className="absolute mt-2 w-48 rounded-md border border-gray-300 bg-gray-200 py-1 shadow-lg">
          {languageOptions.map((option) => (
            <ListboxOption
              key={option.id}
              value={option.value}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-blue-100"
            >
              {option.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  )
}
