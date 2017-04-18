import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import SharedEntryView from './components/JournalPage/SharedEntryView';
import TodoList from './components/todo/TodoList';
import ProfilePage from './components/ProfilePage/ProfilePage';
import LoginPage from './components/LoginPage';

function loggedIn() {
  //if user is logged in return true
  //else return false
  return true;
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}


const routes = [
  <Route key="/" path="/" component={App} onEnter={requireAuth} />,
  <Route key="shared" path="s/:hash" component={SharedEntryView} />,
  <Route key="todo" path="todo" component={TodoList} onEnter={requireAuth} />,
  <Route key="profile" path="profile" component={ProfilePage} onEnter={requireAuth} />,
  <Route key="login" path="login" component={LoginPage} />
];

export default routes;
