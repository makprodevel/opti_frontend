import { ReactNode, useContext, useState, createContext } from 'react'

// @ts-ignore
const ChatContext = createContext()

export const useChat = () => {
  return useContext(ChatContext)
}

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [nickname, setNickname] = useState('')

  return (
    <ChatContext.Provider value={{ nickname, setNickname }}>
      {children}
    </ChatContext.Provider>
  )
}
