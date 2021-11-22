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
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { filter, clone } from 'lodash';
import { setEnabledColumns } from '../../Reducers/pagination';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function ColumnsButtonAndModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Columns selector from Redux store
  const columns = useSelector((state) => state.pagination.columns);
  const enabledColumns = useSelector(
    (state) => state.pagination.enabledColumns,
  );

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
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="enabledColumns"
        onClick={handleOpen}
      >
        <ViewWeekIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            paddingLeft={2}
            paddingRight={2}
            paddingTop={2}
          >
            Select enabled columns
          </Typography>
          <List>
            {columns.map((column, index) => {
              const labelId = `checkbox-list-label-${column.name}`;

              return (
                <ListItem key={`column-` + index}>
                  <ListItemButton
                    role={undefined}
                    onClick={() => handleToggle(column.name)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={enabledColumns.includes(column.name)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={column.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Modal>
    </div>
  );
}
