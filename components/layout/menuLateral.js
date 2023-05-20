import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import MenuModulos from "@components/menuModulos";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuModulosInvitado from "@components/menuModulosInvitado";
import { LinkMenu } from "./linkMenu";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MainMenuLateral({
  handleDrawerClose,
  open,
  drawerWidth,
  theme,
}) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader theme={theme} sx={{ pb: 4, pt: 6 }}>
        <Image
          alt="Logo YAVU"
          width="160"
          pl="25"
          height="35"
          src="/images/logoYavu.png"
        />
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <LinkMenu
        data={{
          nombreModulo: "",
          label_idModulo: "Home",
          icono: "fas fa-home",
        }}
        key={`link_home`}
      />
      <MenuModulos callbackclick={handleDrawerClose} />
      <MenuModulosInvitado callbackclick={handleDrawerClose} />
    </Drawer>
  );
}
