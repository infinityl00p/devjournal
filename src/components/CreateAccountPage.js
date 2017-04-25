import React, { Component } from 'react';

export default class CreateAccountPage extends Component {
  constructor() {
    super();

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    //TODO: Email, Password, confirm password
    return(
      <div id="create-account-page" className="col-md-12 col-sm-12 col-xs-12">
        <form id="create-account-form" className="form-signin col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 col-xs-4 col-xs-offset-4"onSubmit={this.handleSubmit} >
          <h1 className="devjournal-title">Create an Account</h1>
          <label className="entry-field" htmlFor="inputEmail">Email address</label>
          <input value={this.state.email} onChange={this.handleEmailChange} id="email" type="email" className="form-control login-input" placeholder="eg. you@devjournal.co" required autofocus />
          <label className="entry-field" htmlFor="inputPassword">Password</label>
          <input value={this.state.password} onChange={this.handlePasswordChange} id="password" type="password" className="form-control" placeholder="*******" required />
          <label className="entry-field" htmlFor="inputPassword">Confirm Password</label>
          <input value={this.state.password} onChange={this.handlePasswordChange} id="password" type="password" className="form-control" placeholder="*******" required />
          <button className="btn btn-lg btn-info btn-block" type="submit">Create an Account</button>
        </form>
      </div>
    );
  }
}
