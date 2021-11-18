import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { MyDropzone } from './MyDropzone';

const drawerWidth = 290;

export default function LeftMenu() {
  const results = useSelector((state) => state.results.results);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        {results.length > 0 && (
          <div>
            <List>
              {results.map((result, index) => (
                <ListItem button key={`result-` + index}>
                  <ListItemText
                    title={result.file.name}
                    primary={result.file.name}
                    primaryTypographyProps={{
                      variant: 'subtitle2',
                      style: {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
            <Divider />
          </div>
        )}
        <List>
          <ListItem>
            <MyDropzone />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
