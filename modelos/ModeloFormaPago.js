import * as yup from 'yup';
import {fuego} from '@nandorojo/swr-firestore'
export default function ModeloFormaPago(){
    return yup.object().shape({
        nombreFormaPago: yup.string().required(),
      });
}
export function valoresIniciales(){
    return {
        nombreFormaPago: "",
        estado:"ACTIVO",
        idUsuario:fuego.auth().currentUser.uid
    }
}