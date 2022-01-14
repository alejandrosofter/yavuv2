import ModuloABM from "../forms/moduloABM";

export default function Modulo({token,modulo}) {
    const pathItem="profesores/_vistaItem.js"
      return (
      <ModuloABM token={token} modulo={modulo} pathItem={pathItem} />
 
      )

}