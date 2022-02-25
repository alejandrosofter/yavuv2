import SubColeccionColeccion from "../forms/subColeccion/";
export default function ClubesProfesores({data,token})
{
    const campo="profesores"
    
    const accionesExtra=(params)=>{

      return(
        [
       
    
        ]
      )
    }
     
    


     
    const colsProfes = [
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 180,
          },
          {
            field: 'apellido',
            headerName: 'Apellido',
            width: 280,
          }
    ]
    return(
        <SubColeccionColeccion accionesExtra={accionesExtra} token={token} 
        urlAcepta={`/api/clubes/abmItem?subColeccion=profesores`}   titulo="PROFESORES" 
        pathFormulario="clubes/_formProfesores" columns={colsProfes} registro={data}
        campo={campo} icono="fas fa-user-graduate"/>
        
    )
                  
}