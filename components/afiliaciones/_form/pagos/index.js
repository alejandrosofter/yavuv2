import { Grid } from '@mui/material'
import ItemsCobro from '../../../cobros/_items'

export default function Modulo({mod,setFieldValue,values}){

    return(
        <Grid item md={8}> <ItemsCobro 
         values={values} setFieldValue={setFieldValue} /></Grid>
    )
}