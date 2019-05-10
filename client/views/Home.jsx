import React from 'react';
import { SearchByCity } from './SearchByCity';
import { AppHeader } from './Header';
import { Footer } from './Footer';
import { ResultsList } from './ResultsList';
//import { Box } from 'bloomer';

export const Home = () => (
  <React.Fragment>
    <AppHeader />
    <SearchByCity />
    <ResultsList />
    <Footer />
  </React.Fragment>
);
