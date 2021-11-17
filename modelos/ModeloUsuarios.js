import * as yup from 'yup';

export default function ModeloUsuarios(){
    return yup.object().shape({
        email: yup.string().required(),
        image: yup.string(),
        name: yup.string(),
        plan: yup.string(),
        createdOn: yup.date().default(function () {
            return new Date();
          }),
      });
}
export function valoresIniciales(){
    return {
        email: "",
        image: "",
        name: "",
        plan: "",
    }
}