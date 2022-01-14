import Controlador from "../components/Controlador"
import Loader from "../components/loader"

import Layout from "../components/layout"
import Typography from '@mui/material/Typography';
import InicioHome from "../components/inicio"
import { callAuthToken } from "../helpers/auth";

import { useAuthUser,withAuthUser} from 'next-firebase-auth'
import {useContext} from "react"
import Contexto,{ContextoUsuario} from "../context/userContext"
import {InitUser} from "../hooks/useUser"
import Fetch from "../helpers/Fetcher"
import SwrComponente from "../helpers/swrComponente";

export function Modulo({tokenServer,modulo}){


    return(
        <SwrComponente token={tokenServer} >
            <Layout titulo={"DASHBOARD"} icono={"fas fa-stats"}>
                <InicioHome/>
            </Layout>
        </SwrComponente>
     

      
  
      
    )

}

export const getServerSideProps = callAuthToken()
export default withAuthUser()(Modulo)