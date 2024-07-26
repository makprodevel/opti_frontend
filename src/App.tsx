import Header from './components/Header.tsx'
import { ChatProvider } from './ChatContext.tsx'
import { Route, Routes } from 'react-router-dom'
import About from './pages/AboutPage.tsx'
import ChatPage from './pages/ChatPage.tsx'

export default function App() {
  return (
    <div id="app" className="flex h-full w-full flex-col">
      <Header />
      <ChatProvider>
        <Routes>
          <Route path="/" element={<ChatPage />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </ChatProvider>
    </div>
  )
}
