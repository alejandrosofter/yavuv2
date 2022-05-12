import { Icon, Stack, Typography } from "@mui/material";

export function TitleIcon({title,icon}) {
    return <Stack spacing={1} direction="row">
        <Typography variant="h6">{title}</Typography>
         <Icon className={icon}/>
         </Stack>
}