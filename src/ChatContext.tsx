import { ReactNode, useContext, useState, createContext } from 'react'
import { UUID } from './models'

interface IChatContext {
  currentChat: string | null
  setCurrentChat: React.Dispatch<React.SetStateAction<string | null>>
}

const ChatContext = createContext<IChatContext>({
  currentChat: null,
  setCurrentChat: () => {}
})

export const useChatContext = () => {
  return useContext(ChatContext)
}

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [currentChat, setCurrentChat] = useState<UUID | null>(null)

  return (
    <ChatContext.Provider
      value={{
        currentChat,
        setCurrentChat
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
