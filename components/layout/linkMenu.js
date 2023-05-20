import { Icon, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

export function LinkMenu({ data, key, callbackClick, field }) {
  const close = () => {
    if (callbackClick) callbackClick();
    console.log("close");
  };
  const campoLabel = field ? field : "label_idModulo";
  return (
    <Link passHref key={key} href={`/${data.nombreModulo}`}>
      <ListItem onClick={close.bind(this, data)} button>
        <ListItemIcon>
          <Icon className={data.icono} />
        </ListItemIcon>

        <ListItemText primary={data[campoLabel]} />
      </ListItem>
    </Link>
  );
}
