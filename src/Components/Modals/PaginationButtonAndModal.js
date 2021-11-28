import React from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, TablePagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { setPage, setItemsPerPage } from '../../Reducers/pagination';

export default function PaginationButtonAndModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Redux
  const page = useSelector((state) => state.pagination.page);
  const itemsPerPage = useSelector((state) => state.pagination.itemsPerPage);
  const count = useSelector((state) => state.pagination.count);

  return (
    <div>
      <IconButton size="large" color="inherit" aria-label="enabledColumns" onClick={handleOpen}>
        <MenuBookIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 700 } }}
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">
          Pagination
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
          <TablePagination
            justifycontent="center"
            rowsPerPage={parseInt(itemsPerPage)}
            rowsPerPageOptions={[10, 25, 50, 100, 500, 1000]}
            onRowsPerPageChange={(element) => {
              dispatch(setItemsPerPage(element.target.value));
            }}
            count={count}
            page={page}
            onPageChange={(e, pageNumber) => dispatch(setPage(pageNumber))}
            color="standard"
            size="medium"
            labelRowsPerPage={'Per page'}
            showFirstButton
            showLastButton
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
