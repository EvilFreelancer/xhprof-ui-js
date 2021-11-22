import React from 'react';
import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../Reducers/pagination';
import ColumnsButtonAndModal from './Modals/ColumnsButtonAndModal';

export default function Navbar() {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.files.selected);

  /**
   * Filter values dynamicaly
   * @param event
   */
  const handleFilter = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CssBaseline />
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 3,
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Xhprof-UI.js
        </Typography>
        {!!selected.json && (
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => handleFilter(e)}
            />
          </Search>
        )}
        <ColumnsButtonAndModal />
      </Toolbar>
    </AppBar>
  );
}
