import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useActions } from '../hooks/action'

export default function GoogleLoginButton() {
  const client_key = import.meta.env.VITE_client_id
  const { logIn } = useActions()

  return (
    <GoogleOAuthProvider clientId={client_key}>
      <div className="App">
        <GoogleLogin
          onSuccess={async ({ credential }) => {
            await axios.get('http://localhost:8000/auth/google', {
              headers: { Authorization: `Bearer ${credential}` },
              withCredentials: true
            })
            logIn()
          }}
        />
      </div>
    </GoogleOAuthProvider>
  )
}
