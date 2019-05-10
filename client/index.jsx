import '@babel/polyfill';
import App from 'cerebral';
import { Container } from '@cerebral/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './views/Home';
import { presenter } from './presenter/presenter';
import Devtools from 'cerebral/devtools';

const cerebralApp = App(presenter, {
  devtools: Devtools({
    host: 'localhost:8585',
  }),
});

ReactDOM.render(
  <Container app={cerebralApp}>
    <Home />
  </Container>,
  document.querySelector('#app'),
);
