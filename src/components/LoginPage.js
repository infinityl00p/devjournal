import React, { Component } from 'react';
import * as actionCreators from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// TODO: add logged in to global state; add logic to redirect here if not logged in.
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.props.actions.getEntriesAndTags();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.loadCreateAccountPage = this.loadCreateAccountPage.bind(this);

    this.state = {
        email: '',
        password: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.journal.entries.user) {
      if(nextProps.journal.entries.user.loggedIn) {
        //good change for a redirect and store the cookies
      /*  var unsignedToken = base64url(header) + "." + base64url(data)
        JWT = unsignedToken + "." + base64url(HMAC256(unsignedToken, secret))*/
        alert("logged in")
      } else (
        alert("wrong username or password")
      )
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    var user = {
      email: this.state.email,
      password: this.state.password
    }

    // TODO: redirect only on login, catch login errors and display message
    this.props.actions.loginUser(user);
    /*
      shielded-basin-84367::DATABASE=> SELECT * FROM users;
      id |         email         | password
      ----+-----------------------+----------
      1 | sim@simbrar.com       | password
      2 | jamesgggill@gmail.com | password
      3 | james@devjournal.co   | jgjg!234
    */

}

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  loadCreateAccountPage() {
    location.href = "http://localhost:8080/createaccount";
  }

  render() {
    return(
      <div id="login-page" className="col-md-12 col-sm-12 col-xs-12">
        <form id="login-form" className="form-signin col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 col-xs-4 col-xs-offset-4"onSubmit={this.handleSubmit} >
          <h1 className="devjournal-title">Log in to Devjournal</h1>
          <label className="entry-field" htmlFor="inputEmail">Email address</label>
          <input value={this.state.email} onChange={this.handleEmailChange} id="email" type="email" className="form-control login-input" placeholder="eg. you@devjournal.co" required autofocus />
          <label className="entry-field" htmlFor="inputPassword">Password</label>
          <input value={this.state.password} onChange={this.handlePasswordChange} id="password" type="password" className="form-control" placeholder="*******" required />
          <div className="checkbox">
            <label className="remember-me">
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-info btn-block" type="submit">Sign in</button>
          <button className="btn btn-info btn-block btn-sm" onClick={this.loadCreateAccountPage}> Create an Account </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
