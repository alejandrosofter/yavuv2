import Grid from '@mui/material/Grid';
import Input from "../forms/input";
import SelectBoot from "@components/bootsWeb/selectBootWeb"
export default function FormItem({mod}){

    return(
   
         <Grid container spacing={2}>

            <Grid item md={5}><SelectBoot/> </Grid>
            
            
          </Grid>
        
       
    )
}