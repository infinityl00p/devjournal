import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import SharedEntryView from './components/SharedEntryView';
import TodoList from './components/todo/TodoList';

const routes = [
  <Route key="/" path="/" component={App} />,
  <Route key="shared" path="s/:hash" component={SharedEntryView} />,
  <Route key="todo" path="todo" component={TodoList} />
];

export default routes;
