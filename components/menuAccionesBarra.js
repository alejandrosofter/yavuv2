import { Button, Icon, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MenuAccionesBarra({ acciones = [], sx }) {
  const router = useRouter();
  const esMismaUrl = (url) => {
    //router.pathname con la forma /pacientes/ficha/[id]
    //url con la forma /pacientes/ficha/1
    if (router.pathname.indexOf("[") > 0)
      return (
        url.indexOf(
          router.pathname.substring(0, router.pathname.indexOf("[") - 1)
        ) >= 0
      );

    return router.pathname === url;
  };
  return (
    <Stack sx={sx} direction="row" spacing={2}>
      {acciones &&
        acciones.map((item) => (
          <Link key={item.url} passHref href={item.url}>
            <Button disabled={esMismaUrl(item.url)} sx={{ color: "white" }}>
              <Icon sx={{ fontSize: 15, mr: 1 }} className={item.icono} />{" "}
              {item.label}
            </Button>
          </Link>
        ))}
    </Stack>
  );
}
