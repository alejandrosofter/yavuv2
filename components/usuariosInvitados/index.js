import ModuloIndexCard from "../ModuloIndex";
import VistaItemCard from "./_vistaItemCard";

export default function Modulo({modulo,dataUsuario,token}) {
 
      return (
      <ModuloIndexCard token={token} vistaItem={VistaItemCard} url={`/api/${modulo.nombre}`} modulo={modulo} dataUsuario={dataUsuario} />
 
      )

}