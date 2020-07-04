import React, { Component } from 'react';
import styles from './registration.css';
import { render } from 'react-dom';

class Registration extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        alert('This value is: ' + this.input.value);
        e.preventDefault();
    }

    render(){
        return (<div class="page">
        
            <div>
            <h2>Tribes of Vulpes</h2>
            </div>

            <div class="form">
                <form method="post" onSubmit = {this.handleSubmit}>
                    <div class="username">
                    <input type="text" name="username" placeholder="Username" ref={(input) => this.input = input} required>
                    </input>
                    </div>

                    <div class="password">
                    <input type="password" name="password" placeholder="Password" required>
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
