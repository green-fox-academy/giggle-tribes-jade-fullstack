import React, { Component } from 'react';
import './registration.css';
// import render from 'react-dom';
// import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


class Registration extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            newUser: {
              username: '',
              password: '',
              kingdomname: ''
            }
          };
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleUsername = this.handleUsername.bind(this);
          this.handlePassword = this.handlePassword.bind(this);
          this.handleKingdomname = this.handleKingdomname.bind(this);
        }


        handleSubmit(event) {

          event.preventDefault();

            let userData = this.state.newUser;
            //let history = useHistory();
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
                    alert(data.error)
                  }else{
                    alert("welcome " + data.username)
                   history.push('/login');
                  }
                }   
              )
        }

        handleUsername(e){
          let value = e.target.value;
          this.setState( prevState => ({ newUser :
            {...prevState.newUser, username: value
            }
          }))
        }

        handlePassword(e){
          let value = e.target.value;
          this.setState( prevState => ({ newUser :
            {...prevState.newUser, password: value
            }
          }))
        }

        handleKingdomname(e){
          let value = e.target.value;
          this.setState( prevState => ({ newUser :
            {...prevState.newUser, kingdomname: value
            }
          }))
        }
        
        validUsername(){
          return (this.state.newUser.username.length > 0)
        }

        validPassword(){
          return !(String(this.state.newUser.password).length < 8);
        }


        validKingdomname(){
          return !(String(this.state.newUser.kingdomname).length < 1)
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
                    <div className={this.validUsername() ? "" : "redimage"}><span className={this.validUsername() ? "alertnotext" : ""}>Username must be at least 1 character long!</span></div>
                    </div>

                    <div>
                    <input type="password" name="password" className={this.validPassword() ? "green" : "red"} placeholder="Password" onChange = {this.handlePassword}>
                    </input>
                    <div className={this.validPassword() ? "" : "redimage"}><span className={this.validPassword() ? "alertnotext" : ""}>Password must be at least 8 characters long!</span></div>
                    </div>

                    <div className="kingdom">
                    <input type="text" name="kingdomname" className={this.validKingdomname() ? "green" : "red"} placeholder="Kingdom name" onChange = {this.handleKingdomname}>
                    </input>
                    <div className={this.validKingdomname() ? "" : "redimage"}><span className={this.validKingdomname() ? "alertnotext" : ""}>Kingdom name must be at least 1 character long!</span></div>
                    </div>

                    <div className="submitLine">
                    <button type="submit" className="button">SIGN UP</button>
                    </div>

                </form>
            </div>
          </div>
        );
    }
}

export default withRouter(Registration);
