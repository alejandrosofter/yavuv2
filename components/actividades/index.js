import ModuloABM from "../forms/moduloABM";
import VistaItemCard from "./_vistaItemCard";

export default function Modulo({token,modulo,dataUsuario,dataCuenta}) {
    const pathItem="actividades/_vistaItemCard.js"
      return (
      <ModuloABM token={token} modulo={modulo} pathItem={pathItem} />
 
      )

}