import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function Overall() {
  const selected = useSelector((state) => state.files.selected);

  return (
    <Accordion style={{ boxShadow: 'none' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>Overall Summary</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {selected.main && (
          <Box>
            <Typography>Total Wall Time (microseconds): {selected.main.wt}</Typography>
            {selected.main.cpu && <Typography>Total CPU Time (microseconds): {selected.main.cpu}</Typography>}
            {selected.main.mu && <Typography>Total Memory Usage (bytes): {selected.main.mu}</Typography>}
            {selected.main.pmu && <Typography>Total Peak Memory Usage (bytes): {selected.main.pmu}</Typography>}
            <Typography>Number of Function Calls: {selected.callsTotal}</Typography>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
