import { FormControl, Icon,IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";

export default function FormBuscador({label,fnCambia}){
  const [tx,setTx]=useState("")
const cambia=event=>{
  setTx(event.target.value)
    
}
const pesionaTecla=ev=>{
  if (ev.key === 'Enter') {
    if(fnCambia)fnCambia(tx)
    ev.preventDefault();
  }
}
const click=()=>{
  if(fnCambia)fnCambia(tx)
}
    return(
        <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
        <InputLabel htmlFor="tfBusca">{label}</InputLabel>
        <OutlinedInput
          id="tfBusca"
          type={"text"}
          onKeyPress={pesionaTecla}
          onChange={cambia}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={click}
                edge="end"
              >
                <Icon className="fas fa-search"/>
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      </FormControl>
    )
}