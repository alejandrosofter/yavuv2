import * as yup from 'yup';

export default function ModeloClientes(){
    return yup.object().shape({
        nombre: yup.string().required(),
        apellido: yup.string().required(),
        razonSocial: yup.string(),
        cuit: yup.string(),
        tipo: yup.string(),

      });
}
export function valoresIniciales(){
    return {
        nombre: "",
        apellido: "",
        razonSocial: "",
        cuit: "",
        tipo: "",
    }
}