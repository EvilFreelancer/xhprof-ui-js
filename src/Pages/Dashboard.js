import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { Box, CssBaseline } from '@mui/material';
import { FilePreview } from '../Components/FilePreview';
import LeftMenu from '../Components/LeftMenu';

export default function Dashboard() {
  const [file, setFile] = useState([]);
  const [filter, setFilter] = useState(null);

  const handleFileCleanup = () => {
    setFile([]);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar
        setFilter={setFilter}
        file={file}
        handleFileCleanup={handleFileCleanup}
      />
      <LeftMenu />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {file.length > 0 && <FilePreview file={file} filter={filter} />}
      </Box>
    </Box>
  );
}
