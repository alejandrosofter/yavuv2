import ModuloIndexCard from "../ModuloIndex";
import VistaItemCard from "./_vistaItemCard";

export default function Modulo({modulo,dataUsuario}) {
 
      return (
      <ModuloIndexCard vistaItem={VistaItemCard} url={`/api/${modulo.nombre}`} modulo={modulo} dataUsuario={dataUsuario} />
 
      )

}