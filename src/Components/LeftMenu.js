import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { MyDropzone } from './MyDropzone';
import { setSelectedFile, deleteFile } from '../Reducers/files';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@material-ui/core/styles';
import { IconButton, ListItemSecondaryAction } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formatBytes } from '../Utils/StringFormat';

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

  const handleFileOpen = (fileId) => {
    if (selected.id === fileId) {
      dispatch(setSelectedFile(null));
    } else {
      dispatch(setSelectedFile(fileId));
    }
  };

  const handleDeleteFile = (fileId) => {
    dispatch(deleteFile(fileId));
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
        <List>
          {!!files &&
            files.map((file, index) => (
              <ListItem
                button
                title={file.name}
                onClick={() => handleFileOpen(file.id)}
                className={file.id === selected.id ? classes.activeItem : ''}
                key={`result-` + index}
              >
                <ListItemText
                  primaryTypographyProps={{
                    style: {
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                  }}
                  primary={file.name}
                  secondary={'Size: ' + formatBytes(file.size)}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteFile(file.id)}
                    title={'Remove ' + file.name}
                  >
                    <CloseIcon color={'primary'} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          <ListItem>
            <MyDropzone />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
