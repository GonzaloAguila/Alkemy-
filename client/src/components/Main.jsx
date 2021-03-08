import React from "react";
import {Route, Switch} from "react-router-dom"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import Home from "./Home"
import newOperation from "./newOperation"

export default function Main() {

    return(
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/newOperation" component={newOperation}/>
        </Switch>
    )
}