import {
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import Link from "next/link";
import { useCollection, fuego } from "@nandorojo/swr-firestore";

export default function MenuModulos({}) {
  const { data, update, error } = useCollection("mods", {
    where: [
      "idUsuario",
      "==",
      fuego.auth().currentUser ? fuego.auth().currentUser.uid : null,
    ],
    // orderBy: ["fechaClick", "desc"],
    listen: true,
  });

  if (!data) return "Buscando...";

  return (
    <List component="div" disablePadding>
      {data &&
        data.map((items) => (
          <Link passHref key={`link_${items.id}`} href={"/mod/" + items.id}>
            <ListItem button>
              <ListItemIcon>
                <Icon className={items.icono} />
              </ListItemIcon>
              <ListItemText primary={items.label} />
            </ListItem>
          </Link>
        ))}
    </List>
  );
}
