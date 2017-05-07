import React, { Component } from 'react';
import * as actionCreators from '../actions/index';
import { EmailSignUpForm } from 'redux-auth/bootstrap-theme'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const LOGIN_PAGE_URL = "http://localhost:8080/login";

class CreateAccountPage extends Component {
  constructor() {
    super();

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.password === this.state.passwordConfirmation) {
      var user = {
        email: this.state.email,
        password: this.state.password,
      };

      this.props.actions.createUser(user);
      // TODO: error handling, before login
      alert("Account Successfully Created, Redirecting to login...");
      location.href = LOGIN_PAGE_URL;
    } else {
      alert("Passwords do not match");
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handlePasswordConfirmationChange(e) {
    this.setState({ passwordConfirmation: e.target.value})
  }

  render() {
    return(
      <div id="create-account-page" className="col-md-12 col-sm-12 col-xs-12">
        <form id="create-account-form" className="form-signin col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 col-xs-4 col-xs-offset-4" onSubmit={this.handleSubmit} >
          <h1 className="devjournal-title">Create an Account</h1>
          <label className="entry-field" htmlFor="inputEmail">Email address</label>
          <input value={this.state.email} onChange={this.handleEmailChange} id="email" type="email" className="form-control login-input" placeholder="eg. you@devjournal.co" required autofocus />
          <label className="entry-field" htmlFor="inputPassword">Password</label>
          <input value={this.state.password} onChange={this.handlePasswordChange} id="password" type="password" className="form-control" placeholder="*******" required />
          <label className="entry-field" htmlFor="inputPassword">Confirm Password</label>
          <input value={this.state.passwordConfirmation} onChange={this.handlePasswordConfirmationChange} id="password" type="password" className="form-control" placeholder="*******" required />
          **Note: Please save email and password for your records, a confirmation email will not be sent
          <button className="btn btn-lg btn-info btn-block" type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    journal: state
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountPage)
