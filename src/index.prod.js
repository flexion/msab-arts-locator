(function() {
  var childProcess = require('child_process');
  var oldSpawn = childProcess.spawn;
  function mySpawn() {
    console.log('spawn called');
    console.log(arguments);
    var result = oldSpawn.apply(this, arguments);
    return result;
  }
  childProcess.spawn = mySpawn;
})();

import '@babel/polyfill';
import App from 'cerebral';
import { Container } from '@cerebral/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './views/Main';
import { presenter } from './presenter/presenter';
import { route, router } from './router';

presenter.providers.router = {
  route,
};
const cerebralApp = App(presenter);
router.initialize(cerebralApp);
ReactDOM.render(
  <Container app={cerebralApp}>
    <Main />
  </Container>,
  document.querySelector('#app'),
);
