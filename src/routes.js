import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import SharedEntryView from './components/SharedEntryView';
import LoginPage from './components/LoginPage';

const routes = [
  <Route key="/" path="/" component={App} />,
  <Route key="shared" path="s/:hash" component={SharedEntryView} />,
  <Route key="login" path="login" component={LoginPage} />
];

export default routes;
