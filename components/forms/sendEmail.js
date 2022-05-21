import { Icon, Input, Button, Backdrop, CircularProgress } from "@mui/material";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { useState } from "react";
import DialogContenido from "./dialogContenido";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import parse from "html-react-parser";
export function SendEmail({
  nombrePlantilla,
  asunto,
  titulo,
  email,
  open,
  setOpen,
  data,
  attachs,
}) {
  const [inputEmail, setInputEmail] = useState(email);
  const [loading, setLoading] = useState(false);
  const { add } = useCollection("emails");
  const [plantilla, setPlantilla] = UsePlantilla({
    nombre: nombrePlantilla,
    data: data,
  });
  const handleSendMail = async () => {
    setLoading(true);
    const data = {
      cuerpo: plantilla,
      attachs,
      fecha: new Date(),
      destinatario: inputEmail,
      asunto,
      estado: "PENDIENTE",
      idUsuario: fuego.auth().currentUser.uid,
    };

    await add(data);
    setLoading(false);
    setOpen(false);
  };
  return (
    <DialogContenido
      maxWidth={"lg"}
      titulo={titulo}
      open={open}
      setOpen={setOpen}
    >
      <Input
        disabled={loading}
        label="Email"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
        name="email"
      />
      <Button disabled={loading} onClick={handleSendMail}>
        <Icon className="fas fa-envelope" /> Enviar
      </Button>
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
        {parse(plantilla)}
      </div>
    </DialogContenido>
  );
}
SendEmail.defaultProps = {
  titulo: "ENVIO EMAIL",
};
