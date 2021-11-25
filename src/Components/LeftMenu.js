import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { MyDropzone } from './MyDropzone';
import { setSelectedFile } from '../Reducers/files';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@material-ui/core/styles';

const drawerWidth = 290;
const theme = createTheme();
const useStyles = makeStyles({
  activeItem: {
    backgroundColor: theme.palette.info.light,
    '&:hover': {
      backgroundColor: theme.palette.info.main,
    },
  },
});

export default function LeftMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const selected = useSelector((state) => state.files.selected);

  const handleFileOpen = (e, fileId) => {
    if (selected.id === fileId) {
      dispatch(setSelectedFile(null));
    } else {
      dispatch(setSelectedFile(fileId));
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        height: '100%',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        display: { xs: 'none', sm: 'block' },
      }}
      containerStyle={{ height: 'calc(100% - 64px)', top: 64 }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        {!!files && (
          <List>
            {files.map((file, index) => (
              <ListItem
                button
                className={file.id === selected.id ? classes.activeItem : ''}
                key={`result-` + index}
                onClick={(e) => handleFileOpen(e, file.id)}
              >
                <ListItemText
                  title={file.name}
                  primary={file.name}
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
