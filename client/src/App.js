import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PokemonDisplayer from "./components/PokemonDisplayer";
import HomePage from "./components/HomePage";
import Login from "./components/Login"
import add2Numbers from "./components/someRandomFileToTest"

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/demo">API Fetch demo</Link>
            </li>
            <li>
              <Link to="/login"> Teste </Link>
            </li>
            <li>
              <Link to="/sum">SUM</Link>
            </li>
          </ul>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/demo">
            <PokemonDisplayer />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/sum">
            <add2Numbers />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
