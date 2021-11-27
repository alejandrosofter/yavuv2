import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Head from 'next/head'

import {  Icon, SpeedDial} from '@mui/material';

import { useRouter } from 'next/router';
import Image  from 'next/image'
import Stack from '@mui/material/Stack';
import Dialogo from './forms/dialogo';
import { useState } from 'react';
import MenuModulos from './menuModulos';

import MenuUsuario from "./menuUsuario"
import MenuAccionesSpeed from './menuAccionesSpeed';
import ModulosBase from "./modulosBase"
const drawerWidth = 240;
const estiloBarra = {
  customizeToolbar: {
    minHeight: 36
  }
};
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({

  '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Layout({dataCuenta,children,titulo,acciones,icono,modulo,data,auth}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  
  const [dialogSalir, setdialogSalir] = useState(false);
  const [openConsultas, setOpenConsultas] = React.useState(true);
  const router= useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleClickConsultas = () => {
    setOpenConsultas(!openConsultas);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const clickSalir=async e=>{
    setdialogSalir(true)
  }
  return (
    <Box sx={{ display: 'flex' }}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
        
        <Head>
            <title>{titulo}</title>
        </Head> 
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar variant="dense">
          
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box
                sx={{
                  flexGrow: 1,
                display: 'flex',
                flexDirection: 'row',
                p: 0,
                m: 0,
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                <Stack sx={{ alignContent: 'center'}} direction="row" spacing={2}>
                <Typography sx={{ color: '#fff', textTransform: "uppercase", pt:0, fontWeight: 'bolder' }} variant="h5" color="#fff"><Icon className={icono}/> {titulo}</Typography>
                
                </Stack>
                </Box>
            </Box>
            <ModulosBase auth={auth}/>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{pb:4,pt:6}}>
           <Image alt="Logo YAVU" width="160" pl="25" height="35" src="/images/logoYavu.png"/>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <MenuModulos dataCuenta={dataCuenta} auth={auth}/>
        
      </Drawer>
      
        
        <Main  open={open}>
          <DrawerHeader />
          <Stack  direction="row" spacing={0}>
          <MenuAccionesSpeed modulo={modulo} acciones={modulo?modulo.acciones:[]} data={data}/>
          {children}
          </Stack> 
        </Main>
      
    </Box>
  );
}
