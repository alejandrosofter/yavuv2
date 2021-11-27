import { FieldArray,Field } from "formik";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import BotonDialogForm from "./botonDialogFormik";
import { RenderRating, RenderRatingEdit } from "./idModuloEditor";



export default function _itemsUSuariosInvitados({campo,data,newItem,modelo}){
   
  console.log(data)
    return(
        
        <FieldArray name={campo}>
        {(props) =>{
             const clickAceptar=(valores)=>{
              props.push(valores)
              console.log(props)
            }
            return(
            <div style={{ height: 400, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                <BotonDialogForm valoresIniciales={{idModulo:"",habilitado:false}} modelo={modelo} clickAceptar={clickAceptar}/>

             <DataGrid rowHeight={25} components={{
          
        }}
        columns={[
            { field: 'idMod',headerName: 'Modulo',renderCell: RenderRating,
            renderEditCell: RenderRatingEdit,type: 'number',
            editable: true, width: 180,  },
            { field: 'habilitado',headerName: 'Habilitado', width: 120, },
        
        ]}
        rows={data}
      />
      
           
        
          </div>
        </div>
        
      </div>
        )
}}
        
      </FieldArray>
            
    )
}