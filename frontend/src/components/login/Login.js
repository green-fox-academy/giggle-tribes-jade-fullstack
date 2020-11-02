import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Login.css';
import { loginAction } from '../../actions/LoginAction';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let userData = this.state;
    const { history } = this.props;

    this.props.login(userData).then(success => {
      if (success) {
        history.push('/kingdom/buildings');
      }
    });
  }

  handleUsername(e) {
    let value = e.target.value;
    this.setState(prevState => ({ ...prevState, username: value }));
  }

  handlePassword(e) {
    let value = e.target.value;
    this.setState(prevState => ({ ...prevState, password: value }));
  }

  render() {
    return (
      <div className="login">
        <div className="title">
          <h2>Tribes of Vulpes</h2>
        </div>

        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                name="username"
                autoComplete="username"
                placeholder="Username"
                onChange={this.handleUsername}
              ></input>
            </div>

            <div>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                onChange={this.handlePassword}
              ></input>
            </div>

            <div className="submitLine">
              {this.props.error && (
                <div className="errorMessage">{this.props.error}</div>
              )}
              <button type="submit" className="loginButton">
                SIGN IN
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ error }) => {
  return { error };
};

const mapDispatchToProps = dispatch => {
  return {
    login: data => {
      return dispatch(loginAction(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
