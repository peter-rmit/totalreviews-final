import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Container } from '@material-ui/core';
import { FormattedMessage, injectIntl } from "react-intl";

import { adminLogin } from "../../Auth/_redux/authCrud";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

import * as auth from "../../Auth/_redux/authRedux";

const initialValues = {
    email: "",
    password: "",
};

function Login(props) {
    // const { intl } = props;
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Wrong email format")
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("Email Field is required"),
        password: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("Password field is required"),
    });


    useEffect(() => {

    }, [showAlert])

    const toggleAlert = () => {
        setShowAlert(false);
    }

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
        onSubmit: ({ email, password }, { setStatus, setSubmitting }) => {
            enableLoading();
            setTimeout(() => {
                adminLogin(email, password)
                    .then(({ data: { data: { accessToken, isAdmin }, message } }) => {
                        disableLoading();
                        props.login(accessToken, isAdmin);
                        props.setAdmin(isAdmin);
                        setError(false);
                        setStatus(message);
                        setShowAlert(true);
                    })
                    .catch((e) => {
                        disableLoading();
                        setSubmitting(false);
                        setError(true);
                        setStatus(e.response.data.message);
                        setShowAlert(true);
                        setSubmitting(false);
                    });
            }, 1000);
        },
    });

    return (
        <Container maxWidth={'xs'} className='m-auto'>
            {/*SEO Support*/}
            <Helmet>
                <title>Admin Login | Total Reviews</title>

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
                        Enter your email and password
                    </p>
                    {/* <div className='d-flex flex-row justify-content-center'>
                        <p className="text-muted font-weight-bold">
                            Don't Have an Account?
                        </p><Link
                            to="/auth/registration"
                            className="text-dark-50 text-hover-primary ml-3 "
                            id="kt_login_forgot"
                        >
                            Sign up
                        </Link>
                    </div> */}
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
                                <button onClick={toggleAlert} type="button" className="position-relative close" data-dismiss="alert" aria-label="Close">??</button>
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
                            to="/admin/forgot-password"
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
    );
}

export default injectIntl(connect(null, auth.actions)(Login));
