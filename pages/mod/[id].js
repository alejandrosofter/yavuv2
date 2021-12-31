import Controlador from "../../components/Controlador";
import Loader from "../../components/loader"
import  { SWRConfig } from 'swr'
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'

const Modulo=({token})=>{
  const auth = useAuthUser()
  if(!auth) return <Loader texto="Cargando Usuario"/>
    return(
      <SWRConfig
      value={{
        refreshInterval: 5000,
        fetcher: (url) => fetch(url,{ headers: { 'Content-Type': 'application/json', Authorization: `${token}`}}).then(res => res.json())
      }}
    >
      <Controlador token={token} auth={auth} pathComponente={"${modulo.nombre}"} />
    </SWRConfig>
      
    )

}

export const getServerSideProps = withAuthUserTokenSSR()(async ({ AuthUser }) => {
  const token = await AuthUser.getIdToken()

  return {
    props: {
      token: token
    }
  }
})
export default withAuthUser({
  
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Modulo)