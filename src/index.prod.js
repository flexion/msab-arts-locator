import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Container } from '@cerebral/react';
import { Main } from './views/Main';
import { presenter } from './presenter/presenter';
import { route, router } from './router';
import App from 'cerebral';
import React from 'react';
import ReactDOM from 'react-dom';

presenter.providers.router = {
  route,
};
const cerebralApp = App(presenter);
router.initialize(cerebralApp);
ReactDOM.render(
  <Container app={cerebralApp}>
    <Main />
  </Container>,
  window.document.querySelector('#app'),
);
