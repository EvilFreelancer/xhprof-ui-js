import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPage,
  setFilterParentChild,
  setItemsPerPage,
  setSortDirection,
  setSortBy,
  setCount,
} from '../Reducers/pagination';
import { formatMicroseconds, formatBytes, formatNumber } from '../Utils/StringFormat';
import useMediaQuery from '@mui/material/useMediaQuery';
import { filterString, filterStringParentChild } from '../Utils/Filters';

// Custom styles
const useStyles = makeStyles({
  cell: {
    maxWidth: '200px',
    width: '100px',
  },
  sticky: {
    position: 'sticky',
    top: 64,
    background: 'white',
  },
  bold: {
    fontWeight: 'bold',
  },
  fab: {
    position: 'fixed',
    bottom: '10px',
    background: '#fff',
  },
  clickable: {
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export function SimpleTable({ results }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  // Pagination
  const filter = useSelector((state) => state.pagination.filter);
  const filterParentChild = useSelector((state) => state.pagination.filterParentChild);
  const page = useSelector((state) => state.pagination.page);
  const itemsPerPage = useSelector((state) => state.pagination.itemsPerPage);
  const count = useSelector((state) => state.pagination.count);

  // Columns selector from Redux store
  const columns = useSelector((state) => state.pagination.columns);
  const enabledColumns = useSelector((state) => state.pagination.enabledColumns);

  // Sort by wtime by default, in descent order
  const sortBy = useSelector((state) => state.pagination.sortBy);
  const sortDirection = useSelector((state) => state.pagination.sortDirection);

  /**
   * Switch sort order if column or order was changed
   * @param columnName
   */
  const handleSort = (columnName) => {
    if (columnName === sortBy) {
      // If name of column not changed, then reverse order
      dispatch(setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      // If changed then need to do everything from begin
      dispatch(setSortBy(columnName));

      if (['function', 'parent'].includes(columnName)) {
        // Initial state of names of function is ascend
        dispatch(setSortDirection('asc'));
      } else {
        // All other columns should be sorted in descent order
        dispatch(setSortDirection('desc'));
      }
    }
  };

  /**
   *
   * @param value
   * @param format
   * @return {string|null|*}
   */
  const handleTitle = (value, format) => {
    switch (format) {
      case 'bytes':
        return value + ' bytes';
      case 'time':
        return value + ' microseconds';
      case 'number':
        return formatNumber(value);
      case 'percent':
        return formatNumber(value, 3, '%');
      default:
        return value;
    }
  };

  /**
   *
   * @param value
   * @param format
   * @return {string|null|*}
   */
  const handleText = (value, format) => {
    switch (format) {
      case 'bytes':
        return formatBytes(value);
      case 'time':
        return formatMicroseconds(value);
      case 'number':
        return formatNumber(value);
      case 'percent':
        return formatNumber(value, 2, '%');
      default:
        return value;
    }
  };

  useEffect(function () {
    let count =
      results.length > 0 &&
      results.filter((string) => {
        return filterString(string, filter) && filterStringParentChild(string, filterParentChild);
      }).length;

    dispatch(setCount(count));
  });

  return (
    <div>
      <Table
        fixedheader="false"
        style={{ tableLayout: 'auto', marginBottom: useMediaQuery('(min-width:600px)') ? '44px' : '66px' }}
        sx={{ boxShadow: 3 }}
      >
        <TableHead>
          <TableRow>
            {columns.map((header, index) => (
              <TableCell
                key={index}
                style={{ width: header.width }}
                className={classes.sticky}
                sx={{
                  display: enabledColumns.includes(header.name) ? 'table-cell' : 'none',
                }}
                align={['function', 'parent'].includes(header.name) ? `left` : `right`}
              >
                <TableSortLabel
                  active={sortBy === header.name}
                  direction={sortDirection}
                  onClick={() => handleSort(header.name)}
                >
                  <Typography variant="body" noWrap className={classes.bold}>
                    {header.label}
                  </Typography>
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {results.length > 0 &&
            results
              .filter((string) => {
                return filterString(string, filter) && filterStringParentChild(string, filterParentChild);
              })
              .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
              .map((result, index) => (
                <TableRow key={index} style={{ backgroundColor: 'white' }}>
                  {/* TableCell */}
                  {columns.map((column, cIndex) => {
                    return (
                      <TableCell
                        key={index + '-cell-' + cIndex}
                        className={classes.cell}
                        align={['function', 'parent'].includes(column.name) ? `left` : `right`}
                        title={handleTitle(result[column.name], column.format)}
                        sx={{
                          display: enabledColumns.includes(column.name) ? 'table-cell' : 'none',
                        }}
                      >
                        <Typography
                          variant="body1"
                          onClick={() => {
                            if ('function' === column.name) {
                              dispatch(setFilterParentChild(result.function));
                            }
                            if ('parent' === column.name) {
                              dispatch(setFilterParentChild(result.parent));
                            }
                          }}
                          style={{
                            overflowWrap: 'break-word',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          className={['function', 'parent'].includes(column.name) ? classes.clickable : ''}
                        >
                          {handleText(result[column.name], column.format)}
                        </Typography>
                      </TableCell>
                    );
                  })}
                  {/* TableCell END */}
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <TablePagination
        sx={{ boxShadow: 3, display: { xs: 'none', sm: 'block' } }}
        justifycontent="center"
        rowsPerPage={parseInt(itemsPerPage)}
        rowsPerPageOptions={[10, 25, 50, 100, 500, 1000]}
        onRowsPerPageChange={(element) => {
          dispatch(setItemsPerPage(element.target.value));
        }}
        className={classes.fab}
        style={{ bottom: '8px' }}
        count={count}
        page={page}
        onPageChange={(e, pageNumber) => dispatch(setPage(pageNumber))}
        color="standard"
        size="medium"
        showFirstButton
        showLastButton
      />
    </div>
  );
}
