import * as yup from 'yup';

export default function ModeloFormaPago(){
    return yup.object().shape({
        nombreFormaPago: yup.string().required(),
      });
}
export function valoresIniciales(){
    return {
        nombreFormaPago: "",
        estado:"ACTIVO"
    }
}