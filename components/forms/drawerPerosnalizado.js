import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
export default function DrawerPersonalizado({
  anchor,
  open,
  setOpen,
  children,
  width = 250,
}) {
  const [useState, setState] = React.useState();
  const toggleDrawer = (open) => () => {
    setOpen(open);
  };
  return (
    <React.Fragment key={anchor}>
      <Drawer anchor={anchor} open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width }} role="presentation">
          {children}
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
