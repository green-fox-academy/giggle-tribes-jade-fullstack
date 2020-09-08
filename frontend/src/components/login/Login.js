import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import './Login.css';

class Login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let userData = this.state;
    const { history } = this.props;

    fetch('http://localhost:5000/api/sessions', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.setState(prevState => ({ ...prevState, error: data.error }));
        } else {
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
              /*className={this.validUsername() ? 'green' : 'red'}*/
              placeholder="Username"
              onChange={this.handleUsername}>
            </input>
          </div>

          <div>
            <input
              type="password"
              name="password"
              /*className={this.validPassword() ? 'green' : 'red'}*/
              placeholder="Password"
              onChange={this.handlePassword}>
            </input>
          </div>

          <div className="submitLine">
            {this.state.error && (
              <div className="errorMessage">{this.state.error}</div>
            )}
            <button type="submit" className="registrationButton">
              SIGN IN
            </button>
          </div>
        </form>
      </div>
    </div>    
  );
}
}

export default withRouter(Login);

// };

// export default Login;
