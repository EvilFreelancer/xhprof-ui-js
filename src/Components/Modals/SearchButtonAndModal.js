import React from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, TextField, Typography, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setFilterParentChild } from '../../Reducers/pagination';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchButtonAndModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Redux
  const filter = useSelector((state) => state.pagination.filter);
  const filterParentChild = useSelector((state) => state.pagination.filterParentChild);

  /**
   * Filter values dynamicaly
   * @param event
   */
  const handleFilter = (event) => {
    dispatch(setFilter(event.target.value));
  };

  /**
   * Cleanup filter
   */
  const handleDeleteFilterParentChild = () => {
    dispatch(setFilterParentChild(null));
  };

  return (
    <div>
      <IconButton size="large" color="inherit" aria-label="enabledColumns" onClick={handleOpen}>
        <SearchIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 700 } }}
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          Search
          <IconButton
            aria-label="close"
            onClick={handleClose}
            paddingleft={4}
            paddingright={4}
            paddingtop={2}
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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={`Filter rows by function or parent name`}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleFilter(e)}
            value={filter}
          />
          {!!filterParentChild && (
            <Typography sx={{ pt: 2 }}>
              <Chip size={'medium'} label={filterParentChild} color="info" onDelete={handleDeleteFilterParentChild} />
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
