import { ReactNode, useContext, useState, createContext } from 'react'
import { UUID } from '../models'

//@ts-ignore
const ChatContext = createContext()

export const useChatContext = (): {
  ws: WebSocket
  setWs: React.Dispatch<React.SetStateAction<WebSocket>>
  currentChat: string
  setCurrentChat: React.Dispatch<React.SetStateAction<string>>
} => {
  //@ts-ignore
  return useContext(ChatContext)
}

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  //@ts-ignore
  const [ws, setWs] = useState<WebSocket>(null)
  //@ts-ignore
  const [currentChat, setCurrentChat] = useState<UUID>(null)

  return (
    <ChatContext.Provider value={{ ws, setWs, currentChat, setCurrentChat }}>
      {children}
    </ChatContext.Provider>
  )
}
