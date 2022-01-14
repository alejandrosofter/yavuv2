import { Typography,Icon,Stack } from '@mui/material';

export default function TitulosFormularios({titulo,subTitulo,icono}){
    

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            
            <Typography sx={{fontWeight: 'bold' }} variant="h3"> <Icon className={icono}/> {titulo}</Typography>
            <Typography variant="h4"> {subTitulo}</Typography>
        </Stack>
    )
}