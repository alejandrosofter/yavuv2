import Layout from "../layout";
import _FormModulos from "./_form";
export default function nuevo({modulo,mod}){

    return(
        <>
             <_FormModulos mod={mod} nuevo={true} modulo={modulo} />
        </>
    )
}