import * as yup from 'yup';
import {fuego} from '@nandorojo/swr-firestore'
export default function Modelo(){
    return yup.object().shape({
        nombre: yup.string().required(),
        identificador: yup.string().required(),
      });
}
export function valoresIniciales(){
    return {
        nombre: "",
        identificador: "",
        idUsuario:fuego.auth().currentUser.uid
    }
}