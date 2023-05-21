import {  useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { authActions } from '../../redux-store/auth';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const dispatch = useDispatch();
  
  const history = useHistory()
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading , setIsLoading] = useState(false);

  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async(event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    //const enteredConfirmPassword = confirmPasswordRef.current.value;


    setIsLoading(true);
    if(isLogin){
        try{
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrZuldfNKHWl4qpbWeXSfzCwU0mG2Wb7s',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        returnSecureToken: true,
                    }),
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                },
            )
            if(response.ok){
                setIsLoading(false);
                const data = await response.json();

                alert("User has successfully Loged in.");
                localStorage.setItem('token' , data.idToken);
                localStorage.setItem("userID", data.localId);
                dispatch(authActions.login(data.idToken));
                emailInputRef.current.value = "";
                passwordInputRef.current.value = "";
                setIsLogin(true);
                history.replace('/home');
            }else{
                setIsLoading(false);
                const data = await response.json();
                alert(data.error.message);
                emailInputRef.current.value = null;
                passwordInputRef.current.value = null;
            }
            
        }catch (err) {
            alert(err);
        }
    }else {
        if(enteredPassword !== confirmPasswordRef.current.value){
            setIsLoading(false);
            passwordInputRef.current.value = null;
            confirmPasswordRef.current.value = null;
            alert("Password doesn't match!");
        }else{
            try{
                const res = await fetch(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrZuldfNKHWl4qpbWeXSfzCwU0mG2Wb7s ',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            email : enteredEmail,
                            password : enteredPassword,
                            returnSecureToken : true,
                        }),
                        headers : {
                        'Content-Type' : 'application/json',
                        },
                    },
                )
                if(res.ok){
                    setIsLoading(false);
                    alert("User has successfully signed up.");
                    emailInputRef.current.value = "";
                    passwordInputRef.current.value = "";
                    confirmPasswordRef.current.value = "";
                    setIsLogin(false);
                }else{
                    setIsLoading(false);
                    const data = await res.json();
                    alert(data.error.message);
                }
            }catch(err) {
                alert(err);
            }
        }
    }
  };


  return (
    <section>
      <div className={classes.form}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
          <div className={isLogin? classes.input : classes.control}>
            <input type='email' placeholder='Email' htmlFor='email' ref={emailInputRef} required />
          </div>
          <div className={isLogin? classes.input : classes.control}>
            <input 
              type='password' 
              placeholder='Password'
              htmlFor='password' 
              minLength='6' 
              maxLength='16'
              ref={passwordInputRef}
            required />
          </div>
          <div className={classes.control}>
            {!isLogin && (<input 
                type="password" 
                placeholder="Confirm Password" 
                htmlFor="password"
                minLength="6"
                maxLength="16" 
                ref={confirmPasswordRef}
                required
            />)}
          </div>
          <div className={classes.actions}>
            {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
            {isLoading && <p>Sending Request...</p>}
            {isLogin && <Link to='/forget-password'>Forget Password</Link>}
          </div>
        </form>
      </div>
      <div className={classes.login} onClick={switchHandler}>
        <button>
          {isLogin ? 'Dont have an account? SignUp' : 'Have an account?Login'}
        </button>
      </div>
    </section>
  );
};

export default AuthForm;
