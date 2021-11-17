import * as React from 'react';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { CircularProgress, FormControl,InputLabel } from '@mui/material';
import { Field } from 'formik';



export default function ListaTransferencia({items,campoLabel,campoId,campo,label}) {
  const [valores, setValores] = React.useState([])
  useEffect(() => { 
    var auxLeft=[]
    var auxRight=[]
    items.map(item=>{
        if(valores.indexOf(item[campoId])== -1) auxLeft.push(item)
        else auxRight.push(item)
    })
    setLeft(auxLeft)
    setRight(auxRight)
  }, [valores,campoId,items])

  function not(a, b) { return a.filter((value) => posItem(b,value[campoId]) === false); }

const posItem=(arr,valor)=>{
    
    var i=0
    for (let index = 0; index < arr.length; index++) 
    if(arr[index][campoId]==valor)return arr[index]
    return false
}

const setValoresIniciales=(arr,arrItems)=>{
    var auxLeft=[]
    var auxRight=[]
    arrItems.map(item=>{
        if(arr.indexOf(item[campoId])== -1) auxLeft.push(item)
        else auxRight.push(item)
    })
    setLeft(auxLeft)
    setRight(auxRight)
}

function intersection(a, b) {
    return b.filter((value) => a.indexOf(value[campoId]) !== -1);
}
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([])
  

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const handleToggle = (value) => () => {

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  

  
const getSeleccion=(arr)=>{
    var sal=[]
    for (let index = 0; index < arr.length; index++)sal.push(arr[index][campoId])
    return sal 
}

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 420, overflow: 'auto' }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value[campoId]}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value[campoId])}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value[campoId]) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={campoId} primary={`${value[campoLabel]}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );
  if(!items)return <CircularProgress />
  return (<>
    <FormControl fullWidth>
        <InputLabel id={`${campo}_${label}`}>{`${label}    `}</InputLabel> 
        <Field label={label} name={campo} id={campo} > 
        {(props) =>{
            // useEffect(() => {
            //     setValoresIniciales(props.field.value?props.field.value:[])
                
            // }, [])
            setValores(props.field.value)
            const handleCheckedLeft = () => {
                setLeft(left.concat(rightChecked));
                setRight(not(right, rightChecked));
                setChecked(not(checked, rightChecked));
                
                props.form.setFieldValue(campo,getSeleccion(not(right, rightChecked)))
              };
              const handleAllLeft = () => {
                setLeft(left.concat(right));
                setRight([]);
                
                props.form.setFieldValue(campo,[])
              };
              
            const handleAllRight = () => {
                setRight(right.concat(left));
                setLeft([]);
                
                props.form.setFieldValue(campo,getSeleccion(right.concat(left)))
            };

            const handleCheckedRight = () => {

                setRight(right.concat(leftChecked));
                setLeft(not(left, leftChecked));
                setChecked(not(checked, leftChecked));
               
                 props.form.setFieldValue(campo,getSeleccion(right.concat(leftChecked)))
            }

            return(
            <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>{customList(left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleAllRight}
                    disabled={left.length === 0}
                    aria-label="move all right"
                >
                    ≫
                </Button>
                <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                >
                    &gt;
                </Button>
                <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                >
                    &lt;
                </Button>
                <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleAllLeft}
                    disabled={right.length === 0}
                    aria-label="move all left"
                >
                    ≪
                </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>
            </Grid>
            )
      }}
      </Field>
  </FormControl>
  </>)
}
