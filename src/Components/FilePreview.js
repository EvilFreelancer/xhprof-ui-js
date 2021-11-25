import React, { useEffect, useState } from 'react';
import { SimpleTable } from './SimpleTable';
import orderBy from 'lodash/orderBy';
import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { Overall } from './Overall';

export function FilePreview() {
  const [results, setResults] = useState([]);
  const [currentSelected, setCurrentSelected] = useState({});

  // From redux
  const selected = useSelector((state) => state.files.selected);

  // Sort by wtime by default, in descent order
  const sortBy = useSelector((state) => state.pagination.sortBy);
  const sortDirection = useSelector((state) => state.pagination.sortDirection);

  useEffect(function () {
    // If selected file changed then trigger calculation
    if (!!selected.json && currentSelected !== selected) {
      // When result is ready for render, then order by wtime in desc order
      setResults(selected.result);
      // Set current selected
      setCurrentSelected(selected);
    }
  });

  return (
    <div>
      <Grid sx={{ mt: { xs: 4, sm: 6 } }}>
        <Grid item xs={12} sm={6} md={5} mb={1}>
          <Box>
            <Overall />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <SimpleTable results={orderBy(results, [sortBy, 'function'], [sortDirection, 'asc'])} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
