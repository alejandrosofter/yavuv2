import {
    withAuthUserTokenSSR,
  } from 'next-firebase-auth'
import {findOne} from "../config/firebase"
export function callAuthToken(){

    return withAuthUserTokenSSR()(async (props) => {
      const AuthUser=props.AuthUser
      const esMod=props.resolvedUrl.split("/")[1]==="mod"
      let mod,modulo;
      if(esMod){
        mod=await findOne("mods",props.params.id)
        modulo=await findOne("modulos",mod.idModulo)
        modulo.idMod=props.params.id
      }
 
        const token = await AuthUser.getIdToken()
        return {
          props: {
            tokenServer: token,
            modulo:modulo?JSON.stringify(modulo):null,mod:mod?JSON.stringify(mod):null
          }
        }
      })
}