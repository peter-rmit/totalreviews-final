import { Container } from '@material-ui/core';
import { useFormik } from "formik";
import _ from 'lodash';
import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import * as Yup from "yup";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { validateToken } from '../../../utils/tokenValidation';
import { requestResetPassword } from "../_redux/authCrud";
import * as auth from "../_redux/authRedux";

const initialValues = {
    password: "",
};

function ResetPassword(props) {

    const { intl } = props;

    const [token, setToken] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let validatedToken = validateToken(props.match.params.token)
        setToken(validatedToken);
    }, [])

    const ResetPasswordSchema = Yup.object().shape({
        password: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required(
                intl.formatMessage({
                    id: "AUTH.VALIDATION.REQUIRED_FIELD",
                })
            ),
    });

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
        validationSchema: ResetPasswordSchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            setLoading(true);
            const userData = {
                email: token.facebookEmail,
                password: values.password
            }
            requestResetPassword(userData)
                .then(({ data: { message } }) => {
                    setLoading(false);
                    swal({
                        text: message,
                        icon: "success",
                        timer: 3000,
                        buttons: false
                    });
                    props.history.push('/admin');
                })
                .catch((error) => {
                    setLoading(false);
                    swal({
                        text: error.response.data.message,
                        icon: "error",
                        timer: 3000,
                        buttons: false
                    });
                });
        },
    });

    if (_.isEmpty(token) === true) {
        return (
            <div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center">
                <h1> ERROR 404! PAGE NOT FOUND </h1>
            </div>

        )
    }

    return (
        <>
            <Container maxWidth={'xs'} className='m-auto'>
                {/*SEO Support*/}
                <Helmet>
                    <title>Reset Password | Total Reviews</title>

                </Helmet>
                {/*SEO Support End */}
                <div className="login-form login-forgot" style={{ display: "block" }}>
                    <div className="text-center mb-10 mb-lg-10">
                        {/* <h3 className="font-size-h1">Forgotten Password ?</h3> */}
                        <Link to="#" className="login-logo py-6">
                            <img
                                src={`${toAbsoluteUrl('/media/logos/tr-logo.png')}`}
                                className="max-h-100px"
                                alt="brand-logo"
                            />
                        </Link>
                        <div className="text-muted font-weight-bold mt-10">
                            Enter new password to Signin account
                        </div>
                    </div>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
                    >
                        {formik.status && (
                            <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                                <div className="alert-text font-weight-bold">
                                    {formik.status}
                                </div>
                            </div>
                        )}
                        <div className="form-group fv-plugins-icon-container">
                            <input
                                placeholder="New Password"
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
                        <div className="form-group d-flex flex-wrap flex-center">
                            <button
                                id="kt_login_forgot_submit"
                                type="submit"
                                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                            >
                                Submit
                                {loading && <span className="ml-3 mr-3 spinner spinner-white"></span>}
                            </button>
                            <Link to="/auth">
                                <p className="close">
                                    Cancel
                                </p>
                            </Link>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
}

export default injectIntl(connect(null, auth.actions)(ResetPassword));
