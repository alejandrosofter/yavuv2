import ModuloIndexCard from "../ModuloIndex";
import VistaItemCard from "./_vistaItemCard";

export default function Modulo({modulo,token,dataUsuario}) {
 
      return (
      <ModuloIndexCard token={token} vistaItem={VistaItemCard} url={`/api/${modulo.nombre}`} modulo={modulo}  />
 
      )

}
Modulo.auth = true