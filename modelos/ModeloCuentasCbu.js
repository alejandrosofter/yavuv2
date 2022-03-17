import * as yup from 'yup';
import {fuego} from '@nandorojo/swr-firestore'
export default function Modelo(){
    return yup.object().shape({
        titular: yup.string().required(),

      });
}
export function valoresIniciales(){
    return {
        titular: "",
        idUsuario:fuego.auth().currentUser.uid
    }
}