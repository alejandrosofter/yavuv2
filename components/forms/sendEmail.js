import {
  Icon,
  Input,
  Button,
  Backdrop,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";
import DialogContenido from "./dialogContenido";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import parse from "html-react-parser";
export function SendEmail({
  asunto,
  titulo,
  email,
  open,
  setOpen,
  plantilla,
  attachs,
  html,
  data,
}) {
  const [inputEmail, setInputEmail] = useState();
  useEffect(() => {
    setInputEmail(email);
  }, [email]);
  const [loading, setLoading] = useState(false);
  const { add } = useCollection("emails");

  const [plantillaEmail, setPlantillaEmail] = UsePlantilla({
    id: plantilla,
    data: { ...data, contenido: html },
  });
  const handleSendMail = async () => {
    setLoading(true);
    const data = {
      cuerpo: plantillaEmail,
      attachs,
      fecha: new Date(),
      destinatario: inputEmail,
      asunto,
      estado: "PENDIENTE",
      idUsuario:
        localStorage.getItem("usermod") === fuego.auth().currentUser?.uid
          ? fuego.auth().currentUser.uid
          : localStorage.getItem("usermod"),
    };
    await add(data);
    setLoading(false);
    setOpen(false);
  };
  const cambiaEmail = (event) => {
    setInputEmail(event.target?.value);
  };
  return (
    <DialogContenido
      maxWidth={"lg"}
      titulo={titulo}
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        <Grid item xs={4}>
          <Input
            sx={{ width: "100%" }}
            disabled={loading}
            label="Email"
            value={inputEmail}
            onChange={cambiaEmail}
            name="email"
          />
        </Grid>
        <Grid item xs={4}>
          <Button disabled={loading} onClick={handleSendMail}>
            <Icon className="fas fa-envelope" /> Enviar
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <div
            style={{
              paddingLeft: 80,
              paddingRight: 50,
              paddingTop: 50,
              width: 950,
            }}
          >
            {parse(plantillaEmail)}
          </div>
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
SendEmail.defaultProps = {
  titulo: "ENVIO EMAIL",
};
