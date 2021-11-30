import { useRouter } from 'next/router'
import {useEffect} from "react"
import Layout from '../components/layout'
import Loader from '../components/loader'
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import useSWR from 'swr'
import NuevaCuenta from '../components/cuentas/nuevo'
import Typography from '@mui/material/Typography'
const fetcher = (url) => fetch(url).then((res) => res.json())

const Home=()=> {

  const auth = useAuthUser()
  const url=`/api/cuentas/${auth.id}` 
  const { data, mutate } = useSWR(url, fetcher)
  if(!data)return <Loader texto="Cargando usuario"/>

  console.log(data)
 const dataInicial=()=>({idUsuario:auth.id,nombre:auth.displayName,email:auth.email,telefono:auth.phoneNumber})
 

      return (
      <Layout dataCuenta={data} auth={auth} acciones={[]} titulo={`DASHBOARD ${auth.displayName?auth.displayName:""}`}>
        {!data.nombre &&
        <div>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }} color="initial">BIENVENIDO A YAVU!</Typography>
          <Typography variant="h5" sx={{ fontWeight: '' }} color="initial">Por favor completa los datos para acceder a los modulos!</Typography>
          <NuevaCuenta valoresIniciales={dataInicial} idUsuario={auth.id} dataUsuario={{}} modulo={{nombre:"NUEVA CUENTA"}} />

        </div>
        }
        {data.nombre &&
        <div>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }} color="initial">{`Hola ${data.nombre}!`}</Typography>
        <Typography variant="h5" sx={{ fontWeight: '' }} color="initial">Tenes un perfil con un plan, podes acceder a los modulos de tu plan en el menu izquierdo.</Typography>

        </div>
        }
      </Layout>
      )
  
  return (
    <></>
  )
}
export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser({
  
  whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home)