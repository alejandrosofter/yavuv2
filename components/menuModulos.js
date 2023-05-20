import {
  Collapse,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import Link from "next/link";
import { localstorageParser } from "@helpers/arrays";
import { useContext, useEffect, useState } from "react";
import { Context } from "context/userContext";

export default function MenuModulos({ callbackclick }) {
  const contextoUsuario = useContext(Context);
  const [dataMenu, setDataMenu] = useState([]);
  useEffect(() => {
    const aux = contextoUsuario?.plan?.dataModulos;
    const data2 = localstorageParser("dataMenu");

    if (menusIguales(aux, data2)) setDataMenu(data2);
    else {
      setDataMenu(contextoUsuario?.plan?.dataModulos);
      localstorageParser("dataMenu", contextoUsuario?.plan?.dataModulos);
    }
  }, [contextoUsuario?.plan?.dataModulos]);

  const menusIguales = (data1, data2) => {
    if (!data1 || !data2) return false;
    if (data1.length !== data2.length) return false;
    for (let i = 0; i < data1.length; i++) {
      if (data1[i].label !== data2[i].label) return false;
      if (data1[i].items.length !== data2[i].items.length) return false;
      for (let j = 0; j < data1[i].items.length; j++) {
        if (data1[i].items[j].label !== data2[i].items[j].label) return false;
      }
    }
    return true;
  };
  const clickParent = (itemClick) => {
    const aux = dataMenu.map((item) => {
      if (itemClick.grupo === item.grupo) {
        item.open = !item.open;
      }
      return item;
    });
    localStorage.setItem("dataMenu", JSON.stringify(aux));

    // if (callbackclick && !itemClick.items) callbackclick(aux);
    setDataMenu(aux);
  };

  // if (!dataMenu || dataMenu.length === 0) return "Cargando...";
  // return "fd";

  return (
    <List>
      {dataMenu?.map((item) => (
        <span key={`${item.grupo}`}>
          <ListItem onClick={clickParent.bind(this, item)}>
            <ListItemIcon>
              <Icon className={item.iconoParent} />
            </ListItemIcon>
            <ListItemText primary={item.nombreGrupo} />
            {item.open ? (
              <Icon className="fas fa-angle-down" />
            ) : (
              <Icon className="fas fa-angle-up" />
            )}
          </ListItem>
          <SubItemsMenu
            callbackclick={callbackclick}
            open={item.open}
            items={item.items}
          />
        </span>
      ))}
    </List>
  );
}

// return (
//   <List component="div" disablePadding>
//     {Object.keys(dataGroup).map((key,data) => (
//       <ListItem key={`menu_${key}`} button>
//         <ListItemIcon>
//           <Icon className={key} />
//         </ListItemIcon>
//         <ListItemText primary={key} />
//       </ListItem>
//     ))}
//   </List>
// );
// }
export function SubItemsMenu({ items, open, callbackclick }) {
  const click = (item) => {
    if (callbackclick) callbackclick(item);
  };
  if (!items) return "";
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      {items.map((item) => (
        <List key={`link_${item.id}`} component="div" disablePadding>
          <Link passHref href={`/${item.nombre}`}>
            <ListItemButton onClick={click.bind(this, item)} sx={{ pl: 4 }}>
              <ListItemIcon>
                <Icon className={item.icono} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </Link>
        </List>
      ))}
    </Collapse>
  );
}
