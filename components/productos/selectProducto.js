import { useCollection,fuego } from '@nandorojo/swr-firestore';
import Select2 from "../forms/select2Formik"
export default function Modulo({multiple,label}){
    const {data:productos}=useCollection("productos",{where:["idUsuario","==",fuego.auth().currentUser.uid]})
    if(!productos) return ""
    return(
        <Select2 extraData={["importe"]} multiple={multiple} campo='idProducto' label={label?label:"Producto Asociado"} lista={productos} campoId="id" 
            campoLabel="nombre" />
    )
}