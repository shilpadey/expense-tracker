import React, {  useRef , useEffect } from 'react';
import { GoMarkGithub } from "react-icons/go";
import { CiGlobe } from "react-icons/ci";
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const token = localStorage.getItem('token');
  const nameInputRef = useRef();
  const photoInputRef = useRef();

  const autoUpdateData = async() => {
    try{
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDrZuldfNKHWl4qpbWeXSfzCwU0mG2Wb7s",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(res.ok){
        const data = await res.json();
        data.users.forEach(element => {
          nameInputRef.current.value = element.displayName;
          photoInputRef.current.value = element.photoUrl;
        });
      }else{
        const data = await res.json();
        alert(data.error.message);
      }
    }catch (err){
      console.log(err);
    }
  };

  useEffect(() => {
    autoUpdateData();
  })


  const updateProfileHandler = async(event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl = photoInputRef.current.value;

    try{
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDrZuldfNKHWl4qpbWeXSfzCwU0mG2Wb7s',
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: token,
            displayName: enteredName,
            photoUrl: enteredPhotoUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type" : "application/json",
          },
        }
      )
      if(response.ok){
        const data = await response.json();
        console.log("Updated successfully");
        console.log(data);
        nameInputRef.current.value = "";
        photoInputRef.current.value = "";
      }else{
        const data = await response.json();
        alert(data.error.message);
      }
    }catch (err){
      console.log(err);
    }
  };


  return (
    <form className={classes.form} onSubmit={updateProfileHandler}>
      <h3>Contact Details</h3>
      <div className={classes.control}>
        <GoMarkGithub size={25} />
        <label>Full name: </label>
        <input type="text" ref={nameInputRef} required/>
      </div>
      <div className={classes.control}>
        <CiGlobe size={25}/>
        <label>Profile Photo URL: </label>
        <input type='url' ref={photoInputRef} required/>
      </div>
      <div className={classes.action}>
        <button>Update</button>
      </div>
    </form>
  );
}

export default ProfileForm;
