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
            <div className="mx-auto h-full md:max-w-7xl md:px-4 md:py-6">
              <div className="flex h-full flex-col justify-between gap-x-12 md:flex-row">
                <div className="border-t border-black md:hidden"></div>
                {!otherUserId && (
                  <div className="block md:hidden h-full w-full">
                    <ListMessage />
                  </div>
                )}
                <div className="hidden md:block">
                  <ListMessage />
                </div>
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
