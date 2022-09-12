import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Button, Grid, Icon, IconButton } from "@mui/material";
import DialogContenido from "@components/forms/dialogContenido";
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

export default function SelectData({ label, campo, callbackchange, Form }) {
  const [open, setOpen] = React.useState(false);
  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <Grid container>
      <Grid item xs={10}>
        <TreeView
          aria-label="rich object"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={["root"]}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 110, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        >
          {renderTree(data)}
        </TreeView>
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={() => setOpen(true)} size="small" color="primary">
          <Icon className="fas fa-plus" />
        </IconButton>
      </Grid>
      <DialogContenido open={open} setOpen={setOpen} titulo={label}>
        <Form />
      </DialogContenido>
    </Grid>
  );
}
