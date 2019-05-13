import { connect } from '@cerebral/react';
import { state } from 'cerebral';
import React from 'react';
import { LocationListItem } from './LocationListItem';
import { Box } from 'bloomer';
export const ResultsList = connect(
  {
    locations: state.locationsList,
  },
  ({ locations }) => {
    return (
      <Box>
        {!!locations.length && <span>Search Results</span>}
        <ul>
          {locations.map((location, i) => (
            <li key={i}>
              <LocationListItem location={location} />
            </li>
          ))}
        </ul>
      </Box>
    );
  },
);
