import { CircularProgress, Grid, MenuItem, Tab } from "@mui/material"
import { useEffect, useState } from "react"
import useSWR from "swr"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import _FormItemRelacion from "../importar/_formItemRelacion"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Fetch from "../../../helpers/Fetcher";
export default function SelectorOrigenData({setDatosTodos,setDatoSeleccion,setObjectoSelector,idOrigenDatos,token,pathApiRegistro,urlModulos,nombreModulo,titulo,campoDataModulo,labelDataModulo}){
    const [valorModulo, setValorModulo] = useState();
    
    const [dataRegistro, setDataRegistro] = useState();
    
    const { data:dataModulo} = useSWR(urlModulos)
    const clickItem=(e,p)=>{
        
        setDatoSeleccion(e.target.outerText)
        if(e.target.outerText.trim()=="root"){

          setDatosTodos(dataRegistro.registro)
        }
      }
      const getObjSeleccion=id=>{
        const i=dataModulo.map(item=>item[campoDataModulo]).indexOf(id)
        if(i!=-1)return dataModulo[i]
        return {}
      }
      const handleChangeModulo = (event) => {
      
        setValorModulo(event.target.value);
        setObjectoSelector(getObjSeleccion(event.target.value))
      };
    
      const renderTree = (nodes) =>{
        if(nodes)
          return  (
            <TreeItem  key={nodes.key} nodeId={nodes.key} label={<Typography  style={{ fontSize:12}}>{nodes.key}</Typography>}>
              {Array.isArray(nodes.registro)
                ? nodes.registro  .map((node) => renderTree(node))
                : null}
            </TreeItem>
          )
         }
         const clickTraeRegistro=async e=>{
            const url=`${pathApiRegistro}${valorModulo}?idOrigenDatos=${idOrigenDatos}`
            const data=await Fetch(url,"get",null,token)
        
            setDataRegistro(data)
      
          }
         
    return(
        <Stack spacing={2} sx={{width:400}} md={4}>
        <Typography   style={{ fontSize:17, fontWeight: 'bold' ,m:4}}> {titulo} </Typography>
        <Stack direction="row" spacing={1}>
          
          <FormControl fullWidth>
            <InputLabel>{nombreModulo}</InputLabel>
            <Select
                value={valorModulo}
                label={nombreModulo}
                onChange={handleChangeModulo}
            >
                {dataModulo && dataModulo.map(item=>
                    <MenuItem key={item[campoDataModulo]} value={item[campoDataModulo]}>{item[labelDataModulo]}</MenuItem>
                )}
                
            </Select>
        </FormControl>
          <Button onClick={clickTraeRegistro} variant="contained">GO</Button>
          </Stack>
         
          {dataRegistro && 
            <TreeView onDoubleClick={clickItem}
              aria-label="rich object"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpanded={['root']}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{ height: 310, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            >
              {renderTree(dataRegistro)}
            </TreeView>
          }
                
        </Stack>
    )
}