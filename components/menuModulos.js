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
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { groupBy, localstorageParser, orderArray } from "@helpers/arrays";
import { useEffect, useState } from "react";

export default function MenuModulos({}) {
  const [dataMenu, setDataMenu] = useState(localstorageParser("dataMenu"));

  const { data, update, error } = useCollection("mods", {
    where: [
      "idUsuario",
      "==",
      fuego.auth().currentUser ? fuego.auth().currentUser.uid : null,
    ],
    orderBy: ["label_grupo", "asc"],
    listen: true,
  });
  useEffect(() => {
    getDataMenu(data)
      .then((data) => {
        const data2 = localstorageParser("dataMenu");

        if (menusIguales(data, data2)) setDataMenu(data2);
        else {
          setDataMenu(data);
          localstorageParser("dataMenu", data);
        }

        // setDataMenu(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);
  const menusIguales = (data1, data2) => {
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
  const getDataMenu = async (data) => {
    if (!data) return [];
    const dataGroup = groupBy(data, (item) => item.grupo);
    let salida = [];
    for (let [grupo, value] of dataGroup) {
      const dataMenu = await getDataMenuGrupo(grupo);
      salida.push({
        grupo,
        items: orderArray(value ? value : [], "label"),
        iconoParent: dataMenu.icon,
        nombreGrupo: dataMenu.label.toUpperCase(),
        open: false,
      });
    }
    return salida;
  };
  const clickParent = (itemClick) => {
    const aux = dataMenu.map((item) => {
      if (itemClick.grupo === item.grupo) {
        item.open = !item.open;
      }
      return item;
    });
    localStorage.setItem("dataMenu", JSON.stringify(aux));
    setDataMenu(aux);
  };
  const getDataMenuGrupo = async (idMenuGrupo) => {
    const refMenu = await fuego.db
      .collection("menuGrupos")
      .doc(idMenuGrupo)
      .get();
    return refMenu.data();
  };
  if (!dataMenu) return "Buscando...";

  return (
    <List component="div" disablePadding>
      {dataMenu.map((item) => (
        <>
          <ListItem
            onClick={clickParent.bind(this, item)}
            key={`${item.grupo}`}
            button
          >
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
          <SubItemsMenu open={item.open} items={item.items} />
        </>
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
export function SubItemsMenu({ items, open }) {
  if (!items) return "";
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      {items.map((item) => (
        <List key={`link_${item.id}`} component="div" disablePadding>
          <Link passHref href={"/mod/" + item.id}>
            <ListItemButton sx={{ pl: 4 }}>
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
