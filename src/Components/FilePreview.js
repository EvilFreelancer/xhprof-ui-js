import React, { useEffect, useState } from 'react';
import { SimpleTable } from './SimpleTable';
import orderBy from 'lodash/orderBy';
import { Box, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSortDirection, sortBy } from '../Reducers/pagination';

export function FilePreview() {
  const dispatch = useDispatch();

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
      <Grid mt={5}>
        <Grid item xs={6}>
          <Box>
            {selected.main && (
              <List sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}>
                <ListItem>
                  <ListItemText>
                    <Typography variant="h6" component="h2">
                      Overall Summary
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Total Incl. Wall Time (microsec): {selected.main.wt} microsecs</ListItemText>
                </ListItem>
                {selected.main.cpu && (
                  <ListItem>
                    <ListItemText>Total Incl. CPU (microsecs): {selected.main.cpu} microsecs</ListItemText>
                  </ListItem>
                )}
                {selected.main.mu && (
                  <ListItem>
                    <ListItemText>Total Incl. MemUse (bytes): {selected.main.mu} bytes</ListItemText>
                  </ListItem>
                )}
                {selected.main.pmu && (
                  <ListItem>
                    <ListItemText>Total Incl. PeakMemUse (bytes): {selected.main.pmu} bytes</ListItemText>
                  </ListItem>
                )}
                <ListItem>
                  <ListItemText>Number of Function Calls: {selected.callsTotal}</ListItemText>
                </ListItem>
              </List>
            )}
          </Box>
        </Grid>
      </Grid>
      <SimpleTable results={orderBy(results, [sortBy, 'function'], [sortDirection, 'asc'])} />
    </div>
  );
}
