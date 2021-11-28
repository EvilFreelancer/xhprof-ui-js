/**
 * Method for filtering items by string
 * @param {*} string
 * @param {string|null} filter
 * @returns {boolean}
 */
export const filterString = (string, filter = null) => {
  if (!filter) {
    return true;
  }

  let tmpFilter = filter.toLowerCase();
  return (
    string.function.toLowerCase().indexOf(tmpFilter) !== -1 || string.parent.toLowerCase().indexOf(tmpFilter) !== -1
  );
};

/**
 * Filter by parent or child
 *
 * @param {*} string
 * @param {string|null} filter
 * @return {boolean}
 */
export const filterStringParentChild = (string, filter = null) => {
  if (!filter) {
    return true;
  }

  let tmpFilter = filter.toLowerCase();
  return string.function.toLowerCase() === tmpFilter || string.parent.toLowerCase() === tmpFilter;
};
