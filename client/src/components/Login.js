import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./Login.css"


export default function Login({handleUsername, handleSubmit,handlePassword, tent}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  function validateForm() {
    return email.length >= 0 && password.length >= 0;
  }

  return (
    <body>
    <div className = "main">
      <p class = "sign" align="center">Sign In</p>
        <input
        id = "username"
        className = "un"
        type="text"
        placeholder = "Username"
        onChange = {handleUsername}
        />
        <input
        id = "password"
        className = "pass"
        type="password"
        placeholder = "password"
        onChange = {handlePassword}
        />
        <Button className = "submit" block bsSize="large" onClick = {handleSubmit} >
          Login
          </Button>

    </div>
    </body>
  );
}
