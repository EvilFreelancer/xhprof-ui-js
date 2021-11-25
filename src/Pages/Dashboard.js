import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { Box, CssBaseline } from '@mui/material';
import { FilePreview } from '../Components/FilePreview';
import LeftMenu from '../Components/LeftMenu';
import { useSelector } from 'react-redux';
import SwipeableEdgeDrawer from '../Components/SwipeableEdgeDrawer';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Dashboard() {
  const [showPreview, setShowPreview] = useState(false);
  const selected = useSelector((state) => state.files.selected);

  useEffect(function () {
    if (selected.json) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  });

  return (
    <Box sx={{ display: { sm: 'flex' } }}>
      <CssBaseline />
      <Navbar />
      <LeftMenu />
      <Box sx={{ flexGrow: 1, p: { sm: 3 }, pt: { xs: 5 } }}>{showPreview && <FilePreview />}</Box>
      {!useMediaQuery('(min-width:600px)') && <SwipeableEdgeDrawer />}
    </Box>
  );
}
