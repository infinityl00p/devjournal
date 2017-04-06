import React, { Component } from 'react';
import * as actionCreators from '../actions/index';

// TODO: add loged in to global state; add logic to redirect here if not logged in.
export default class LoginPage extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
        email: '',
        password: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    var user = {
      email: this.state.email,
      password: this.state.password
    }
    // TODO: redirect only on login, catch login errors and display message
    actionCreators.loginUser(user);

  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return(
      <div id="login-page" className="col-md-12">
        <form className="form-signin col-md-4 col-md-offset-4" onSubmit={this.handleSubmit} >
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input value={this.state.email} onChange={this.handleEmailChange} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input value={this.state.password} onChange={this.handlePasswordChange} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <div className="checkbox">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    );
  }
}
