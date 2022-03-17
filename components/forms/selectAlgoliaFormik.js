import * as React from 'react';
import { IconButton,Box, Icon,Typography,Stack} from '@mui/material';

import algoliasearch from 'algoliasearch/lite';
import AutoCompleteAsync from "../forms/autocompleteAsync"

import { Field } from "formik";
import { FormControl,TextField } from "@mui/material";



const SelectFormik = ({label,campo,coleccionAlgolia,callbackchange}) => {
  const [datos, setDatos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const containerRef = React.useRef(null);
  const [showBusca, setShowBusca] = React.useState(false)
  const [labelSelect, setLabel] = React.useState("")
  React.useEffect(()=>{

  },[])
  return (
<FormControl fullWidth>
 

  <Field label={label} name={campo} id={campo} >
    {(props) =>{
      setLabel(`${ props.form.values?.[`label_${campo}`]}`)
      const client = algoliasearch('YEIGHXO1BF', '0e2670dbc0a23a0a5da70aef369d176b');
      const index = client.initIndex(coleccionAlgolia);
  // setSeleccion({lab})
    const cambia=e=>{
        setLoading(true)
        
        // props.form.values.label_cliente
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
    const clickLabel=()=>{
      setShowBusca(!showBusca)
    }
    const fnClick=(item,e)=>{

      if(callbackchange)callbackchange(item)
      props.form.setFieldValue(`${campo}`,`${item.objectID}`);
      props.form.setFieldValue(`label_${campo}`,`${item.apellido.toUpperCase()} ${item.nombre}`);
      setLabel(`${item.apellido.toUpperCase()} ${item.nombre}`)
      setShowBusca(!showBusca)
      
    }
  const labelItems=(option)=>`${option.nombre} ${option.apellido} (${option.dni})`
       
    return( 
      <Box>
          <Box sx={{ display: 'flex' }}>
          <Stack direction="row" spacing={2} sx={{ width:"100%", display:`${showBusca?'':'none'}`}}>
            <AutoCompleteAsync  icono="fas fa-user"  label="Cliente" fnCambia={cambia} fnClick={fnClick} 
        loading={loading} datos={datos} labelItems={labelItems} /> 
        <IconButton  onClick={clickLabel} size="small" variant="outlined"><Icon className="fas fa-times"/></IconButton>
        </Stack>
      </Box>
                
      <Stack  justifyContent="center"
  alignItems="center" direction="row" spacing={1} sx={{ width:"100%", display:`${!showBusca?'':'none'}`}}>
        <Typography sx={{pt:1}} variant="h5" >{labelSelect}</Typography>
        <IconButton  onClick={clickLabel} size="small" variant="outlined"><Icon className="fas fa-pencil"/></IconButton>
      </Stack>
      </Box>
    )
    }}
    </Field>
    <Field type="hidden" name={`label_${campo}`} id={`label_${campo}`} />
    
</FormControl>
  )
      }

export default SelectFormik;
