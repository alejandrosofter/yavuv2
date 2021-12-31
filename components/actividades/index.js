import ModuloABM from "../forms/moduloABM";
import VistaItemCard from "./_vistaItemCard";

export default function Modulo({token,modulo,dataUsuario,dataCuenta}) {
    const pathForm="./_form.js"
    const pathItem="./_vistaItemCard.js"
      return (
      <ModuloABM token={token} modulo={modulo} pathItem={pathItem} />
 
      )

}