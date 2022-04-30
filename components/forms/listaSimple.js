import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';

export default function ListaSimple({items,campoId,ComponentSecondaryAction,fnRender,onClick}) {
  return (
    <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
      {items.map((value) => (
        <ListItem
          key={value[campoId]}
          disableGutters
          secondaryAction={ComponentSecondaryAction}
        >
          <ListItemButton disabled={value.disabled} onClick={onClick.bind(this,value)}>
            <ListItemText primary={`${fnRender(value)}`} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
