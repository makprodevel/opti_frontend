import Header from './components/Header.tsx'
import Chatbox from './components/Chatbox.tsx'
import GoogleLoginButton from './components/GoogleLogin.tsx'
import { useState } from 'react'

export default function App() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <div id="app" className="w-full h-full flex flex-col">
      <Header />
      {/* <GoogleLoginButton isLogin={isLogin} setIsLogin={setIsLogin} /> */}
      <Chatbox />
    </div>
  )
}
