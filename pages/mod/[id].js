import Controlador from "../../components/Controlador";
import Loader from "../../components/loader"
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'

const modulo=({})=>{
  const auth = useAuthUser()
  if(!auth) return <Loader texto="Cargando Usuario"/>
    return(
      <Controlador auth={auth} pathComponente={"${modulo.nombre}"} />
    )

}
export const getServerSideProps = withAuthUserTokenSSR()()
export default withAuthUser({
  
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(modulo)