import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import SharedEntryView from './components/JournalPage/SharedEntryView';
import TodoList from './components/todo/TodoList';
import ProfilePage from './components/ProfilePage/ProfilePage';

const routes = [
  <Route key="/" path="/" component={App} />,
  <Route key="shared" path="s/:hash" component={SharedEntryView} />,
  <Route key="todo" path="todo" component={TodoList} />,
  <Route key="/profile" path="/profile" component={ProfilePage} />
];

export default routes;
