import { AppHeader } from './Header';
import { Foot } from './Footer';
import { connect } from '@cerebral/react';
import React from 'react';

export const Curate = connect({}, () => {
  return (
    <>
      <AppHeader />
      <span>Curate goes here</span>
      <Foot />
    </>
  );
});
