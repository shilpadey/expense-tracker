import React, { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

import classes from './VerifyEmail.module.css';

const VerifyEmail = () => {
    const authCtx = useContext(AuthContext);
    const [ emailVerified, setEmailVerified ] = useState(false);

    const sentVerificationHandler = async() => {
        try{
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAWKUk44IYxrW_ootO-9v0x-K784qaGZgA',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken: authCtx.token,
                        requestType: "VERIFY_EMAIL",
                        returnSecureToken: true,
                    }),
                    headers: {
                        "Content-Type" : "application/json",
                    },
                },
            )
            if(response.ok){
                const data = await response.json();
                console.log(data);
                console.log("verification sent!");
                setEmailVerified(false);
            }else{
                const data = await response.json();
                console.log(data.error.message);
                if(data.error.message === 'EMAIL_NOT_FOUND'){
                    alert('please check your email address and provide correct email address');
                }else{
                    alert('Please try again after sometime.');
                }
            }
        }catch (err){
            console.log(err);
        }
    }

    return (
        <section className={classes.section}>
            {!emailVerified && <h3> Please verify your Email </h3>}
            {!emailVerified && <button onClick={sentVerificationHandler}>Verify</button>}
        </section>
        
    );

};

export default VerifyEmail;