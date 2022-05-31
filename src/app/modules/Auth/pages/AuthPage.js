/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../_metronic/layout';
import '../../../../_metronic/_assets/sass/pages/login/classic/login-3.scss';

import Login from './Login';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import RatingPage from './userRatingPage';
import ThankyouPage from './thankyouPage';
import PrivacyPolicy from '../pages/PrivacyPolicy';

export function AuthPage() {
  return (
    <>
      <Switch>
        <ContentRoute path="/auth/login" component={Login} />
        <ContentRoute path="/auth/registration" component={Registration} />
        <ContentRoute path="/auth/forgot-password" component={ForgotPassword} />
        <ContentRoute path="/auth/reset-password/:token" component={ResetPassword} />
        <ContentRoute path="/auth/rating/:token" component={RatingPage} />
        <ContentRoute path="/auth/thankyou" component={ThankyouPage} />
        <ContentRoute path="/auth/thankyou" component={ThankyouPage} />
        <ContentRoute path="/privacy-policy" component={PrivacyPolicy} />

        <Redirect from="/auth" exact={true} to="/auth/login" />
        <Redirect to="/auth/login" />
      </Switch>
    </>
  );
}
