import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage2 from "./components/HomePage2";
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import history from "./components/history"
import GettingStarted from "./components/GettingStarted";
import axios from 'axios'
import "./App2.css"

function App2() {

  const urlback = "https://lsrdn3h1i7.execute-api.eu-west-1.amazonaws.com/dev/"

  const [user, setUser] = useState({
    username_aux: -1,
    username: -1,
    pass_aux: -1,
    tent: 0

  });

  const handleUsername = (e) => {
    let username = e.target.value;
    setUser(prevState => {
      return {...prevState, user_aux:username}
    })
    console.log(username)
  }

  const handlePassword = (e) => {
    let password = e.target.value;
    setUser(prevState => {
      return {...prevState, pass_aux:password}
    })
    console.log(password)


  }


  const handleSubmit = (e) => {
    if(user.pass_aux == -1 || user.user_aux == -1){
      return false;
    }
    axios.get(urlback + 'login/' + user.user_aux + '/' + user.pass_aux).then(data => {

      if(data.data == 1){
        setUser(prevState => {
          return {...prevState,username_aux:-1, username:prevState.user_aux}
        })
      }else{
        alert("Wrong username or password")
        setUser(prevState => {
          return {...prevState, username:-1, tent: 1}
        })
      }

    })
    history.push('/')
  }

  const handleSignUp = (e) => {
    if(user.user_aux == -1 || user.pass_aux ==-1){
      return false;
    }
    axios.post(urlback + 'signup/'+ user.user_aux + '/' + user.pass_aux)
      setUser(prevState => {
        return {...prevState,username: prevState.user_aux}
      })

      history.push('/')

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

              {(user.username != -1 )? <Link to='/' className= "TopBar" onClick={handleLogOut}>Log Out</Link>:false}
              {(user.username == -1  )? <Link to="/Login" className="TopBar">Login</Link> : false}
              {(user.username == -1 )? <Link to="/SignUp" className="TopBar">Sign Up</Link> : false}
              {(user.username != -1 )? <Link to="/" className="TopBar"> Home </Link> :false}

        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {(user.username != -1 || user.username != -1 )? <Route path="/">
              <HomePage2 user = {user.username}/>
            </Route>

            : <Route exact path = '/'><Login handleUsername = {handleUsername} handleSubmit = {handleSubmit} handlePassword = {handlePassword} user = {user.username}/></Route>
          }


          {(user.username == -1 || user.username == -10) ? <Route exact path = '/Login'><Login handleUsername = {handleUsername} handleSubmit = {handleSubmit} handlePassword = {handlePassword} tent = {user.tent}/></Route>:false}

          <Route exact path="/SignUp">
            <SignUp handleUsername = {handleUsername} handleSignUp = {handleSignUp} handlePassword = {handlePassword}/>
          </Route>





        </Switch>
      </div>
    </Router>
  )
}

export default App2;
