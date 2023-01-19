import {
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
export default function MenuModulosInvitado({ callbackclick }) {
  const { data, update, error } = useCollection("usuariosInvitados", {
    where: ["email", "==", fuego.auth().currentUser?.email],
  });

  if (!data) return "Cargando Menu invitaciones...";
  return (
    <div>
      <Typography variant="caption" sx={{ pl: 2 }}>
        MODULOS COMPARTIDO
      </Typography>
      <List component="div" disablePadding>
        {data &&
          data.map((moduloInvitado) =>
            moduloInvitado.mods.map((items) => (
              <Link
                passHref
                onClick={callbackclick}
                key={`link_${items.idMod}`}
                href={`/mod/${items.idMod}?usermod=${items.idUsuario}`}
              >
                <ListItem button>
                  <ListItemIcon>
                    <Icon className={items.icono} />
                  </ListItemIcon>

                  <ListItemText primary={items.label_idMod} />
                </ListItem>
              </Link>
            ))
          )}
      </List>
    </div>
  );
}
