import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function GoogleLoginButton() {
  const client_key = import.meta.env.VITE_client_id
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (isLogin) {
      const ws = new WebSocket('ws://localhost:8000/chat/ws')
      ws.onmessage = (msg) => {
        console.log(JSON.parse(msg.data))
      }
      ws.onopen = () => {
        if (ws.readyState === WebSocket.OPEN)
          ws.send(JSON.stringify({ action_type: 'status_init' }))
      }
    }
  }, [isLogin])

  return (
    <GoogleOAuthProvider clientId={client_key}>
      <div className="App">
        <GoogleLogin
          onSuccess={async ({ credential }) => {
            await axios.get('http://localhost:8000/auth/google', {
              headers: { Authorization: `Bearer ${credential}` },
              withCredentials: true
            })
            setIsLogin(true)
          }}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  )
}
