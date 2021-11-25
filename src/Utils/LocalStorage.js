/**
 * Get provided key from local storage if exist or save default if it is not exists
 *
 * @param {string} key
 * @param {any} defaultValue
 * @return {any}
 */
export const getItemFromStorage = (key, defaultValue = '') => {
  let value = localStorage.getItem(key);
  if (value === null) {
    localStorage.setItem(key, defaultValue);
    return defaultValue;
  }
  return value;
};

/**
 * Get array or object from localStorage
 *
 * @param {string} key
 * @param {{any}|[any]} defaultValue
 * @return {{any}|[any]}
 */
export const getArrayFromStorage = (key, defaultValue = []) => {
  let value = localStorage.getItem(key);
  if (value === null) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  return JSON.parse(value);
};

/**
 * Save key/value pair to local storage
 *
 * @param {string} key
 * @param {any} value
 */
export const saveItemToStorage = (key, value) => {
  localStorage.setItem(key, value);
};

/**
 * Save array or object o localStorage
 *
 * @param {string} key
 * @param {{any}|[any]} value
 */
export const saveArrayToStorage = (key, value) => {
  saveItemToStorage(key, JSON.stringify(value));
};
