import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton, Collapse } from "@mui/material";

export default function ListaSimple({
  items,
  campoId = "id",
  fnRender,
  onClick,

  subCampo,
  campoLabelSubCampo,
  onClickSubItem,
  ComponentSecondaryAction,
}) {
  if (!items) return "Cargando...";
  // const [opens, setOpens] = React.useState([]);
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {items.map((value) => {
        return (
          <div key={value[campoId]}>
            <ListItem
              disableGutters
              secondaryAction={
                typeof ComponentSecondaryAction === "function"
                  ? ComponentSecondaryAction(value)
                  : ComponentSecondaryAction
              }
            >
              <ListItemButton
                disabled={value.disabled}
                onClick={onClick ? onClick.bind(this, value) : null}
              >
                <ListItemText primary={fnRender(value)} />
              </ListItemButton>
            </ListItem>
            {subCampo &&
              value[subCampo] &&
              value[subCampo].map((subItem) => (
                <Collapse
                  key={`item_${subItem.id}`}
                  in={open}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItemButton
                      onClick={
                        onClickSubItem
                          ? onClickSubItem.bind(this, subItem, value)
                          : null
                      }
                      sx={{ pl: 4 }}
                    >
                      <ListItemText
                        primary={
                          typeof campoLabelSubCampo === "function"
                            ? campoLabelSubCampo(subItem)
                            : subItem[campoLabelSubCampo]
                        }
                      />
                    </ListItemButton>
                  </List>
                </Collapse>
              ))}
          </div>
        );
      })}
    </List>
  );
}
