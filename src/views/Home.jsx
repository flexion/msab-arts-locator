import { Alerts } from './Alerts';
import { AppHeader } from './Header';
import { Foot } from './Footer';
import { ResultsList } from './ResultsList';
import { SearchByCity } from './SearchByCity';
import React from 'react';

export const Home = () => (
  <>
    <AppHeader />
    <Alerts />
    <SearchByCity />
    <ResultsList />
    <Foot />
  </>
);
