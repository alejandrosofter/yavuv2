import * as yup from 'yup';

export default function ModeloUsuariosInvitados(){
    return yup.object().shape({
        email: yup.string().required(),
        estado: yup.boolean(),
          // mods: yup.array().of(
          //   yup.object().shape(ModeloMods()) )
        
      });
}
export function ModeloMods(){
  return yup.object().shape({
    idMod: yup.string().required("Es requerido "),
     esUnicoRegistro: yup.boolean()
    
  });
}

export function valoresIniciales(){
    return {
        email: "",
        estado: "",
        mods: [],
    }
}

export function valoresInicialesItems()
{
  return {
        mod: "",
        estado: ""
  }
}