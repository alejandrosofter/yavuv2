import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import MobileDatePicker from '@mui/lab/MobileDatePicker';
export default function SelectorFechaSimple({callbackChange,format,label}) {
  const [value, setValue] = React.useState(
    new Date(),
  )
  const handleChange = (newValue) => {
    setValue(newValue)
    if(callbackChange)callbackChange(newValue)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
       
        <MobileDatePicker
          label={label?label:"Fecha"}
          inputFormat={format?format:"dd/MM/yyyy"}
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        
      </Stack>
    </LocalizationProvider>
  );
}
