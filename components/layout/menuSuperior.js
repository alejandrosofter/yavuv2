import MenuAccionesBarra from "@components/menuAccionesBarra";
import MenuCuenta from "@components/menuCuenta";
import Link from "next/link";
import { Button, Grid, Icon, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { LinkMenu } from "./linkMenu";
import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Select2Simple from "@components/forms/select2Simple";
import { useCollection } from "@nandorojo/swr-firestore";
export default function MainMenuSuperior({
  open = false,
  handleDrawerOpen,
  auth,
  acciones,
  components,
  drawerWidth,
  theme,
}) {
  if (!auth.id) return "";

  return (
    <AppBar
      //   sx={{ display: auth.id ? `si` : `none` }}
      position="fixed"
      width={drawerWidth}
      open={open}
      theme={theme}
    >
      <Toolbar variant="dense">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>

        {/* <Grid
          container
          item
          md={3}
          alignContent={"center"}
          alignItems={"center"}
        >
          <LinkMenu data={accionHome} key={`link_${accionHome?.label}`} />
        </Grid> */}
        {/* <Link key={`/home`} passHref href={`/`}>
          <Button sx={{ color: "#fff", mr: 3, pl: 2, pr: 2 }}>
            <Icon sx={{ fontSize: 15, mr: 1 }} className={`fas fa-home`} /> home
          </Button>
        </Link> */}
        <MenuAccionesBarra acciones={acciones} sx={{ mr: 4 }} />
        {components}

        <MenuCuenta auth={auth} />
      </Toolbar>
    </AppBar>
  );
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, width }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${width}px)`,
    marginLeft: `${width}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
