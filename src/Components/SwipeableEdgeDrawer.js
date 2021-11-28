import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, setSelectedFile } from '../Reducers/files';
import { MyDropzone } from './MyDropzone';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { formatBytes } from '../Utils/StringFormat';
import { Chip, IconButton, ListItemSecondaryAction } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@mui/styles';
import { setFilterParentChild } from '../Reducers/pagination';

const drawerBleeding = 56;

const theme = createTheme();
const useStyles = makeStyles({
  activeItem: {
    backgroundColor: theme.palette.info.light,
    '&:hover': {
      backgroundColor: theme.palette.info.main,
    },
  },
});

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const selected = useSelector((state) => state.files.selected);
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

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
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        sx={{ boxShadow: 3 }}
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            borderTop: '1px solid #ddd',
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
            {files.length < 1 ? 'Upload XHProf reports' : selected.name ?? 'Choose XHProf report'}
          </Typography>
        </StyledBox>
        <StyledBox sx={{ pb: 2, height: '100%', overflow: 'auto' }}>
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
              <MyDropzone dropzoneText={'Touch to upload files'} />
            </ListItem>
          </List>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SwipeableEdgeDrawer;
