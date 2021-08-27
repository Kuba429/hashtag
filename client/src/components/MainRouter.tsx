import React from "react";
import { Switch, Route } from "react-router";

import Home from "../pages/Home";
export default function MainRouter() {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/test" exact>
                <h1>test</h1>
            </Route>
        </Switch>
    );
}
