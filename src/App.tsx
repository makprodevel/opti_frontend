import Header from './components/Header.tsx'
import Chatbox from './components/Chatbox/Chatbox.tsx'
import GoogleLoginButton from './GoogleLogin.tsx'

export default function App() {
  return (
    <div id="app" className="w-full min-h-full">
      <Header />
      <GoogleLoginButton />
      <Chatbox />
    </div>
  )
}
