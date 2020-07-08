import React, { Component, useState } from 'react';
import styles from './registration.css';
import { render } from 'react-dom';
import { useHistory } from 'react-router-dom';

class Registration extends Component {

    constructor(props) {
        super(props);
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
            let userData = this.state.newUser;

            fetch('/login',{
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
              }).then(response => {
                response.json().then(data =>{
                  console.log("Successful" + data);
                })
            })   
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
          
          if(value.length < 8){
            console.log("password is too short")
          }else{
            this.setState( prevState => ({ newUser :
              {...prevState.newPassword, password: value
              }
            }))
          }
        }


        handleKingdomname(e){
          let value = e.target.value;
          this.setState( prevState => ({ newUser :
            {...prevState.newKingdomname, kingdomname: value
            }
          }))
        }


        render() {
            return (<div className="container">
        
            <div className="title">
            <h2>Tribes of Vulpes</h2>
            </div>

            <div className="form">
                <form method="post" onSubmit = {this.handleSubmit}>
                    <div className="username">
                    <input type={"text"} name={"username"} placeholder={"Username"} required onChange = {this.handleUsername}>
                    </input>
                    </div>

                    <div className="password">
                    <input type="password" name="password" placeholder="Password" required onChange = {this.handlePassword} minLength="8">
                    </input>
                    </div>

                    <div className="kingdom">
                    <input type="text" name="kingdomname" placeholder="Kingdom name" onChange = {this.handleKingdomname}>
                    </input>
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

export default Registration;
