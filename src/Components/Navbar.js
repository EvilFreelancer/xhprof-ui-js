import React from 'react';
import { AppBar, Box, Chip, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setFilterParentChild } from '../Reducers/pagination';
import ColumnsButtonAndModal from './Modals/ColumnsButtonAndModal';
import SearchButtonAndModal from './Modals/SearchButtonAndModal';
import PaginationButtonAndModal from './Modals/PaginationButtonAndModal';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { switchTreeView } from '../Reducers/mode';

export default function Navbar() {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.files.selected);
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

  /**
   * Choose which mode need to show
   */
  const handleTreeView = () => {
    dispatch(switchTreeView());
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CssBaseline />
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          pl: 2,
          pr: 3,
        }}
      >
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Xhprof-UI.js
        </Typography>
        {!!filterParentChild && (
          <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Chip
              size={'medium'}
              label={filterParentChild}
              sx={{ fontSize: { xs: '1rem', sm: '1.3rem' } }}
              color="info"
              onDelete={handleDeleteFilterParentChild}
            />
          </Typography>
        )}
        <Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => handleFilter(e)}
                value={filter}
              />
            </Search>
          </Box>
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <SearchButtonAndModal />
          </Box>
        </Box>
        {!!selected.name && (
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <PaginationButtonAndModal />
          </Box>
        )}
        {!!selected.name && (
          <IconButton size="large" edge="end" color="inherit" aria-label="enabledColumns" onClick={handleTreeView}>
            <AccountTreeIcon />
          </IconButton>
        )}
        <ColumnsButtonAndModal />
      </Toolbar>
    </AppBar>
  );
}
