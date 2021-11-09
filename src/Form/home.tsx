/* eslint import/newline-after-import: "off" */
import React from "react";
import SignUp from "./Component/Singup/Singup";
import SignIn from "./Component/Signin/Signin";
import List from "./Component/ListUser/List";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Style.css";
function App() {
  return (
    <>
      <div className="container-wrapper">
        <Router>
          <Switch>
            <Route path="/" exact>
              <SignUp />
            </Route>
            <Route path="/signin" exact>
              <SignIn />
            </Route>
            <Route path="/list" exact>
              <List />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}
export default App;
