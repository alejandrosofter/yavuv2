import React, { useState,useEffect } from "react";
import { Field } from "formik";
import { useTheme } from "@emotion/react";
import { CircularProgress,FormControl,InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import Loader from "../loader";


const MultiSelect = ({label,campo,lista,campoMuestra,campoId}) => {
  const [valoresInicio, setValoresInicio] = useState([])
  useEffect(() => {
    setValores(valoresInicio?valoresInicio:[])
  }, [valoresInicio])
  const theme = useTheme();
const [valores, setValores] = useState([]);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

{/**/}

if(!lista)return <CircularProgress />
  return (<FormControl fullWidth> 
<InputLabel id={`${campo}_${label}`}>{`${label}    `}</InputLabel> 
  <Field label={label} name={campo} id={campo} >
    {(props) =>{
      setValoresInicio(props.field.value)
      const handleChange = (event) => {
      const {  target: { value }, } = event;

      setValores( typeof value === 'string' ? value.split(',') : value, );
      props.form.setFieldValue(campo,value)
      }
      return(
        <Select
        labelId={`${campo}_${label}`}
        {...props}
        label={label}
        multiple
        value={valores}
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
        MenuProps={MenuProps}
      >
        {lista.map((item) => (
          <MenuItem
            key={item[campoId]}
            value={item[campoId]}
          >
            {item[campoMuestra]}
          </MenuItem>
        ))}
      </Select>
      )
    } }
  </Field>
  </FormControl>
)
      }

export default MultiSelect;
