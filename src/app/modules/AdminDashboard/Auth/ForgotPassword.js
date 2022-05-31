import React, { useState } from "react";
import { Container } from '@material-ui/core';
import { useFormik } from "formik";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import swal from 'sweetalert';
import * as Yup from "yup";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { requestAdminPassword } from "../../Auth/_redux/authCrud";
import * as auth from "../../Auth/_redux/authRedux";
import { Helmet } from 'react-helmet';

const initialValues = {
  email: "",
};

function ForgotPassword(props) {
  const { intl } = props;
  const [isRequested, setIsRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
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
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      requestAdminPassword(values.email)
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
        .catch((e) => {
          setLoading(false);
          setSubmitting(false);
          swal({
            text: e.response.data.message,
            icon: "error",
            timer: 3000,
            buttons: false
          });

        });
    },
  });

  return (
    <>
      {isRequested && <Redirect to="/admin" />}
      {!isRequested && (
        <Container maxWidth={'xs'} className='m-auto'>
          {/*SEO Support*/}
          <Helmet>
            <title>Forgot Admin Password | Total Reviews</title>

          </Helmet>
          {/*SEO Support End */}
          <div className="login-form login-forgot" style={{ display: "block" }}>
            <div className="text-center mb-10 mb-lg-10">
              <Link to="/admin" className="login-logo py-6">
                <img
                  src={`${toAbsoluteUrl('/media/logos/tr-logo.png')}`}
                  className="max-h-100px"
                  alt="brand-logo"
                />
              </Link>
              <h3 className="font-size-h1 mt-10">Forgot Password ?</h3>
              <div className="text-muted font-weight-bold">
                Enter your email to reset your password
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
                  placeholder='Email Address'
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
              <div className="form-group d-flex flex-wrap flex-center">
                <button
                  id="kt_login_forgot_submit"
                  type="submit"
                  className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                  disabled={formik.isSubmitting}
                >
                  Submit
                  {loading && <span className="ml-3 mr-3 spinner spinner-white"></span>}
                </button>
                {/* <Link to="/auth">
                  <p
                    className="close m-5"
                  >
                    Cancel
                  </p>
                </Link> */}
              </div>
            </form>
          </div>
        </Container>
      )}
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
