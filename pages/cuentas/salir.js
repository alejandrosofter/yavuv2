import Controlador from "../../components/Controlador";
import Loader from "../../components/loader"
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  
} from 'next-firebase-auth'
import { useEffect } from "react";

const salir=({})=>{
  const auth = useAuthUser()
  useEffect(() => {
    auth.signOut()
  }, [auth])
  if(auth) return <Loader texto="Saliendo"/>
    return(
      <div></div>
    )

}
export const getServerSideProps = withAuthUserTokenSSR()()
export default withAuthUser({
  
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(salir)