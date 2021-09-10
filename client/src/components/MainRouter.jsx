import React from "react";
import { Switch, Route } from "react-router";
import ByTag from "../pages/ByTag";

import Home from "../pages/Home";
export default function MainRouter() {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/tag/:tag" exact>
                <ByTag />
            </Route>
        </Switch>
    );
}
