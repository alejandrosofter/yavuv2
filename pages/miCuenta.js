import Controlador from "../components/Controlador"
import Loader from "../components/loader"
import  useSWR, { SWRConfig } from 'swr'
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import EditarCuenta from "../components/cuentas/editar"
import Layout from "../components/layout"
const Modulo=({token})=>{
 
  const auth = useAuthUser()
  if(!auth) return "Cargando usuario..."
    return(
      <SWRConfig
      value={{
        refreshInterval: 5000,
        fetcher: (url) => fetch(url,{ headers: { 'Content-Type': 'application/json', Authorization: `${token}`}}).then(res => res.json())
      }}
    >
     <Layout token={token} auth={auth} icono={"fas fa-user"}  titulo={"CUENTA DE USUARIO"} >
        <EditarCuenta token={token} auth={auth} /> 
        </Layout>
      
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