import React from 'react';
import { SearchByCity } from './SearchByCity';
import { AppHeader } from './Header';
import { Foot } from './Footer';
import { ResultsList } from './ResultsList';
import { Geo } from './geo';
//import { Box } from 'bloomer';

export const Home = () => (
  <React.Fragment>
    <AppHeader />
    <SearchByCity />
    <ResultsList />
    <Foot />
    <Geo />
  </React.Fragment>
);
