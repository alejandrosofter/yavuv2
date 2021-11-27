import { useRouter } from "next/router";
import _FormGenerico from "./_formGenerico";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function NuevoGenerico({modulo,urlAcepta,modelo,valoresIniciales,mutateIndex,children}){
    const router=useRouter();

    
    return(
      <_FormGenerico urlAcepta={urlAcepta} mutateIndex={mutateIndex} 
     modelo={modelo} modulo={modulo} valoresIniciales={valoresIniciales} >
          {children}
      </_FormGenerico>
    )
}