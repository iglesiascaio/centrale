import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";



export default function Login({handleUsername, handleSignUp, handlePassword}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length >= 0 && password.length >= 0 ;
  }





  return (
    <div >
        <input
        id = "username"
        type="text"
        placeholder = "Username"
        onChange = {handleUsername}
        />
        <input
        id = "password"
        type="password"
        placeholder = "password"
        onChange = {handlePassword}
        />
        <input
        id = "confirmation"
        type="password"
        placeholder = "confirm password"
        />
        <Button block bsSize="large" onClick = {handleSignUp} visible ={validateForm}>
          SignUp
          </Button>
    </div>
  );
}
