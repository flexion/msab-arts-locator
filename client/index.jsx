import '@babel/polyfill';
import App from 'cerebral';
import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'bloomer';

import { Home } from './views/Home';
import { presenter } from './presenter/presenter';

const cerebralApp = App(presenter);

ReactDOM.render(
  <Container app={cerebralApp}>
    <Home />
  </Container>,
  document.querySelector('#app'),
);
