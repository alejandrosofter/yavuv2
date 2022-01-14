import { useRouter } from "next/router";
import useSWR from "swr";import Loader from "./loader";
import _FormGenerico from "./_formGenerico";

export default function EditarGenerico({urlRegistro,token, callbackSuccess,auth,dataCuenta,modulo,urlAcepta,modelo,valoresIniciales,mutateIndex,esNuevo,children,idItem}){
    const router=useRouter();
    
    
        const url=modulo?(`/api/${modulo.nombre}/${idItem?idItem:router.query.idItem}` ):urlRegistro

      const { data, mutate,isValidating } = useSWR(url)
      if(!data)return "Cargando data registro..."
    console.log(data)
    return(
      <_FormGenerico token={token} callbackSuccess={callbackSuccess} auth={auth} dataCuenta={dataCuenta} 
      urlAcepta={urlAcepta} esNuevo={esNuevo} idItem={idItem} mutateRegistro={mutate} mutateIndex={mutateIndex} 
      datos={data} modelo={modelo} modulo={modulo} valoresIniciales={valoresIniciales} >
          {children}
      </_FormGenerico>
    )
}