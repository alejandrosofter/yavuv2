import Controlador from "../../../../../components/Controlador"
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import Loader from "../../../../../components/loader"

const Modulo=({})=>{
  const auth = useAuthUser()
  if(!auth) return <Loader texto="Cargando Usuario"/>
    return(
      <Controlador auth={auth} pathComponente={"${router.query.componente}/${router.query.accion}"} />
    )

}
export const getServerSideProps = withAuthUserTokenSSR()()
export default withAuthUser({
  
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Modulo)