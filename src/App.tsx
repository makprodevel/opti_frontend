import Header from './components/Header.tsx'
import { Route, Routes } from 'react-router-dom'
import About from './pages/AboutPage.tsx'
import ChatPage from './pages/ChatPage.tsx'

export default function App() {
  return (
    <div id="app" className="flex h-full w-full flex-col">
      <Header />
      <Routes>
        <Route path="/chat/:otherUserId?" element={<ChatPage />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </div>
  )
}
