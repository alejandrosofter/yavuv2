import Layout from "../layout";
import _FormModulos from "./_form";
import ModeloModulos from "../../modelos/ModeloModulos";
import { valoresIniciales } from "../../modelos/ModeloModulos";

import { useRouter } from "next/router";
import { Icon } from "@mui/material";
import { useEffect } from "react";
import useSWR from "swr";

export default function EditarModulo({modulo}){
    const router=useRouter();
    const url="/api/modulos/"+router.query.idItem 

    const { data, mutate,isValidating } = useSWR(url)

    return(
      <>
           {data && <_FormModulos mutateRegistro={mutate} modulo={modulo} datos={data}/> }
     </>
    )
}
EditarModulo.auth = true