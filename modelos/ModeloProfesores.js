import * as yup from 'yup';

export default function ModeloProfesores(){
    return yup.object().shape({
        nombre: yup.string().required(),
        apellido: yup.string().required(),
        dni: yup.string().required(),
        telefono: yup.string(),
        createdOn: yup.date().default(function () {
            return new Date();
          }),
       
        
      });
}
export function valoresIniciales(){
    return {
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
    }
}