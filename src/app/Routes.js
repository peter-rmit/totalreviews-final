
import React, { useState, useEffect } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";

import {
    Login, AdminAuthPage, AdminBasePage,
    ForgotPassword, ResetPassword
} from './modules/AdminDashboard/Auth';

import { Dashboard } from '../app/modules/AdminDashboard/pages';
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";


export function Routes() {
    const { isAuthorized } = useSelector(
        ({ auth }) => ({
            isAuthorized: auth.user != null,
        }),
        shallowEqual
    );
    const isAdmin = useSelector((state) => state.auth.isAdmin, shallowEqual);

    return (
        <div>
            <article>
                <h1>Site Temporarily Unavailable</h1>
                <div>
                    <p>Sorry for the inconvenience but our website is temporarily unavailable. If you need to you can always <a href="mailto:admin@totalreviews.com.au">contact us</a>!</p>
                    <p>&mdash; Total Reviews</p>
                </div>
            </article>
        </div>
        // isAdmin !== undefined && isAdmin === false ? (
        //     <Switch>
        //         {!isAuthorized ? (
        //             /*Render auth page when user at `/auth` and not authorized.*/
        //             <Route>
        //                 <AuthPage />
        //             </Route>
        //         ) : (
        //             /*Otherwise redirect to root page (`/`)*/
        //             <Redirect from="/auth" to="/" />
        //         )}

        //         <Route path="/error" component={ErrorsPage} />
        //         <Route path="/logout" component={Logout} />


        //         {!isAuthorized ? (
        //             /*Redirect to `/auth` when user is not authorized*/
        //             <Redirect to="/auth/login" />
        //         ) : (
        //             <Layout>
        //                 <BasePage />
        //             </Layout>
        //         )}

        //     </Switch>
        // ) :
        //     isAdmin !== undefined && isAdmin === true ? (
        //         <Switch>

        //             {!isAuthorized ? (
        //                 /*Render admin page when user at `/admin` and not authorized.*/
        //                 <Route>
        //                     <AdminAuthPage />
        //                 </Route>
        //             ) : (
        //                 <>
        //                     <Route path="/error" component={ErrorsPage} />
        //                     <Route path="/logout" component={Logout} />
        //                     <AdminBasePage />
        //                 </>
        //             )}
        //         </Switch >
        //     )
        //         :
        //         <Switch>
        //             <Route exact path="/admin" component={Login} />
        //             <Route path="/admin/forgot-password" component={ForgotPassword} />
        //             <Route path="/admin/reset-password" component={ResetPassword} />
        //             <Route>
        //                 <AuthPage />
        //             </Route>
        //         </Switch>
    )
}
