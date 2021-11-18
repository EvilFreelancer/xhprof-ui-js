import React, { useEffect, useState } from 'react';
import { SimpleTable } from './SimpleTable';
import orderBy from 'lodash/orderBy';
import { Box } from '@mui/material';

export function FilePreview({ file, filter }) {
  const [results, setResults] = useState([]);
  const [name, setName] = useState(null);
  const [size, setSize] = useState(0);

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

  useEffect(function () {
    // Set some initial values
    setName(file[0].name);
    setSize(file[0].size);

    // Set content of file
    file[0].text().then(function (result) {
      // Parse JSON to array of objects
      let parsedResult = JSON.parse(result);

      // Main object for calculation
      let main = parsedResult['main()'];

      // Extract entries from array
      let entries = Object.entries(parsedResult);

      // Convert bad array to valid array
      let output = [];
      let callsTotal = 0;
      entries.map((entry) => {
        let parentChild = entry[0].split('==>');
        callsTotal += parseInt(entry[1]['ct']);
        output.push({
          function: parentChild[1] ?? parentChild[0],
          parent: parentChild[0],
          child: parentChild[1],
          calls: entry[1]['ct'],
          wtime: entry[1]['wt'],
          wtime_perc: (entry[1]['wt'] / main['wt']) * 100,
          cpu: entry[1]['cpu'],
          cpu_perc: (entry[1]['cpu'] / main['cpu']) * 100,
          mem_usage: entry[1]['mu'],
          mem_usage_perc: (entry[1]['mu'] / main['mu']) * 100,
          mem_usage_peek: entry[1]['pmu'],
          mem_usage_peek_perc: (entry[1]['pmu'] / main['pmu']) * 100,
        });
      });

      // Calculate percent of calls
      output.map((entry) => {
        entry.calls_perc = (entry.calls / callsTotal) * 100;
      });

      // TODO: Here probably will also be need some additional operations
      console.log(output);
      // When result is ready for render, then order by wtime in desc order
      let items = orderBy(output, ['wtime', 'function'], ['desc', 'asc']);
      setResults(items);
    });
  }, []);

  return (
    <div>
      <Box>Charts</Box>
      <SimpleTable
        results={orderBy(results, [sortBy, 'function'], [sortDirection, 'asc'])}
        sortBy={sortBy}
        sortDirection={sortDirection}
        filter={filter}
        handleSort={handleSort}
      />
    </div>
  );
}
