import React, { Component } from 'react';
import './registration.css';
import { withRouter } from 'react-router-dom';


class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
              username: '',
              password: '',
              kingdomname: '',
              error: ''            
          };
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleUsername = this.handleUsername.bind(this);
          this.handlePassword = this.handlePassword.bind(this);
          this.handleKingdomname = this.handleKingdomname.bind(this);
        }


        handleSubmit(event) {

          event.preventDefault();

            let userData = this.state;
            const { history } = this.props;

            fetch('http://localhost:5000/api/users',{
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
              }).then(response => 
                response.json()
                ).then(data => {
                  
                  if(data.error){
                    this.setState(prevState => (
                      {...prevState, error: data.error}
                    ))
                    // history.push('/registration');
                  }else{
                    history.push('/login');
                  }
                }
              )
        }

        handleUsername(e){
          let value = e.target.value;
          this.setState( prevState => (
            {...prevState, username: value
          }))
        }

        handlePassword(e){
          let value = e.target.value;
          this.setState( prevState => (
            {...prevState, password: value
          }))
        }

        handleKingdomname(e){
          let value = e.target.value;
          this.setState( prevState => (
            {...prevState, kingdomname: value
          }))
        }
        
        validUsername(){
          return (this.state.username.length > 0)
        }

        validPassword(){
          return !(String(this.state.password).length < 8);
        }


        validKingdomname(){
          return !(String(this.state.kingdomname).length < 1)
        }
        

        render() {
          
          return (<div className="container">
        
            <div className="title">
            <h2>Tribes of Vulpes</h2>
            </div>

            <div className="form">
                <form 
               
                onSubmit = {this.handleSubmit}>
                    <div>
                    <input type="text" name="username" className={this.validUsername() ? "green" : "red"} placeholder="Username" onChange = {this.handleUsername}>
                    </input>
                    {/* {!this.validUsername() && <div className="redimage"><span>Username must be at least 1 character long!</span></div>} */}
                    </div>

                    <div>
                    <input type="password" name="password" className={this.validPassword() ? "green" : "red"} placeholder="Password" onChange = {this.handlePassword}>
                    </input>
                    {/* {!this.validPassword() && <div className="redimage"><span>Password must be at least 8 characters long!</span></div>} */}
                    </div>

                    <div className="kingdom">
                    <input type="text" name="kingdomname" className={this.validKingdomname() ? "green" : "red"} placeholder="Kingdom name" onChange = {this.handleKingdomname}>
                    </input>
                    {/* {!this.validKingdomname() && <div className="redimage"><span>Kingdom name must be at least 1 character long!</span></div>} */}
                    </div>

                    <div className="submitLine">
                    {this.state.error && <div className="errorMessage">{this.state.error}</div>}
                    <button type="submit" className="button">SIGN UP</button>
                    
                    
                    </div>

                </form>
            </div>
          </div>
        );
    }
}

export default withRouter(Registration);
