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
import {
  formatMicroseconds,
  formatBytes,
  formatNumber,
} from '../Utils/StringFormat';

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
  displayNone: {
    display: 'none',
  },
  fab: {
    position: 'fixed',
    bottom: '10px',
    background: '#fff',
  },
});

export function SimpleTable({ results, sortBy, sortDirection, handleSort }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  // Pagination
  const filter = useSelector((state) => state.pagination.filter);
  const page = useSelector((state) => state.pagination.page);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  // Columns selector from Redux store
  const columns = useSelector((state) => state.pagination.columns);
  const enabledColumns = useSelector(
    (state) => state.pagination.enabledColumns,
  );

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

  const handleFilterByParent = (parentFunction) => {
    console.log(parentFunction);
    // Need filter original function
    // Then all child above
  };

  const handleTitle = (result, column) => {
    switch (column.format) {
      case 'bytes':
        return result[column.name] + ' bytes';
      case 'time':
        return result[column.name] + ' microseconds';
      case 'number':
        return formatNumber(result[column.name]);
      case 'percent':
        return formatNumber(result[column.name], 2, '%');
      default:
        return result[column.name];
    }
  };

  const handleText = (result, column) => {
    switch (column.format) {
      case 'bytes':
        return formatBytes(result[column.name]);
      case 'time':
        return formatMicroseconds(result[column.name]);
      case 'number':
        return formatNumber(result[column.name]);
      case 'percent':
        return formatNumber(result[column.name], 2, '%');
      default:
        return result[column.name];
    }
  };

  return (
    <div>
      <Table
        fixedheader="false"
        style={{ tableLayout: 'auto', marginBottom: '80px' }}
      >
        <TableHead>
          <TableRow>
            {columns.map((header, index) => (
              <TableCell
                key={index}
                style={{ width: header.width }}
                className={classes.sticky}
                sx={{
                  display: enabledColumns.includes(header.name)
                    ? 'table-cell'
                    : 'none',
                }}
                align={
                  ['function', 'parent'].includes(header.name)
                    ? `left`
                    : `right`
                }
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
                  {/* TableCell */}
                  {columns.map((column, cIndex) => {
                    return (
                      <TableCell
                        key={index + '-cell-' + cIndex}
                        className={classes.cell}
                        align={
                          ['function', 'parent'].includes(column.name)
                            ? `left`
                            : `right`
                        }
                        onClick={() =>
                          handleFilterByParent(result.function ?? '')
                        }
                        title={handleTitle(result, column)}
                        sx={{
                          display: enabledColumns.includes(column.name)
                            ? 'table-cell'
                            : 'none',
                        }}
                      >
                        {handleText(result, column)}
                      </TableCell>
                    );
                  })}
                  {/* TableCell END */}
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <TablePagination
        sx={{ boxShadow: 4 }}
        justifycontent="center"
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
