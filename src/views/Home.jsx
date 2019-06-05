import React from 'react';
import { SearchByCity } from './SearchByCity';
import { AppHeader } from './Header';
import { Foot } from './Footer';
import { ResultsList } from './ResultsList';
import { connect } from '@cerebral/react';
import { sequences } from 'cerebral';

export const Home = connect(
  {
    getGeoLocationSequence: sequences.getGeoLocationSequence,
  },
  ({ getGeoLocationSequence }) => {
    getGeoLocationSequence();
    return (
      <React.Fragment>
        <AppHeader />
        <SearchByCity />
        <ResultsList />
        <Foot />
      </React.Fragment>
    );
  },
);
