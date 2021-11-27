import * as yup from 'yup';

export default function ModeloUsuariosInvitados(){
    return yup.object().shape({
        email: yup.string().required(),
        estado: yup.boolean(),
          mods: yup.array().of(
            yup.object().shape(ModeloMods()) )
        
      });
}
function ModeloMods(){
return {
              idMod: yup.string().required("Es requerido "),
            //   data: yup.string().required("Es requerido"),
             esUnicoRegistro: yup.boolean()

            }
}
export function valoresIniciales(){
    return {
        email: "",
        estado: "",
        mods: [],
    }
}