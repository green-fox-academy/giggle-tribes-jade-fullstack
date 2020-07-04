import React, { Component } from 'react';
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

        render() {
            return (<div class="container">
        
            <div class="title">
            <h2>Tribes of Vulpes</h2>
            </div>

            <div class="form">
                <form method="post" onSubmit = {this.handleSubmit}>
                    <div class="username">
                    <input type="text" name="username" placeholder="Username" required>
                    </input>
                    </div>

                    <div class="password">
                    <input type="password" name="password" placeholder="Password" required minLength="8">
                    </input>
                    </div>

                    <div class="kingdom">
                    <input type="text" name="kingdomname" placeholder="Kingdom name">
                    </input>
                    </div>

                    <div class="submitLine">
                    <button type="submit" class="button">SIGN UP</button>
                    </div>

                </form>
            </div>
        </div>
        );
    }
}

export default Registration;
