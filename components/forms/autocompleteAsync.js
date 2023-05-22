import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";

import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
export default function AutoCompleteAsync({
  inputRef,
  datos,
  label,
  loading,
  fnCambia,
  fnClick,
  color = "black",
  defaultValue,
  icono,
  labelItems,
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    let active = true;

    setOptions([...datos]);

    return () => {
      active = false;
    };
  }, [datos]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  const cambiaSeleccion = (item, e) => {
    if (fnClick) fnClick(item, e);
    setOpen(false);
  };
  return (
    <Autocomplete
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
          <li
            {...props}
            key={option.id}
            onKeyDown={cambiaSeleccion.bind(this, option)}
            onClick={cambiaSeleccion.bind(this, option)}
          >
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
          sx={{
            "& label": {
              "&.Mui-focused": {
                color,
              },
            },
          }}
          style={{
            border: `1px solid ${color}`,
            borderRadius: "5px",
            backgroundColor: "white",
            color,
          }}
          onChange={fnCambia}
          defaultValue={defaultValue}
          value={defaultValue}
          inputRef={inputRef}
          autoFocus
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Icon className={icono} />
              </InputAdornment>
            ),

            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
