import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import { getIndexArray,getItemArray } from '../../helpers/arrays';

export default function CheckboxList({items,campoLabel,campoId,callbackcambia,fnTransformItem}) {
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {

    const currentIndex = getIndexArray({data:checked,campoId,valor:value[campoId]})
    const newChecked = [...checked];
    
    if (currentIndex===null) {
      newChecked.push(value);
      
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    if(callbackcambia)callbackcambia(newChecked)
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {items.map((data) => {
        const item=fnTransformItem?fnTransformItem(data):data
        const labelId = `checkbox-list-label-${item[campoId]}`;
        
        
        return (
          <ListItem
            key={item[campoId]}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(item)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={getItemArray({data:checked,campoId:"id",valor:item[campoId]})?true:false}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={typeof campoLabel ==="function"?campoLabel(item):campoLabel} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
