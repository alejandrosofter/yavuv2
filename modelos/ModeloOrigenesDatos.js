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
        relaciones: yup.array().of(
            yup.object().shape({
              desdeCampo: yup.string().required(),
              hastaCampo: yup.string().required(),
              funcionCorreccion: yup.string(),

            }) )
        
      });
}
export function valoresInicialesRelaciones()
{
    return {
        desdeCampo: "",
        hastaCampo: "",
        funcionCorreccion: ""
    }
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