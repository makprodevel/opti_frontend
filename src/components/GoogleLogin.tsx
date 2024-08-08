import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useGetUserDataMutation } from '../store/mainApi'

export default function GoogleLoginButton() {
  const client_key = import.meta.env.VITE_client_id
  const [triggerGetUserData] = useGetUserDataMutation()

  return (
    <GoogleOAuthProvider clientId={client_key}>
      <div className="App">
        <GoogleLogin
          onSuccess={async ({ credential }) => {
            await axios.get('http://localhost:8000/auth/google', {
              headers: { Authorization: `Bearer ${credential}` },
              withCredentials: true
            })
            triggerGetUserData()
          }}
        />
      </div>
    </GoogleOAuthProvider>
  )
}
