import React from 'react';
import { SearchByCity } from './SearchByCity';
import { ResultsList } from './ResultsList';
import { Header } from './Header';
import { Footer } from './Footer';
import { Box } from 'bloomer';

export const Home = () => (
  <Fragment>
    <Header />
    <Box>
      <SearchByCity />
      <ResultsList />
    </Box>
    <Footer />
  </Fragment>
);
