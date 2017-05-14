import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import SharedEntryView from './components/JournalPage/SharedEntryView';
import TodoList from './components/todo/TodoList';
import ProfilePage from './components/ProfilePage/ProfilePage';
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';

function loggedIn() {
  var loggedIn = localStorage.getItem('userId');
  //Comparison is string number
  if (loggedIn && loggedIn != 0) {
    return true;
  } else {
    return false;
  }
}

function requireAuth(nextState, replace) {
  if (loggedIn() && nextState.location.pathname === "/login") {
    //TODO: use bootstrap flash or bootstrap notice
    alert("already logged in, redirecting...");
    replace({
      pathname: '/todo'
    });
  }
  else if (!loggedIn() && nextState.location.pathname != "/login") {
    replace({
      pathname: '/login'
    });
  }
}

const routes = [
  <Route key="/" path="/" component={App} onEnter={requireAuth} />,
  <Route key="shared" path="s/:hash" component={SharedEntryView} />,
  <Route key="todo" path="todo" component={TodoList} onEnter={requireAuth} />,
  <Route key="profile" path="profile" component={ProfilePage} onEnter={requireAuth} />,
  <Route key="login" path="login" component={LoginPage} onEnter={requireAuth} />,
  <Route key="createaccount" path="createaccount" component={CreateAccountPage} />
];

export default routes;

