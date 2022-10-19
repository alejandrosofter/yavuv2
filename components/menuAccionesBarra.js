import { Button, Icon, Stack } from "@mui/material";
import ThemeContext from "context/accionesContext";
import ContextAcciones, { ContextoAcciones } from "context/accionesContext";
import Link from "next/link";
import randomId from "random-id";
import { useContext } from "react";
import { getLinkUrl } from "../helpers/Strings";

export default function MenuAccionesBarra({ mod }) {
  const acciones = mod?.acciones ? mod.acciones : [];

  return (
    <Stack direction="row" spacing={2}>
      {acciones &&
        acciones.map((item) => {
          if (!item.esRegistro)
            if (!item.esFuncion)
              return (
                <Link
                  key={randomId(2)}
                  passHref
                  href={getLinkUrl(item.url, mod, null)}
                >
                  <Button sx={{ color: "white" }}>
                    <Icon sx={{ fontSize: 15, mr: 1 }} className={item.icono} />{" "}
                    {item.label}
                  </Button>
                </Link>
              );
            else {
              //es funcion
              return (
                <Button sx={{ color: "white" }}>
                  <Icon sx={{ fontSize: 15, mr: 1 }} className={item.icono} />{" "}
                  {item.label}
                </Button>
              );
            }
        })}
    </Stack>
  );
}
