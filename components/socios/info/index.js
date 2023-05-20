import { Stack, Typography } from "@mui/material";

export default function InfoSocio({dataSocio}){

    return(
        <Stack  spacing={0}>
                  <Stack  direction="row" spacing={0}>
                      <Typography sx={{fontWeight:"bold",color:"green"}} variant="overline">NRO SOCIO: </Typography>
                      <Typography variant="overline">{dataSocio.nroSocio}</Typography>
                    </Stack>
                    <Stack  direction="row" spacing={0}>
                      <Typography sx={{fontWeight:"bold"}} variant="overline">DNI: </Typography>
                      <Typography variant="overline">{dataSocio.dni}</Typography>
                    </Stack>
                    <Stack  direction="row" spacing={0}>
                      <Typography sx={{fontWeight:"bold"}} variant="overline">DOMICILIO: </Typography>
                      <Typography variant="overline"> {dataSocio.domicilio}</Typography>
                    </Stack>
                    <Stack  direction="row" spacing={0}>
                      <Typography sx={{fontWeight:"bold"}} variant="overline">CONTACTOS: </Typography>
                      <Typography variant="overline"> {dataSocio.contactos}</Typography>
                      </Stack>
                  </Stack>
    )
}