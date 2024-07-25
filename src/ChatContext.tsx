import { ReactNode, useContext, useState, createContext } from 'react'
import { UUID } from './models'

interface IChatContext {
  ws: WebSocket | null
  setWs: React.Dispatch<React.SetStateAction<WebSocket | null>>
  currentChat: string | null
  setCurrentChat: React.Dispatch<React.SetStateAction<string | null>>
}

const ChatContext = createContext<IChatContext>({
  ws: null,
  setWs: () => {},
  currentChat: null,
  setCurrentChat: () => {}
})

export const useChatContext = () => {
  return useContext(ChatContext)
}

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [currentChat, setCurrentChat] = useState<UUID | null>(null)

  return (
    <ChatContext.Provider value={{ ws, setWs, currentChat, setCurrentChat }}>
      {children}
    </ChatContext.Provider>
  )
}
