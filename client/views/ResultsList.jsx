import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';
import { Box } from 'bloomer';
export const ResultsList = connect(
  {
    locations: state.locationsList,
  },
  ({ locations }) => {
    return (
      <Box>
        <ol>
          {locations.map((location, i) => (
            <li key={i}>{location.name}</li>
          ))}
        </ol>
      </Box>
    );
  },
);
