import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";



export default function Login({handleUsername, handleSubmit}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length >= 0 && password.length >= 0;
  }





  return (
    <div>
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
        />
        <Button block bsSize="large" onClick = {handleSubmit} >
          Login
          </Button>
    </div>
  );
}
