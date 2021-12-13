import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { useSelector } from 'react-redux';

export default function TreeChart() {
  const [tree, setTree] = useState([]);
  const [currentSelected, setCurrentSelected] = useState({});
  const selected = useSelector((state) => state.files.selected);

  useEffect(function () {
    console.log(selected.tree);
    if (!!selected.json && currentSelected !== selected) {
      setTree(selected.tree);
      setCurrentSelected(selected);
    }
  });

  return (
    <div id="treeWrapper" style={{ width: '100vw', height: '100vh' }}>
      {!!tree && <Tree data={tree} />}
      {/*asd*/}
    </div>
  );
}
