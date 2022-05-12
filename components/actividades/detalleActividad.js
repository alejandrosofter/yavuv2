import { Typography } from "@mui/material";

export function DetalleActividad({item}) {
    if(!item)return "Cargando..."
    return (
        <div>
            <Typography sx={{fontWeight:900}} variant="caption">{item.nombreActividad?.toUpperCase()}</Typography>
        </div>
    )
}