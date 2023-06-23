import { Button, Grid, Icon, Typography } from "@mui/material";
import { fuego, useDocument } from "@nandorojo/swr-firestore";
import Form from "@components/website/_form";
export default function home() {
  const { data: sitio, set } = useDocument(
    `website/${fuego.auth().currentUser?.uid}`,
    { listen: true }
  );
  const crearSitio = () => {
    set({
      nombre: "Mi Sitio",
      descripcion: "Descripcion de mi sitio",
      idUsuario: fuego.auth().currentUser?.uid,
    });
  };
  const onSave = () => {
    console.log(`onSave`);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h3">
          <Icon className="fab fa-chrome" /> CONFIGURACION DE WEBSITE
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {sitio && sitio.exists && (
          <>
            <Form data={sitio} callbackSuccess={onSave} fnUpdate={set} />
          </>
        )}
        {sitio && !sitio.exists && (
          <>
            <Typography variant="h5">No hay sitio configurado</Typography>
            <Button
              onClick={crearSitio}
              variant="outlined"
              color="primary"
              size="small"
            >
              <Icon className="fas fa-plus" /> Crear Sitio
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}
