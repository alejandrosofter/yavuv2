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
import { Context } from "@contexts/userContext";
import { useContext } from "react";
import { LinkMenu } from "./layout/linkMenu";
export default function MenuModulosInvitado({ callbackclick }) {
  const { userInvitado } = useContext(Context);
  if (!userInvitado) return "";
  const data = userInvitado ? userInvitado[0]?.mods : [];
  return (
    <div>
      <Typography variant="caption" sx={{ pl: 2 }}>
        MODULOS COMPARTIDO
      </Typography>
      <List component="div" disablePadding>
        {data &&
          data.map((moduloInvitado) => (
            <LinkMenu
              callbackClick={callbackclick}
              data={moduloInvitado}
              key={`link_${moduloInvitado.nombreModulo}`}
            />
          ))}
      </List>
    </div>
  );
}
