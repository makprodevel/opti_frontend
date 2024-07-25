import { ReactNode, useContext, useState, createContext, useRef } from 'react'
import { UUID } from './models'

interface IChatContext {
  ws: React.MutableRefObject<WebSocket | null>
  currentChat: string | null
  setCurrentChat: React.Dispatch<React.SetStateAction<string | null>>
  isWsOpen: boolean
  setIsWsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatContext = createContext<IChatContext>({
  ws: { current: null },
  currentChat: null,
  setCurrentChat: () => {},
  isWsOpen: false,
  setIsWsOpen: () => {}
})

export const useChatContext = () => {
  return useContext(ChatContext)
}

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const ws = useRef<WebSocket | null>(null)
  const [currentChat, setCurrentChat] = useState<UUID | null>(null)
  const [isWsOpen, setIsWsOpen] = useState<boolean>(false)

  return (
    <ChatContext.Provider
      value={{ ws, currentChat, setCurrentChat, isWsOpen, setIsWsOpen }}
    >
      {children}
    </ChatContext.Provider>
  )
}
