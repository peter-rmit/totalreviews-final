import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";

import { Dashboard } from '../pages';

export default function AdminBasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen />}>
            <Switch>
                <Route path="/admin/dashboard" component={Dashboard} />
                <Redirect from="/admin" to="/admin/dashboard" />
                <Redirect from="/" to="/admin/" />
                <Redirect to="error/error-v1" />
            </Switch>
        </Suspense>
    );
}
