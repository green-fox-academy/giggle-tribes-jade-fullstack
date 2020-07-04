import React, { useState } from 'react';
import styles from './entryPage.module.css';
import sendRequest from '../services/sendRequest';
import validateRequiredInputs from '../services/validateRequiredInputs';
import alertSign from './alert_sign.png';
import { useHistory } from 'react-router-dom';

function Registration() {
    const [user, setUser] = useState({
        username: '',
        password: '',
        kingdomName: '',
    });

    const [errorMessage, setErrorMessage] = useState({
        message: '',
        isError: false,
    });

    let history = useHistory();

    const requiredFields = [user.username, user.password];

    async function handleSubmit(event) {
        event.preventDefault();
        const validationResult = validateRequiredInputs(
            'Username and Password are required.',
            requiredFields
        );
        if (validationResult.isError) {
            setErrorMessage(validationResult);
        } else if (validatePassword()) { } else {
            const path = '/register';
            const body = {
                username: user.username,
                password: user.password,
                kingdomName: user.kingdomName,
            };
            let { response, responseBody } = await sendRequest(path, body, 'POST');
            if (response.ok && !responseBody.errorMessage) {
                history.push('/login');
            } else {
                setErrorMessage({
                    message: responseBody.errorMessage,
                    isError: true,
                });
            }
        }
    }

    function validatePassword() {
        if (String(user.password).length < 8) {
            setErrorMessage({
                message: 'Password must be at least 8 characters.',
                isError: true,
            });
            return true;
        } else {
            return false;
        }
    }

    function handleInputChange(event) {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    return (<div className={styles.page}>
        <div>
            <h2 className={styles.title}> Tribes of Vulpes </h2> </div>

        <div className={styles.cardForm}> 
        
            <form onSubmit={handleSubmit} method="post">
                <div>
                    <input type="text"
                     name="username"
                     value={user.username}
                     placeholder="Username"
                     className={styles.defaultInput}
                     onChange={handleInputChange}/>
                </div>
                <div>
                    <input type="password"
                     name="password"
                     value={user.password}
                     placeholder="Password"
                     className={
                                errorMessage.isError ? styles.errorInput : styles.defaultInput
                            }
                            onChange={handleInputChange}
                            onBlur={validatePassword}/>
                </div>
                <div>
                    {
                    errorMessage.isError && (<div className={styles.errorLine}>
                    <span className={styles.errorMessage}> {errorMessage.message} </span>  
                    <img src={alertSign} alt="alert sign" className={styles.errorSign}/>
                    </div >)
                    } 
                </div>
                <div>
                    <input type="text"
                     name="kingdomName"
                     value={user.kingdomName}
                     placeholder="Kingdom name"
                     className={styles.defaultInput}
                     onChange={handleInputChange}/>
                </div>
                <div className={styles.submitLine}>
                    <button type="submit" className={styles.submit}> SIGN UP </button>  
                </div> 
                
                </form>
        </div>  
        </div >
    );
}

export default Registration;
