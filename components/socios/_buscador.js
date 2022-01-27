import * as React from 'react';
import { Stack,} from '@mui/material';

import algoliasearch from 'algoliasearch/lite';
import AutoCompleteAsync from "../forms/autocompleteAsync"
const client = algoliasearch('YEIGHXO1BF', '0e2670dbc0a23a0a5da70aef369d176b');
const index = client.initIndex('socios');

export default function BuscadorSociosInput({setSocioSeleccion}){
    const [datos, setDatos] = React.useState([]);
    const [loading, setLoading] = React.useState(false);


  const cambia=e=>{
      setLoading(true)
      index.search(e.target.value, {
        "getRankingInfo": true,
        "analytics": false,
        "enableABTest": false,
        "hitsPerPage": 20,
        "attributesToRetrieve": "*",
        "attributesToSnippet": "*:20",
        "snippetEllipsisText": "…",
        "responseFields": "*",
        "explain": "*",
        "page": 0,
        "facets": [
         "*"
        ]
       }).then(({ hits }) => {
        setDatos(hits);
        setLoading(false)
      })
    // index.search(e.target.value).then(({ hits }) => {
    //   setDatos(hits);
    //   setLoading(false)
    // });
  }
  const fnClick=(item,e)=>{
  
    setSocioSeleccion(item)
  }
const labelItems=(option)=>`${option.nombre} ${option.apellido} ${option.nroSocio} (${option.dni})`
  
    return(
        <Stack sx={6} direction="row" spacing={1}>
           
            <AutoCompleteAsync icono="fas fa-user"  label="BUSCADOR DE SOCIOS" fnCambia={cambia} fnClick={fnClick} 
            loading={loading} datos={datos} labelItems={labelItems} />
          
         
      </Stack>
    )
}