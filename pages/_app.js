import { Provider } from "next-auth/client"
import NextNprogress from 'nextjs-progressbar';
import {  signIn,useSession } from "next-auth/client"
import {useEffect} from "react"
function MyApp({ Component, pageProps  }) {
  return (
    <Provider session={pageProps.session}>
      <NextNprogress />
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
  </Provider>
  )
} 
function Auth({ children }) {
  const [session, loading] = useSession()
  const isUser = !!session?.user
  useEffect(() => {
    if (loading) return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, loading])

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}
export default MyApp
