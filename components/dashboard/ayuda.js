import {
  Typography,
  Icon,
  List,
  ListItem,
  IconButton,
  ListItemText,
} from "@mui/material";

export default function Ayuda() {
  const ayuda = [
    {
      titulo: "PRIMEROS PASOS (migracion)",
      detalle: "Explicacion general y pasos a seguir para migracion",
      link: "https://www.youtube.com/watch?v=Ku_SyCbXCpI",
      nro: 1,
    },
    {
      titulo: "INTERFAZ",
      detalle: "Navagacion y explicacion general de la interfaz del usuario",
      link: "https://www.youtube.com/watch?v=W48AFfBF-ok",
      nro: 0,
    },
    {
      titulo: "MODULO DE SOCIOS",
      detalle: " Descripcion general del modulo de socios",
      link: "https://www.youtube.com/watch?v=LczC5alfohY",
      nro: 2,
    },
    {
      titulo: " COMO AFILIAR?",
      detalle: " Paso a paso de como afiliar a nuevo socio",
      link: "https://www.youtube.com/watch?v=24sUnkJ_MMQ",
      nro: 3,
    },
    {
      titulo: "COMO ASIGNAR DEUDA MANUAL?",
      detalle: " Explicacion de la carga de deuda manual",
      link: "https://www.youtube.com/watch?v=a94OFmr3_y0",
      nro: 4,
    },
    {
      titulo: "COMO ASIGNAR DEUDA AUTOMATICA",
      detalle: "   Deja que el sistema trabaje y genera la deuda mes a mes",
      link: "https://www.youtube.com/watch?v=6nne_dF0iWE",
      nro: 5,
    },

    {
      titulo: " COMO COBRAR DEUDA?",
      detalle: "Realiza el cobro de deuda de un socio",
      link: "https://www.youtube.com/watch?v=dbYcvUf6wWQ",
      nro: 6,
    },
    // {
    //   titulo: "IMPRESION DE CREDENCIALES",
    //   detalle: "     Envia un paquete de credenciales",
    //   link: "https://youtu.be/_Ffg1Fz6y_E",
    //   nro: 7,
    // },
    {
      titulo: "ACTIVIDADES",
      detalle: "Manejo de actividades y grupos",
      link: "https://www.youtube.com/watch?v=A0Z7nsn42eM",
      nro: 7,
    },
    // {
    //   titulo: "ASISTENCIAS",
    //   detalle: "Carga y cierre de asistencias",
    //   link: "https://youtu.be/_Ffg1Fz6y_E",
    //   nro: 9,
    // },
    // {
    //   titulo: "GENERACION DE DEUDA",
    //   detalle: "Automatizacion de la generacion de deuda",
    //   link: "https://youtu.be/_Ffg1Fz6y_E",
    //   nro: 9,
    // },
    // {
    //   titulo: "CREAR ARCHIVO A BANCO",
    //   detalle: "Como crear y enviar archivo a bancos por debitos automaticos",
    //   link: "https://youtu.be/_Ffg1Fz6y_E",
    //   nro: 10,
    // },
  ];
  const clickLink = (item) => {
    window.open(item.link, "_blank");
  };
  return (
    <>
      <Typography variant="h5" gutterBottom>
        <Icon sx={{ fontSize: 20 }} className="fas fa-video" />
        AYUDA
      </Typography>
      <List dense={true}>
        {ayuda.map((item) => (
          <ListItem
            key={item.nro}
            secondaryAction={
              <IconButton
                onClick={clickLink.bind(this, item)}
                aria-label="go"
                edge="end"
              >
                <Icon className="fas fa-video" />
              </IconButton>
            }
          >
            <ListItemText primary={item.titulo} secondary={item.detalle} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
