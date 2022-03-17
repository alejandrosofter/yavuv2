import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSimple({label,lista,fn}) {

  const handleChange = (event) => {
    if(fn)fn(event.target.value)
  }
console.log
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={`label_${label}`}>{label}</InputLabel>
        <Select
          labelId={`label_${label}`}
          label={label}
          onChange={handleChange}
        >
            {lista && lista.map(item=>
                <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
            )
            }
        </Select>
      </FormControl>
    </Box>
  );
}