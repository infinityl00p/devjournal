import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import SharedEntryView from './components/journal/SharedEntryView';
import TodoList from './components/todo/TodoList';
import ProfilePage from './components/profile/ProfilePage';
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';

function loggedIn() {
  var name = "userId=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  var c = ca[0];
  var loggedIn = c.substring(name.length, c.length);
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
      pathname: '/'
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

