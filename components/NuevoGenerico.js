import { useRouter } from "next/router";
import _FormGenerico from "./_formGenerico";

export default function NuevoGenerico({token,modulo,urlAcepta,modelo,valoresIniciales,mutateIndex,children}){

    return(
      <_FormGenerico token={token} urlAcepta={urlAcepta} mutateIndex={mutateIndex} 
     modelo={modelo} modulo={modulo} valoresIniciales={valoresIniciales} >
          {children}
      </_FormGenerico>
    )
}