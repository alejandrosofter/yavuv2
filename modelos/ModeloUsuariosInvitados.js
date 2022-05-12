import * as yup from 'yup';
import {fuego} from '@nandorojo/swr-firestore'
export default function ModeloUsuariosInvitados(){
    return yup.object().shape({
        email: yup.string().required(),
        estado: yup.boolean(),
          // mods: yup.array().of(
          //   yup.object().shape(ModeloMods()) )
        
      });
}
export function ModeloMods(){
  return yup.object().shape({
    idMod: yup.string().required("Es requerido "),
     esUnicoRegistro: yup.boolean()
    
  });
}

export function valoresIniciales(){
    return {
        email: "",
        estado: "",
        mods: [],
        idUsuario:fuego.auth().currentUser.uid
    }
}

export function valoresInicialesItems()
{
  return {
        mod: "",
        estado: ""
  }
}