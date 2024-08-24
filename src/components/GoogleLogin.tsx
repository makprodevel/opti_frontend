import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import {
  useGetGoogleClientIdQuery,
  useGetUserDataMutation,
  useLazyGetCookieTokenQuery
} from '../store/mainApi'
import { useEffect } from 'react'

export default function GoogleLoginButton() {
  const { data: googleClientId } = useGetGoogleClientIdQuery()
  const [triggerGetUserData] = useGetUserDataMutation()
  const [triggerGetCookieToken, { isSuccess }] = useLazyGetCookieTokenQuery()

  useEffect(() => {
    if (isSuccess) triggerGetUserData()
  }, [isSuccess])

  return (
    <GoogleOAuthProvider clientId={googleClientId?.GOOGLE_CLIENT_ID as string}>
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
