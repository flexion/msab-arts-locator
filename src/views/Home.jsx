import React from 'react';
import { SearchByCity } from './SearchByCity';
import { AppHeader } from './Header';
import { Foot } from './Footer';
import { ResultsList } from './ResultsList';

export const Home = () => (
  <React.Fragment>
    <AppHeader />
    <SearchByCity />
    <ResultsList />
    <Foot />
  </React.Fragment>
);
