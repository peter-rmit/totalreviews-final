import { Container } from '@material-ui/core';
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Helmet } from 'react-helmet';
import { login } from "../_redux/authCrud";
import * as auth from "../_redux/authRedux";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  email: "",
  password: "",
};

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {

  }, [showAlert])

  const toggleAlert = () => {
    setShowAlert(false);
  }


  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      // setTimeout(() => {
      login(values.email, values.password)
        .then(({ data: { data: { accessToken, isAdmin }, message } }) => {
          disableLoading();
          props.login(accessToken, isAdmin);
          props.setAdmin(isAdmin);
          setError(false);
          setStatus(message);
          setShowAlert(true);
        })
        .catch((e) => {
          console.log('Error', e.response.data.message)
          setError(true)
          disableLoading();
          setSubmitting(false);
          setStatus(e.response.data.message);
          setShowAlert(true);
        });
      // }, 1000);
    },
  });


  return (
    <>
      <Container maxWidth={'xs'} className='m-auto'>
        {/*SEO Support*/}
        <Helmet>
          <title>Login | Total Reviews</title>

        </Helmet>
        {/*SEO Support End */}
        <div className="login-form login-signin" id="kt_login_signin_form">
          {/* begin::Head */}
          <div className="text-center mb-10 mb-lg-10">
            <a href="#" className="login-logo py-6">
              <img
                src={`${toAbsoluteUrl('/media/logos/tr-logo.png')}`}
                className="max-h-100px"
                alt="brand-logo"
              />
            </a>
            <h3 className="font-size-h1 mt-10">
              <FormattedMessage id="AUTH.LOGIN.TITLE" />
            </h3>
            <p className="text-muted font-weight-bold">
              Enter your username and password
            </p>
            <div className='d-flex flex-row justify-content-center'>
              <p className="text-muted font-weight-bold">
                Don't Have an Account?
              </p><Link
                to="/auth/registration"
                className="text-dark-50 text-hover-primary ml-3 "
                id="kt_login_forgot"
              >
                Sign up
              </Link>
            </div>
          </div>
          {/* end::Head */}

          {/*begin::Form*/}
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            {
              showAlert === true ? (
                <div className={`${error === false ? "alert-light-success" : "alert-light-danger"} mb-10 alert alert-custom alert-dismissible fade show`}>
                  <div className="alert-text font-weight-bold">{formik.status}</div>
                  <button className="position-relative close" onClick={toggleAlert} type="button" data-dismiss="alert" aria-label="Close">×</button>
                </div>
              ) : ('')
            }

            <div className="form-group fv-plugins-icon-container">
              <input
                placeholder="Email"
                type="email"
                className={`form-control h-auto bg-light py-4 px-6 border-1 rounded-lg font-size-h6 shadow-sm ${getInputClasses(
                  "email"
                )}`}
                name="email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block error-color">{formik.errors.email}</div>
                </div>
              ) : null}
            </div>
            <div className="form-group fv-plugins-icon-container">
              <input
                placeholder="Password"
                type="password"
                className={`form-control h-auto bg-light py-4 px-6 border-1 rounded-lg font-size-h6 shadow-sm ${getInputClasses(
                  "password"
                )}`}
                name="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block error-color">{formik.errors.password}</div>
                </div>
              ) : null}
            </div>
            <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
              <Link
                to="/auth/forgot-password"
                className="text-dark-50 text-hover-primary my-3 mr-2"
                id="kt_login_forgot"
              >
                <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
              </Link>

              <button
                id="kt_login_signin_submit"
                type="submit"
                disabled={formik.isSubmitting}
                className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
              >
                <span>Sign In</span>
                {loading && <span className="ml-3 spinner spinner-white"></span>}
              </button>
            </div>
          </form>
          {/*end::Form*/}
        </div>
      </Container>
      <Link
        to="/privacy-policy"
        className="text-dark-50 position-absolute text-hover-primary bottom-0 right-0 mb-10 mr-6 "
        id="kt_login_forgot"
      >
        Privacy Policy
      </Link>
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
