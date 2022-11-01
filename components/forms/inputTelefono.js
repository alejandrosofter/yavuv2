import { Grid, Icon } from "@mui/material";
import Input from "./input";
import Switch from "./switch";
import TooltipHtml from "./tooltipHtml";

export default function InputTelefono({ label, campo, callbackchange }) {
  return (
    <Grid spacing={2} container>
      <Grid item md={9}>
        <TooltipHtml label="SOLO CARACTERISTICA + NUMERO EJ. 297888999">
          <Input
            callbackchange={callbackchange}
            label={label ? label : "Teléfono"}
            campo={campo ? campo : "telefono"}
          />
        </TooltipHtml>
      </Grid>
      <Grid item md={3}>
        <Switch
          callbackChange={callbackchange}
          label={<Icon className="fab fa-whatsapp" />}
          campo="tieneWhatsapp"
        />
      </Grid>
    </Grid>
  );
}
