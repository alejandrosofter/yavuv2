import DialogContenido from "@components/forms/dialogContenido";
import { Grid, Typography } from "@mui/material";

export default function LinkTradingView({ open, setOpen, row }) {
  const token = "piteroski1984**";
  if (!row) return null;
  return (
    <DialogContenido
      open={open}
      setOpen={setOpen}
      titulo={"LINK PARA TRADING VIEW"}
    >
      <Grid container>
        <Grid item md={12}>
          <Typography variant="h5">SHORT</Typography>
          <Typography variant="body">
            Condicion: DMI -DI cruce hacia arriba DMI +DI cruce hacia abajo (una
            vez por barra) y poner en URL WEBHOOk:
          </Typography>
          <Grid item md={12}>
            <Typography variant="caption">{`${process.env.URL_FUNCTIONS}/trading-goOperationPosition?token=${token}&evento=short&id=${row.id}`}</Typography>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5">LONG</Typography>
          <Typography variant="body">
            Condicion: DMI +DI cruce hacia arriba DMI -DI cruce hacia abajo (una
            vez por barra) y poner en URL WEBHOOk:
          </Typography>
          <Grid item md={12}>
            {" "}
            <Typography variant="caption">{`${process.env.URL_FUNCTIONS}/trading-goOperationPosition?token=${token}&evento=long&id=${row.id}`}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
