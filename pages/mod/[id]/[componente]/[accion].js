import Controlador from "../../../../components/Controlador"
import {withAuthUser} from 'next-firebase-auth'
import { callAuthToken } from "../../../../helpers/auth";


const Modulo=({tokenServer,modulo,mod})=>{

    return(
        <Controlador pathComponente="${router.query.componente}/${router.query.accion}" 
        tokenServer={tokenServer} modulo={modulo} mod={mod}/>
      
    )

}

export const getServerSideProps = callAuthToken()
export default withAuthUser()(Modulo)