import initAuth from '../config/initAuth' // the module you created above
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Contexto,{ContextoUsuario} from "../context/userContext"
import UseUser from "../hooks/useUser"

import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import { useContext } from 'react';
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#006daf',
    },
    secondary: {
      main: '#ff5b00',
    },
  },
  overrides: {
    //MuiTableCell
    MuiTableRow: {
      root: {
        cursor: 'pointer',
        "&:hover": {
          backgroundColor: "rgba(33, 150, 243, 0.5) !important"
        }
      }
    }
  },
  typography: {
    fontSize: 10,
    fontWeightMedium: 1000,
    htmlFontSize: 14,
    button: {
      fontWeight: 1000,
      fontSize: '0.9rem',
    },
    titulo:{
      color:'#ff5b00',
      fontSize: '0.2rem',
    },
    overline: {
      fontSize: '0.7rem',
    },
    fontWeightLight: 200,
    fontWeightRegular: 300,
  },
});
initAuth()

export default function MyApp({ Component, pageProps }) {

  return (
  
    <ThemeProvider theme={theme}> <Component {...pageProps} /> </ThemeProvider>

  )
}


