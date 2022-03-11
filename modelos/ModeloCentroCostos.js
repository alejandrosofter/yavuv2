import * as yup from 'yup';
import {fuego} from '@nandorojo/swr-firestore'
export default function ModeloCentroCostos(){
    return yup.object().shape({
        nombreCentroCosto: yup.string(),

      });
}
export function valoresIniciales(){
    return {
        nombreCentroCosto: "",
        idUsuario:fuego.auth().currentUser.uid
    }
}