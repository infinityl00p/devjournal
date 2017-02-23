import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import SharedEntryView from './components/SharedEntryView';

const routes = [
  <Route key="/" path="/" component={App} />,
  <Route key="shared" path="s/:hash" component={SharedEntryView} />
];

export default routes;
