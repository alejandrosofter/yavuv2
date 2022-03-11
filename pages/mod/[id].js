import Controlador from "../../components/Controlador";

import { withAuthUserTokenSSR } from 'next-firebase-auth'
export default function Modulo({}){
 
        return(<Controlador url="`${mod.nombre}`"/>)

}


export const getServerSideProps = withAuthUserTokenSSR()()