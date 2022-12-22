import React , { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import classes from './ForgetPassword.module.css';

const ForgetPassword = () => {
    const history = useHistory()
    const emailInputRef = useRef();
    const [ isLoading , setIsLoading ] = useState(false);

    const resetPasswordHandler = async(event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;

        setIsLoading(true);
        try{
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAWKUk44IYxrW_ootO-9v0x-K784qaGZgA',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        requestType: "PASSWORD_RESET",
                        email: enteredEmail,
                        returnSecureToken: true,
                    }),
                    headers: {
                        "Content-Type" : "application/json",
                    },
                }
            )
            if(response.ok){
                setIsLoading(false);
                const data = await response.json();
                console.log(data);
                alert('Link sent successfully. Please check your mail');
                history.replace('/auth');
            }else{
                setIsLoading(false);
                const data = await response.json();
                alert (data.error.message);
            }
        }catch (err) {
            console.log(err);
        }
    };

    const loginPageHandler = () => {
        history.replace('/auth');
    };

    return (
        <section className={classes.form}>
            <h2>Reset Password</h2>
            <form onSubmit={resetPasswordHandler}>
                <div className={classes.control}>
                    <h5>Enter your registerd Email ID</h5>
                    <div>
                        <input 
                            type="email"
                            placeholder="Email"
                            ref={emailInputRef}
                            required
                        />
                    </div>
                </div>
                <div className={classes.actions}>
                    {!isLoading && <button>Send Link</button>}
                    {isLoading && <p>Sending Link...</p>}
                    <button type="button" onClick={loginPageHandler} className={classes.toggle}>
                        Have an account?Login
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ForgetPassword;