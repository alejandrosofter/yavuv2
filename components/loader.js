import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function Loader({texto}){
    return (
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        
      >
        <Stack  direction="row" spacing={3}>
            <CircularProgress color="inherit" />
            <Typography variant="h6" color="#fff">{texto}</Typography>
        </Stack>
      </Backdrop>
    )
}