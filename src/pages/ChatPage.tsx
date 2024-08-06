import ListMessage from '../components/chat/ChatList.tsx'
import Chatbox from '../components/chat/Chatbox.tsx'
import { useChatContext } from '../ChatContext.tsx'
import { useAppSelector } from '../hooks/redux.ts'
import GoogleLoginButton from '../components/GoogleLogin.tsx'
import { WebSocketProvider } from '../WebsocketContext.tsx'

export default function ChatPage() {
  const { id: isLogin } = useAppSelector((state) => state.user)
  const { currentChat } = useChatContext()

  return (
    <>
      {isLogin ? (
        <WebSocketProvider>
          <main className="flex-1">
            <div className="mx-auto h-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="flex h-full justify-between gap-x-16">
                <ListMessage />
                {currentChat && <Chatbox />}
              </div>
            </div>
          </main>
        </WebSocketProvider>
      ) : (
        <GoogleLoginButton />
      )}
    </>
  )
}
