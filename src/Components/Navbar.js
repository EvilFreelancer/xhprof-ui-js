import React from 'react';
import { AppBar, Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './Search';

export default function Navbar({ file, handleFileCleanup, setFilter }) {
  /**
   * Filter values dynamicaly
   * @param event
   */
  const handleFilter = (event) => {
    setFilter(event.target.value);
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
        {file.length > 0 && (
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
      </Toolbar>
    </AppBar>
  );
}
