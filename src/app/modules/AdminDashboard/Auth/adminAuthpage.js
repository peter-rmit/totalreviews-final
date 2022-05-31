import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import Login from './login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

const AdminAuthPage = () => {
    return (
        <>
            <Switch>
                <Route path="/admin" component={Login} />
                <Route path="/admin/forgot-password" component={ForgotPassword} />
                <Route path="/admin/reset-password" component={ResetPassword} />
                <Redirect from="/" exact={true} to="/admin" />
                <Redirect to="/admin" />
            </Switch>
        </>
    );
}
export default AdminAuthPage;