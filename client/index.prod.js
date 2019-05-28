import '@babel/polyfill';
import App from 'cerebral';
import { Container } from '@cerebral/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './views/Main';
import { presenter } from './presenter/presenter';

const cerebralApp = App(presenter);

ReactDOM.render(
  <Container app={cerebralApp}>
    <Main />
  </Container>,
  document.querySelector('#app'),
);
