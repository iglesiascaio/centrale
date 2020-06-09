import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage2 from "./components/HomePage2";
import Login from "./components/Login"
import { useHistory } from 'react-router-dom';
import axios from "axios"


function App2() {


  const [user, setUser] = useState({
    username_aux: -1,
    username: -1
  });

  const handleUsername = (e) => {
    let username = e.target.value;
    setUser(prevState => {
      return {...prevState, user_aux:username}
    })
    console.log(username)
  }


  const handleSubmit = (e) => {
    setUser(prevState => {
      let username = prevState.user_aux
      if(username == 'matheus'){
        return {username_aux:-1, username:prevState.user_aux}
      }else{
        return {username_aux:-1, username:-1}
      }
    })

    console.log(user.username)
  }

  const handleLogOut = (e) => {
    setUser(prevState=>{
      return {...prevState,username: -1}
    })
  }

  return(
    <Router>
      <div>
        <nav>

              {(user.username != -1)?<Link to='/' className= "TopBar" onClick={handleLogOut}>Log Out</Link>:false}
              <Link to="/" className="TopBar">Sign Up</Link>
              {(user.username != -1)?<Link to="/" className="TopBar"> Home </Link> :false}

        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {(user.username != -1 )? <Route exact path="/">
            <HomePage2 />
          </Route>
        : <Route exact path = '/'><Login handleUsername = {handleUsername} handleSubmit = {handleSubmit}/></Route>}

          <Route exact path="/Login">
            <Login handleUsername = {handleUsername} handleSubmit = {handleSubmit}/>
          </Route>



        </Switch>
      </div>
    </Router>
  )
}

export default App2;
