import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import Layout from './layout'
import EditarMod from './mod/editar';

export default function Controlador({url,mod,esEdicion}){
  let Componente
  if(url.includes("undefined")){
    return (
    <Layout mod={mod}> 
         <div>Cargando Componente .. aguarde por favor</div>
    </Layout>
    )
  }
  if(esEdicion)Componente= EditarMod //<---- ES EDICION DE MOD
    else Componente = dynamic(
        () => import(`./${url}`),
        { loading: ({error,timedOut,isLoading}) => {
          if(isLoading)return "Cargando componente"
          
          if(error)return <p>{`Error al cargal el componente (${error})`}</p> 
          if(timedOut)return <p>Tiempo de espera agotado</p> 
          
        }}
      )

    return(
              <Layout mod={mod}> 
                  {mod && <Componente mod={mod}/>  }
              </Layout>
    )
   

}