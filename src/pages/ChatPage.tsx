import ListMessage from '../components/chat/ChatList.tsx'
import Chatbox from '../components/chat/Chatbox.tsx'
import { useChatContext } from '../ChatContext.tsx'
import { useAppSelector } from '../hooks/redux.ts'
import GoogleLoginButton from '../components/GoogleLogin.tsx'
import useWebsocket from '../hooks/websocket.ts'

export default function ChatPage() {
  const { isLogin } = useAppSelector((state) => state.login)
  const { currentChat } = useChatContext()
  useWebsocket()

  return (
    <>
      {isLogin ? (
        <main className="flex-1">
          <div className="mx-auto h-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex h-full justify-between gap-x-40">
              <ListMessage />
              {currentChat && <Chatbox />}
            </div>
          </div>
        </main>
      ) : (
        <GoogleLoginButton />
      )}
    </>
  )
}
