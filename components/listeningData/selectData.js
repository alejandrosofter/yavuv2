import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import {
  Button,
  Stack,
  Typography,
  Grid,
  Icon,
  IconButton,
} from "@mui/material";
import DialogContenido from "@components/forms/dialogContenido";
import { findPath, getPath } from "@helpers/objects";
import { useState } from "react";
const data = {
  id: "root",
  name: "Parent",
  children: [
    {
      id: "1",
      name: "Child - 1",
    },
    {
      id: "3",
      name: "Child - 3",
      children: [
        {
          id: "4",
          name: "Child - 4",
        },
      ],
    },
  ],
};

export default function SelectData({
  label,
  campo,
  callbackchange,
  setFieldValue,
  Form,
  values,
}) {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState("root");
  const [seleccion, setSeleccion] = React.useState(false);
  const campoId = "id";
  const campoPath = "path";
  const campoLabel = (item) =>
    !item.campoLabel
      ? `root`
      : `${item.nombre} | ${item.campoValue} --> ${item.campoLabel}`;
  const renderTree2 = (nodes) => {
    // console.log(nodes);
    if (nodes)
      if (Object.keys(nodes).length > 0)
        return (
          <TreeItem
            key={nodes[campoId]}
            nodeId={nodes[campoId]}
            onClick={clickItem.bind(this, nodes)}
            onDoubleClick={clickItemChild.bind(this, nodes)}
            label={
              typeof campoLabel === "function"
                ? campoLabel(nodes)
                : `${nodes[campoLabel]}`
            }
          >
            {Array.isArray(nodes.children)
              ? nodes.children.map((node) => renderTree2(node))
              : null}
          </TreeItem>
        );
  };

  const callbackacepta = () => {
    setOpen(false);
  };
  const setearPath = (path) => {
    let auxPath = "items";
    //loop object items
    for (const item in values.items) {
      if (item.id == path.id) {
        setPath(item);
      }
    }
  };
  const clickAddRoot = () => {
    const path = `${campo}`;
    setFieldValue(`${path}.${campoId}`, new Date().getTime());
    setPath(`${path}`);
    setOpen(true);
  };
  const clickItemChild = (data) => {
    const path = `${campo}`;
    setFieldValue(`${path}.${campoId}`, new Date().getTime());
    setPath(`${path}`);
    setOpen(true);
  };
  const clickItem = (data) => {
    setSeleccion(data);
  };

  return (
    <Grid container>
      <Grid item xs={1}>
        <IconButton onClick={clickAddRoot} size="small" color="primary">
          <Icon className="fas fa-plus" />
        </IconButton>
      </Grid>
      <Grid item xs={11}>
        <TreeView
          // onClick={clickItem}
          defaultCollapseIcon={<ExpandMoreIcon />}
          // defaultExpanded={["root"]}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          {renderTree2(values[campo])}
        </TreeView>
      </Grid>

      <DialogContenido open={open} setOpen={setOpen} titulo={label}>
        <Form
          root={!seleccion ? true : false}
          seleccion={seleccion}
          values={values}
          path={path}
          campo={campo}
          callbackacepta={callbackacepta}
        />
      </DialogContenido>
    </Grid>
  );
}
