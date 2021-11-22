/**
 * Let's change format of time from microseconds to something more readable
 * @param {number} microseconds
 * @returns {string}
 */
export const formatMicroseconds = (microseconds) => {
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
 * Convert number to readable format
 * @param {number|null} number
 * @param {number|null} toFixed
 * @param {string|null} suffix
 * @returns {string|null}
 */
export const formatNumber = (number = null, toFixed = null, suffix = null) => {
  if (null === number) {
    return null;
  }

  let tmpNumber = number;
  if (null !== toFixed) {
    tmpNumber = number.toFixed(toFixed);
  }

  let output = tmpNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  return null !== suffix ? output + suffix : output;
};

/**
 * Converting bytes to readable format
 * @param {number|null} bytes Byte for converting
 * @param {boolean} isThousand Select work mode: true - 1000 bytes in kilobyte, false - 1024
 * @param {number} afterDot Amount of numbers after dot
 * @return {string|null}
 */
export const formatBytes = (bytes = null, isThousand = false, afterDot = 2) => {
  if (null === bytes) {
    return null;
  }
  const thresh = isThousand ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = isThousand
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

  let u = -1;
  const r = 10 ** afterDot;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(afterDot) + ' ' + units[u];
};
