/**
 * Convert JSON to array with calculated details
 * @param json
 * @return {[{
 *    function: text,
 *    parent: text,
 *    child: text,
 *    calls: number,
 *    calls_perc: number,
 *    wtime: number,
 *    wtime_perc: number,
 *    cpu: number,
 *    cpu_perc: number,
 *    mem_usage: number,
 *    mem_usage_perc: number,
 *    mem_usage_peek: number,
 *    mem_usage_peek_perc: number
 * }]}
 */
export const parseJson = (json) => {
  // Main object for calculation
  let main = json['main()'];

  // Extract entries from array
  let entries = Object.entries(json);

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

      // Default
      calls: entry[1]['ct'],
      wtime: entry[1]['wt'],
      wtime_perc: (entry[1]['wt'] / main['wt']) * 100,

      // XHPROF_FLAGS_MEMORY
      mem_usage: entry[1]['mu'] ?? null,
      mem_usage_perc: entry[1]['mu']
        ? (entry[1]['mu'] / main['mu']) * 100
        : null,
      mem_usage_peek: entry[1]['pmu'] ?? null,
      mem_usage_peek_perc: entry[1]['pmu']
        ? (entry[1]['pmu'] / main['pmu']) * 100
        : null,

      // XHPROF_FLAGS_CPU
      cpu: entry[1]['cpu'] ?? null,
      cpu_perc: entry[1]['cpu'] ? (entry[1]['cpu'] / main['cpu']) * 100 : null,
    });
  });

  // Calculate percent of calls
  output.map((entry) => {
    entry.calls_perc = (entry.calls / callsTotal) * 100;
  });

  // TODO: Here probably will also be need some additional operations

  return output;
};
