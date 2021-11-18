import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../Reducers/pagination';

// Custom styles
const useStyles = makeStyles({
  cell: {
    whiteSpace: 'nowrap',
    maxWidth: '200px',
    width: '100px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  sticky: {
    position: 'sticky',
    top: 64,
    background: 'white',
  },
  fab: {
    position: 'fixed',
    bottom: '10px',
    background: '#fff',
  },
});

// List of headers
const headers = [
  { name: 'function', label: 'Function', width: '45%' },
  { name: 'calls', label: 'Calls', width: '5%' },
  { name: 'wtime', label: 'Wall Time', width: '10%' },
  { name: 'cpu', label: 'CPU Time', width: '5%' },
  { name: 'mem_usage', label: 'Memory', sub: '(bytes)', width: '5%' },
  {
    name: 'mem_usage_peek',
    label: 'Peek',
    sub: '(bytes)',
    width: '5%',
  },
  { name: 'wtime_perc', label: 'IWall%', width: '5%' },
  { name: 'cpu_pecr', label: 'ICpu%', width: '5%' },
  { name: 'mem_usage_perc', label: 'IMU%', width: '5%' },
  {
    name: 'mem_usage_peek_perc',
    label: 'IPMU%',
    width: '5%',
  },
];

export function SimpleTable({ results, sortBy, sortDirection, handleSort }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  // Pagination
  const filter = useSelector((state) => state.pagination.filter);
  const page = useSelector((state) => state.pagination.page);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  /**
   * Let's change format of time from microseconds to something more readable
   * @param microseconds
   * @returns {string}
   */
  const formatMicroseconds = (microseconds) => {
    let milliseconds = microseconds / 1000;
    let time = new Date(milliseconds);
    let ms = time.getMilliseconds();
    let ss = time.getSeconds();

    let output = '';
    if (ss > 0) {
      output = ss + '.' + ms + ' s';
    } else {
      output = ms + ' ms';
    }

    return output;
  };

  /**
   * What to do if page was changed
   * @param event
   * @param pageNumber
   */
  const onPageChange = (event, pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  /**
   * Method for filtering items by string
   * @param string
   * @returns {boolean}
   */
  const filterString = (string) => {
    if (!filter) {
      return true;
    }

    // Select filtration mode
    let filterMode = filter.split(':');
    if (filterMode[0] === 'parent') {
      console.log('parent');
    }

    // In any other cases filter by function name
    return string.function.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
  };

  const handleFilterByParent = (parentFn) => {
    // Need filter original function
    // Then all child above
  };

  /**
   * Convert number to readable format
   * @param number
   * @param toFixed
   * @returns {string}
   */
  const formatNumber = (number, toFixed = null) => {
    let tmpNumber = number;
    if (toFixed) {
      tmpNumber = number.toFixed(toFixed);
    }

    return tmpNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  return (
    <div>
      <Table
        fixedheader={false}
        style={{ tableLayout: 'auto', marginBottom: '80px' }}
      >
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell
                key={index}
                style={{ width: header.width }}
                className={classes.sticky}
                align={header.name === 'function' ? `left` : `right`}
              >
                <TableSortLabel
                  active={sortBy === header.name}
                  direction={sortDirection}
                  onClick={() => handleSort(header.name)}
                >
                  <div>
                    <div>{header.label}</div>
                    <div>{header.sub && <small>{header.sub}</small>}</div>
                  </div>
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {results.length > 0 &&
            results
              .filter((string) => {
                return filterString(string);
              })
              .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
              .map((result, index) => (
                <TableRow key={index}>
                  <TableCell
                    className={classes.cell}
                    onClick={() => handleFilterByParent(result.function ?? '')}
                    title={result.function ?? ''}
                  >
                    {result.function ?? ''}
                  </TableCell>
                  <TableCell align={`right`}>
                    {formatNumber(result.calls) ?? ''}
                  </TableCell>
                  <TableCell
                    align={`right`}
                    title={result.wtime + ' microseconds'}
                  >
                    {formatMicroseconds(result.wtime) ?? ''}
                  </TableCell>
                  <TableCell
                    align={`right`}
                    title={result.cpu + ' microseconds'}
                  >
                    {formatMicroseconds(result.cpu) ?? ''}
                  </TableCell>
                  <TableCell align={`right`}>
                    {formatNumber(result.mem_usage) ?? ''}
                  </TableCell>
                  <TableCell align={`right`}>
                    {formatNumber(result.mem_usage_peek) ?? ''}
                  </TableCell>
                  <TableCell align={`right`}>
                    {formatNumber(result.wtime_perc, 2) + '%' ?? ''}
                  </TableCell>
                  <TableCell align={`right`}>
                    {formatNumber(result.cpu_perc, 2) + '%' ?? ''}
                  </TableCell>
                  <TableCell align={`right`}>
                    {formatNumber(result.mem_usage_perc, 2) + '%' ?? ''}
                  </TableCell>
                  <TableCell align={`right`}>
                    {formatNumber(result.mem_usage_peek_perc, 2) + '%' ?? ''}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <TablePagination
        sx={{ boxShadow: 4 }}
        justifyContent="center"
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100, 500, 1000]}
        onRowsPerPageChange={(element) => {
          setItemsPerPage(element.target.value);
        }}
        className={classes.fab}
        count={
          results.filter((string) => {
            return filterString(string);
          }).length
        }
        page={page}
        onPageChange={onPageChange}
        color="standard"
        size="medium"
        showFirstButton
        showLastButton
      />
    </div>
  );
}
