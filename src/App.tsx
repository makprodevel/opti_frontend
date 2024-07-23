import Header from './components/Header.tsx'
import Chatbox from './components/Chatbox.tsx'
import GoogleLoginButton from './components/GoogleLogin.tsx'
import { ChatProvider } from './components/ChatContext.tsx'
import { useAppSelector } from './hooks/redux.ts'

export default function App() {
  const { isLogin } = useAppSelector((state) => state.login)

  return (
    <div id="app" className="w-full h-full flex flex-col">
      <Header />
      <ChatProvider>
        {isLogin ? <Chatbox /> : <GoogleLoginButton />}
      </ChatProvider>
    </div>
  )
}
