import ListMessage from '../components/chat/ChatList.tsx'
import Chatbox from '../components/chat/Chatbox.tsx'
import { useAppSelector } from '../hooks/redux.ts'
import GoogleLoginButton from '../components/GoogleLogin.tsx'
import { WebSocketProvider } from '../WebsocketContext.tsx'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useActions } from '../hooks/action.ts'
import { ChatPageParams } from '../models.ts'

export default function ChatPage() {
  const { id: myId } = useAppSelector((state) => state.user)
  const { otherUserId } = useParams<ChatPageParams>()

  const { DeletePreviewMark } = useActions()
  useEffect(() => {
    if (otherUserId) DeletePreviewMark(otherUserId)
  }, [otherUserId])

  return (
    <>
      {myId ? (
        <WebSocketProvider>
          <main className="flex-1">
            <div className="mx-auto h-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="flex h-full justify-between gap-x-16">
                <ListMessage />
                {otherUserId && <Chatbox />}
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
