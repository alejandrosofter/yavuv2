import * as yup from 'yup';
import {fuego} from '@nandorojo/swr-firestore'
export default function Modelo(){
    return yup.object().shape({
        nombre: yup.string().required(),

      });
}
export  function ModeloTipoEquipos(){
    return yup.object().shape({
        nombre: yup.string().required(),
        esTrigger: yup.boolean(),
        cadaTiempoEnvia: yup.string(),
        camposEnvia: yup.string()

      });
}
export  function ModeloDisparadores(){
    return yup.object().shape({
        nombre: yup.string().required(),
        canal: yup.string(),

      });
}
export function valoresInicialesDisapradores(){
    return {
        nombre: "",
        canal:""
    }
}
export function valoresIniciales(){
    return {
        nombre: "",
        idUsuario:fuego.auth().currentUser.uid
    }
}