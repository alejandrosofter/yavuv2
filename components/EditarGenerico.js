import { useRouter } from "next/router";
import useSWR from "swr";
import Loader from "./loader";
import _FormGenerico from "./_formGenerico";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function EditarGenerico({modulo,urlAcepta,modelo,valoresIniciales,mutateIndex,esNuevo,children}){
    const router=useRouter();
    
    
      const url=`/api/${modulo.nombre}/${router.query.idItem}` 
      const { data, mutate,isValidating } = useSWR(url, fetcher)
      if(!data)return <Loader/>
    
    return(
      <_FormGenerico urlAcepta={urlAcepta} esNuevo={esNuevo} mutateRegistro={mutate} mutateIndex={mutateIndex} 
      datos={data} modelo={modelo} modulo={modulo} valoresIniciales={valoresIniciales} >
          {children}
      </_FormGenerico>
    )
}