import TitulosFormularios from "@components/forms/tituloFormularios";
import { Grid } from "@mui/material";
import FiltroInformeCobros from "./_filterInforme";

export default function InformesCobros({ mod }) {
  return (
    <Grid container>
      <Grid item md={12}>
        <TitulosFormularios
          icono={"fas fa-scroll"}
          titulo="INFORMES"
          subTitulo="de cobros"
        />
      </Grid>
      <Grid item md={12}>
        <FiltroInformeCobros
          valoresIniciales={{ fechaDesde: new Date(), fechaHasta: new Date() }}
        />
      </Grid>
    </Grid>
  );
}
