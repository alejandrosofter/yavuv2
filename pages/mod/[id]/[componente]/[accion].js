import Controlador from "../../../../components/Controlador"
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
const Modulo=({})=>{
  const auth = useAuthUser()
    return(
      <Controlador auth={auth} pathComponente={"${router.query.componente}/${router.query.accion}"} />
    )

}
export const getServerSideProps = withAuthUserTokenSSR()()
export default withAuthUser({
  
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Modulo)