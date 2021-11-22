import React, { useEffect, useState } from 'react';
import { SimpleTable } from './SimpleTable';
import orderBy from 'lodash/orderBy';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

export function FilePreview() {
  const [results, setResults] = useState([]);
  const [currentSelected, setCurrentSelected] = useState({});

  // From redux
  const selected = useSelector((state) => state.files.selected);

  // Sort by wtime by default. in descent order
  const [sortBy, setSortBy] = useState('wt');
  const [sortDirection, setSortDirection] = useState('desc');

  /**
   * Switch sort order if column or order was changed
   * @param columnName
   */
  const handleSort = (columnName) => {
    if (columnName === sortBy) {
      // If name of column not changed, then reverse order
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If changed then need to do everything from begin
      setSortBy(columnName);

      if (columnName === 'function') {
        // Initial state of names of function is ascend
        setSortDirection('asc');
      } else {
        // All other columns should be sorted in descent order
        setSortDirection('desc');
      }
    }
  };

  const handleCalculation = () => {
    // When result is ready for render, then order by wtime in desc order
    let items = orderBy(
      selected.result,
      ['wtime', 'function'],
      ['desc', 'asc'],
    );
    setResults(items);
  };

  useEffect(function () {
    // If selected file changed then trigger calculation
    if (!!selected.json && currentSelected !== selected) {
      handleCalculation();
      setCurrentSelected(selected);
    }
  });

  return (
    <div>
      <Grid mt={5}>
        <Grid item xs={6}>
          <Box>
            {selected.main && (
              <List
                sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}
              >
                <ListItem>
                  <ListItemText>
                    <Typography variant="h6" component="h2">
                      Overall Summary
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Total Incl. Wall Time (microsec): {selected.main.wt}{' '}
                    microsecs
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Total Incl. CPU (microsecs): {selected.main.cpu} microsecs
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Total Incl. MemUse (bytes): {selected.main.mu} bytes
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Total Incl. PeakMemUse (bytes): {selected.main.pmu} bytes
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Number of Function Calls: {selected.callsTotal}
                  </ListItemText>
                </ListItem>
              </List>
            )}
          </Box>
        </Grid>
      </Grid>
      <SimpleTable
        results={orderBy(results, [sortBy, 'function'], [sortDirection, 'asc'])}
        sortBy={sortBy}
        sortDirection={sortDirection}
        handleSort={handleSort}
      />
    </div>
  );
}
