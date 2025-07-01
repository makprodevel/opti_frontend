import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import {
  useGetUserDataMutation,
  useLazyGetCookieTokenQuery
} from '../store/mainApi'
import { useEffect } from 'react'

export default function GoogleLoginButton() {
  console.log('googleClientId', import.meta.env.VITE_GOOGLE_CLIENT_ID)
  const [triggerGetUserData] = useGetUserDataMutation()
  const [triggerGetCookieToken, { isSuccess }] = useLazyGetCookieTokenQuery()

  useEffect(() => {
    if (isSuccess) triggerGetUserData()
  }, [isSuccess])

  return (
    <GoogleOAuthProvider
      clientId={
        '387912847310-3tv8u957n5vk5pcql5n7r6ion05b82m1.apps.googleusercontent.com'
      }
    >
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
