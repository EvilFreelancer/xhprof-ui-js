import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import {
  IconButton,
  ListItem,
  List,
  ListItemText,
  Checkbox,
  ListItemIcon,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { filter, clone } from 'lodash';
import { setEnabledColumns } from '../../Reducers/pagination';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: {
    xs: '100%',
    sm: 'auto',
  },
  bgcolor: 'background.paper',
  boxShadow: 24,
  overflow: 'auto',
};

export default function ColumnsButtonAndModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Columns selector from Redux store
  const columns = useSelector((state) => state.pagination.columns);
  const enabledColumns = useSelector((state) => state.pagination.enabledColumns);

  /**
   * Update list of enabled columns
   * @param value
   */
  const handleToggle = (value) => {
    let updatedEnabledColumns = [];
    if (enabledColumns.includes(value)) {
      // Remove item from array
      updatedEnabledColumns = filter(enabledColumns, (currentColumn) => {
        return currentColumn !== value;
      });
    } else {
      // Add item to array
      updatedEnabledColumns = clone(enabledColumns);
      updatedEnabledColumns.push(value);
    }
    dispatch(setEnabledColumns(updatedEnabledColumns));
  };

  return (
    <div>
      <IconButton size="large" edge="end" color="inherit" aria-label="enabledColumns" onClick={handleOpen}>
        <ViewWeekIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 700 } }}
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          Select enabled columns
          <IconButton
            aria-label="close"
            onClick={handleClose}
            paddingLeft={4}
            paddingRight={4}
            paddingTop={2}
            sx={{
              position: 'absolute',
              right: 13,
              top: 13,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormGroup>
            {columns.map((column, index) => {
              return (
                <FormControlLabel
                  key={`column-` + index}
                  control={
                    <Checkbox
                      checked={enabledColumns.includes(column.name)}
                      onChange={() => handleToggle(column.name)}
                      inputProps={{ 'aria-label': 'controlled' }}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    />
                  }
                  label={column.label}
                />
              );
            })}
          </FormGroup>
        </DialogContent>
      </Dialog>
    </div>
  );
}
