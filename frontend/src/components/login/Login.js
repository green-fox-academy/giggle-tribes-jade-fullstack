import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Login.css';
import { LoginActions } from '../../actions/LoginActions';


class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    // this.login = this.login(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let userData = this.state;
    const { history } = this.props;

    console.log(userData);
    this.props.login(userData).then(success => {
      if (success){
        history.push('/kingdom');
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

    render (){
      return(
    
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
                placeholder="Username"
                onChange={this.handleUsername}>
              </input>
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handlePassword}>
              </input>
            </div>

            <div className="submitLine">
              {this.state.error && (
                <div className="errorMessage">{this.state.error}</div>
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

// export default withRouter(Login);

const mapStateToProps = ({ kingdom, user }) => {
  return { kingdom, user };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (data) => {
      return dispatch(LoginActions(data));
    
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
