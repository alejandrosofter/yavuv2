import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSimple({label,lista,fn,valorInicial,campoId,campoLabel,campoValue}) {

  const handleChange = (event) => {
    if(fn)fn(event.target.value)
  }
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`label_${label}`}>{label}</InputLabel>
        <Select
          labelId={`label_${label}`}
          label={label}
       
          defaultValue={valorInicial}
          onChange={handleChange}
        >
            {lista && lista.map(item=>
                <MenuItem key={item[campoId?campoId:"id"]} value={item[campoValue?campoValue:'value']}>{item[campoLabel?campoLabel:'label']}</MenuItem>
            )
            }
        </Select>
      </FormControl>
    </Box>
  );
}