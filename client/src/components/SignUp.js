import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./SignUp.css"



export default function Login({handleUsername, handleSignUp, handlePassword}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length >= 0 && password.length >= 0 ;
  }





  return (
    <body>
    <div className = 'main'>
    <p class = "sign" align="center">Sign up</p>
        <input
        id = "username"
        className = "un"
        type="text"
        placeholder = "Username"
        onChange = {handleUsername}
        />
        <input
        id = "password"
        type="password"
        className = "pass"
        placeholder = "password"
        onChange = {handlePassword}
        />
        <input
        id = "confirmation"
        className = "pass"
        type="password"
        placeholder = "confirm password"
        />
        <Button className="submit" block bsSize="large" onClick = {handleSignUp} visible ={validateForm}>
          SignUp
          </Button>
    </div>
    </body>
  );
}
