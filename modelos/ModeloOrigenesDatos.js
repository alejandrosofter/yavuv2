import * as yup from 'yup';

export default function ModeloOrigenesDatos(){
    return yup.object().shape({
        nombre: yup.string().required(),
        host: yup.string(),
        port: yup.string(),
        user: yup.string(),
        pass: yup.string(),
        esDefecto:yup.boolean(),
        createdOn: yup.date().default(function () {
            return new Date();
          }),
        
      });
}
export function valoresIniciales(){
    return {
        nombre: "",
        host: "",
        port: "",
        user: "",
        pass: "",
        esDefecto: "",
    }
}