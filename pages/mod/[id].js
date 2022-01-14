import Controlador from "../../components/Controlador";
import {withAuthUser} from 'next-firebase-auth'
import { callAuthToken } from "../../helpers/auth";
import { ContextoMods } from "../../context/modsContext";


const Modulo=({tokenServer,modulo,mod})=>{

    return(
   
        <Controlador pathComponente="${modulo.nombre}" tokenServer={tokenServer} modulo={modulo} mod={mod}/>
 
    )

}

export const getServerSideProps = callAuthToken()
export default withAuthUser()(Modulo)