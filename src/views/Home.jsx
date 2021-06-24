import { Alerts } from './Alerts';
import { AppHeader } from './Header';
import { Foot } from './Footer';
import { ResultsList } from './ResultsList';
import { SearchByCity } from './SearchByCity';
import React from 'react';

export const Home = () => (
  <React.Fragment>
    <AppHeader />
    <Alerts />
    <SearchByCity />
    <ResultsList />
    <Foot />
  </React.Fragment>
);
