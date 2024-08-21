import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import {
  useGetUserDataMutation,
  useLazyGetCookieTokenQuery
} from '../store/mainApi'
import { useEffect } from 'react'

export default function GoogleLoginButton() {
  const client_key = import.meta.env.VITE_client_id
  const [triggerGetUserData] = useGetUserDataMutation()
  const [triggerGetCookieToken, { isSuccess }] = useLazyGetCookieTokenQuery()

  useEffect(() => {
    if (isSuccess) triggerGetUserData()
  }, [isSuccess])

  return (
    <GoogleOAuthProvider clientId={client_key}>
      <div className="App">
        <GoogleLogin
          onSuccess={async ({ credential }) => {
            triggerGetCookieToken(credential as string)
          }}
        />
      </div>
    </GoogleOAuthProvider>
  )
}
