import { useRouter } from "next/router";
import useSWR from "swr";
import Loader from "./loader";
import _FormGenerico from "./_formGenerico";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function EditarGenerico({callbackSuccess,auth,dataCuenta,modulo,urlAcepta,modelo,valoresIniciales,mutateIndex,esNuevo,children,idItem}){
    const router=useRouter();
    
    
      const url=`/api/${modulo.nombre}/${idItem?idItem:router.query.idItem}` 
      console.log(url)
      const { data, mutate,isValidating } = useSWR(url, fetcher)
      if(!data)return <Loader/>
   
    return(
      <_FormGenerico callbackSuccess={callbackSuccess} auth={auth} dataCuenta={dataCuenta} urlAcepta={urlAcepta} esNuevo={esNuevo} idItem={idItem} mutateRegistro={mutate} mutateIndex={mutateIndex} 
      datos={data} modelo={modelo} modulo={modulo} valoresIniciales={valoresIniciales} >
          {children}
      </_FormGenerico>
    )
}