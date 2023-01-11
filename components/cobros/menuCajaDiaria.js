import { Icon, IconButton } from "@mui/material";
import { useState } from "react";
import CajaDelDia from "./cajaDelDia";

export default function MenuCajaDiaria({}) {
  const [openCajaDelDia, setOpenCajaDelDia] = useState(false);
  return (
    <>
      <IconButton
        title="Abrir Caja diaria"
        onClick={() => setOpenCajaDelDia(true)}
        sx={{ p: 0 }}
      >
        <Icon sx={{ color: "white" }} className="fas fa-money-check-alt" />
      </IconButton>
      <CajaDelDia open={openCajaDelDia} setOpen={setOpenCajaDelDia} />
    </>
  );
}
