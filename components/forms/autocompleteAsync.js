import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import InputAdornment from '@mui/material/InputAdornment';
import Icon from '@mui/material/Icon';

import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
export default function AutoCompleteAsync({datos,label,loading,fnCambia,fnClick,icono,labelItems}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
console.log(datos)
  React.useEffect(() => {
    let active = true;

   
    setOptions([...datos]);
    console.log(options)
    return () => {
      active = false;
    };
  }, [datos]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  const cambiaSeleccion=(item,e)=>{
  setOpen(false)
    fnClick(item,e)
  }
  return (
    <Autocomplete
   fullWidth
      open={open}
      
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      
      getOptionLabel={(option) => labelItems(option)}
      options={datos}
      
      loading={loading}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(labelItems(option), inputValue);
        const parts = parse(labelItems(option), matches);

        return (
          <li {...props} key={option.id} onKeyDown={cambiaSeleccion.bind(this,option)} onClick={cambiaSeleccion.bind(this,option)}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    //   renderOption={(props, option) => (
    //     <li {...props} key={option.id} onKeyDown={cambiaSeleccion.bind(this,option)} onClick={cambiaSeleccion.bind(this,option)}> 
    //    {labelItems(option)}
    //   </li>
    //   )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          onChange={fnCambia}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Icon className={icono}/></InputAdornment>,
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
