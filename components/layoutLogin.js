import {  Container, ThemeProvider, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { createTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import Head from 'next/head'
import Image from 'next/image'
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#006daf',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontSize: 11,
    fontWeightMedium: 600,
    htmlFontSize: 14,
    button: {
      fontWeight: 600,
      fontSize: '0.9rem',
    },
  }
});
export default function LayoutLogin({children,titulo}) {
  return <>
  <Head>
    <title>{titulo}</title>
  </Head>
 <ThemeProvider theme={theme}>
 <Container component="main" maxWidth="xs">

<Box
  sx={{
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}
>
  <Image alt="Logo YAVU"
      width={150}
      height={200} src="images/logoYavu.png"/>
  {children}
  
</Box>

</Container>
    
    </ThemeProvider>
  </>
}
