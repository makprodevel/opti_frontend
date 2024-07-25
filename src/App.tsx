import Header from './components/Header.tsx'
import { ChatProvider } from './ChatContext.tsx'
import { Route, Routes } from 'react-router-dom'
import About from './pages/about.tsx'
import ChatPage from './pages/ChatPage.tsx'

export default function App() {
  return (
    <div id="app" className="flex h-full w-full flex-col">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ChatProvider>
              <ChatPage />
            </ChatProvider>
          }
        ></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </div>
  )
}
