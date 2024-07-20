import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface IGoogleLoginButton {
  isLogin: boolean
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GoogleLoginButton({
  isLogin,
  setIsLogin
}: IGoogleLoginButton) {
  const client_key = import.meta.env.VITE_client_id

  //   useEffect(() => {
  //     if (isLogin) {
  //       const ws = new WebSocket('ws://localhost:8000/chat/ws')
  //       ws.onmessage = (msg) => {
  //         console.log(JSON.parse(msg.data))
  //       }
  //       ws.onopen = () => {
  //         if (ws.readyState === WebSocket.OPEN)
  //           ws.send(JSON.stringify({ action_type: 'status_init' }))
  //       }
  //     }
  //   }, [isLogin])

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
        />
      </div>
    </GoogleOAuthProvider>
  )
}
