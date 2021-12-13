import lodash from 'lodash';

/**
 * Convert JSON to array with calculated details
 * @param json
 * @return {{
 *  callsTotal: number,
 *  output: [{
 *    parent: text,
 *    function: text,
 *    child: text,
 *    calls: number,
 *    wtime: number,
 *    cpu: number,
 *    mem_usage: number,
 *    mem_usage_peek: number,
 *    calls_perc: number,
 *    wtime_perc: number,
 *    cpu_perc: number,
 *    mem_usage_perc: number,
 *    mem_usage_peek_perc: number
 *  }]
 * }}
 */
export const parseTableFromJson = (json) => {
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

    // Build object to push
    let item = {
      parent: parentChild[0],
      function: parentChild[1] ?? parentChild[0],
      calls: entry[1]['ct'],
      wtime: entry[1]['wt'],
      wtime_perc: (entry[1]['wt'] / main.wt) * 100,
    };

    if (item.parent === 'main()' && item.function === 'main()') {
      item.parent = '';
    }

    // XHPROF_FLAGS_CPU
    if ('cpu' in main) {
      item.cpu = entry[1]['cpu'];
      item.cpu_perc = (item.cpu / main.cpu) * 100;
    }

    // XHPROF_FLAGS_MEMORY
    if ('mu' in main) {
      item.mem_usage = entry[1]['mu'];
      item.mem_usage_perc = (item.mem_usage / main.mu) * 100;
    }
    if ('pmu' in main) {
      item.mem_usage_peek = entry[1]['pmu'];
      item.mem_usage_peek_perc = (item.mem_usage_peek / main.pmu) * 100;
    }

    // Append object to array
    output.push(item);
  });

  // Calculate percent of calls
  output.map((item) => {
    item.calls_perc = (item.calls / callsTotal) * 100;
  });

  // TODO: Here probably will also be need some additional operations

  return { callsTotal: callsTotal, output: output };
};

/**
 * Convert input JSON to tree format for D3.js chart
 * @param list
 */
export const parseTreeFromJson = (list) => {
  let map = {},
    node,
    roots = [],
    i;

  for (i = 0; i < list.length; i += 1) {
    map[list[i].function] = i; // initialize the map
    list[i].children = []; // initialize the children
    list[i].name = list[i].function;
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent !== '') {
      node.name = node.function;
      list[map[node.parent]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
};
