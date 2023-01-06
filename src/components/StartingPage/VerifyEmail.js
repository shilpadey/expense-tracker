import React, { useEffect , useState } from "react";
import { FcOk } from "react-icons/fc";

import classes from './VerifyEmail.module.css';

const VerifyEmail = () => {
    const token = localStorage.getItem('token');
    const [ checkVerified, setVerified ] = useState(false);

    const autoVerifyEmailCheck = async () => {
        try {
          const res = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAWKUk44IYxrW_ootO-9v0x-K784qaGZgA",
            {
              method: "POST",
              body: JSON.stringify({
                idToken: token,
                oobCode: "User Verified. Thank you!!",
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.ok) {
            const data = await res.json();
            console.log(data.emailVerified);
            console.log("Send success");
            if (data.emailVerified) {
              setVerified(true);
            }
          }
        } catch (err) {
          console.log(`Error = ${err}`);
        }
    };

    useEffect(() => {
        autoVerifyEmailCheck();
    });

    const sentVerificationHandler = async() => {
        try{
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAWKUk44IYxrW_ootO-9v0x-K784qaGZgA',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken: token,
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
                setVerified(false);
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
            {!checkVerified && <h3> Please verify your Email </h3>}
            {!checkVerified && <button onClick={sentVerificationHandler}>Verify</button>}
            {checkVerified && (
                <div> 
                    <p>Your Email is Verified </p>
                    <FcOk size="25px" className={classes.img}/>
                    <p>Please visit the profile page</p>
                </div>
            )}
        </section>
        
    );

};

export default VerifyEmail;