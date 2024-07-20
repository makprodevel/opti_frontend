import ListMessage from './ChatList.tsx'
import Chat from './Chat.tsx'
import { ChatProvider } from './ChatContext.tsx'

export default function Chatbox() {
  return (
    <ChatProvider>
      <main className='flex-1'>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between gap-x-40 h-full">
            <ListMessage />
            <Chat />
          </div>
        </div>
      </main>
    </ChatProvider>
  )
}
