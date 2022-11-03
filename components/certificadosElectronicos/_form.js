import UploadAnyFormik from "@components/forms/fileAnyUploadFormik";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import { Grid } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";

export default function FormCertificadosElectronicos({ values }) {
  return (
    <Grid spacing={2} container>
      <Grid item md={2}>
        <SelectFecha label="Fecha VTO" campo="fechaVto" />
      </Grid>
      <Grid item md={2}>
        <Input label="CUIT" campo="cuit" />
      </Grid>
      <Grid item md={2}>
        <Input label="Punto Venta" campo="nroPuntoVenta" />
      </Grid>
      <Grid item md={6}>
        {values.estado === "PEDIDO GENERADO" && (
          <UploadAnyFormik
            folder={`certificadosElectronicos/${
              fuego.auth().currentUser?.uid
            }/`}
            label="Certificado"
            campo="certificado"
          />
        )}
      </Grid>
    </Grid>
  );
}
