import ListMessage from './ChatList/ChatList.tsx'
import Chat from './Chat/Chat'
import { ChatProvider } from './Chat/ChatContext.tsx'

export default function Chatbox() {
  return (
    <ChatProvider>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div id="chatbox">
            <ListMessage />
            <Chat />
          </div>
        </div>
      </main>
    </ChatProvider>
  )
}
