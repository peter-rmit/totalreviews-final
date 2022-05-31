import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import * as Yup from 'yup';
import _ from "lodash";
import { Helmet } from 'react-helmet'
import SVG from "react-inlinesvg";
import axios from 'axios';
import '../../../../../_metronic/_assets/sass/pages/login/login-3.scss';
import { toAbsoluteUrl } from '../../../../../_metronic/_helpers';
import { register } from '../../_redux/authCrud';
import * as auth from '../../_redux/authRedux';
import { FormHeaders, Step1, Step2, Step3, Step4 } from './formSteps';
import { Next, Previous, Submit } from './svgs';
import Axios from 'axios';


const initialValues = {
  name: '',
  companyName: '',
  phone: '',
  facebookEmail: '',
  password: '',
  acceptTerms: false,
  address: '',
  // addressLane2: '',
  postcode: '',
  country: '',
  city: '',
  state: '',

};


function Registration(props) {
  const { intl } = props;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [shouldProceed, setShouldProceed] = useState(false);
  const [currentStep, setStep] = useState(1);

  const [facebookToken, setfacebookToken] = useState('');
  // const [facebookEmail, setFacebookEmail] = useState('');
  const [facebookId, setFacebookId] = useState('');

  const RegistrationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        })
      ),
    facebookEmail: Yup.string().email()
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
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
    companyName: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        })
      ),
    phone: Yup.string()
      .min(10, 'Minimum 10 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        })
      ),
    address: Yup.string()
      .min(10, 'Minimum 10 symbols')
      .max(200, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        })
      ),
    // addressLane2: Yup.string()
    //   .min(10, 'Minimum 10 symbols')
    //   .max(50, 'Maximum 50 symbols')
    //   .required(
    //     intl.formatMessage({
    //       id: 'AUTH.VALIDATION.REQUIRED_FIELD',
    //     })
    //   ),
    postcode: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(7, 'Maximum 7 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        })
      ),
    city: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(15, 'Maximum 15 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        })
      ),
    state: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(15, 'Maximum 15 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        })
      ),
    country: Yup.string()
      .min(1, 'Minimum 3 symbols')
      .max(20, 'Maximum 20 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        })
      ),
    acceptTerms: Yup.bool().required(
      'You must accept the terms and conditions'
    ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClassNamees = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return 'is-invalid';
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return 'is-valid';
    }
    return '';
  };

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    validateOnBlur: true,
    onSubmit: (values, { setStatus, setSubmitting, resetForm }) => {
      setSubmitting(true);
      enableLoading();
      const updatedObject = { ...values, facebookToken, googleToken: '', facebookId };
      register(updatedObject)
        .then(({ data: { data: { accessToken, isAdmin }, message } }) => {
          props.register(accessToken);
          props.setAdmin(isAdmin);
          swal({
            title: "SIGN UP",
            text: message,
            icon: "success",
            timer: 2000,
            buttons: false
          });
          disableLoading();
          resetForm({
            name: '',
            companyName: '',
            phone: '',
            password: '',
            facebookEmail: '',
            acceptTerms: false,
            address: '',
            postcode: '',
            country: '',
            city: '',
            state: '',
          })
          setSubmitting(false);
          history.push('/auth/login');
        })
        .catch((e) => {
          // resetForm({
          //   name: '',
          //   companyName: '',
          //   phone: '',
          //   password: '',
          //   acceptTerms: false,
          //   address: '',
          //   postcode: '',
          //   country: '',
          //   city: '',
          //   state: '',
          // })
          setSubmitting(false);
          swal({
            title: "SIGN UP",
            text: e.response.data.message,
            icon: "error",
            timer: 2000,
            buttons: false
          });
          setStatus(
            intl.formatMessage({
              id: 'AUTH.VALIDATION.INVALID_LOGIN',
            })
          );
          disableLoading();
        });
    },
  });

  const handleNext = async () => {
    formik.setTouched({
      name: currentStep > 0 ? true : false,
      companyName: currentStep > 0 ? true : false,
      phone: currentStep > 0 ? true : false,
      facebookEmail: currentStep > 0 ? true : false,
      password: currentStep > 0 ? true : false,
      // acceptTerms: false,
      address: currentStep > 1 ? true : false,
      // addressLane2: currentStep > 1 ? true : false,
      postcode: currentStep > 1 ? true : false,
      city: currentStep > 1 ? true : false,
      state: currentStep > 1 ? true : false,
      country: currentStep > 1 ? true : false,
    });
    await formik.validateForm();
    setShouldProceed(true);
  };

  const responseFacebook = async (response) => {
    const { id, accessToken, email } = response;
    // setFacebookEmail(email);
    setFacebookId(id);
    const { data: { access_token } } = await Axios.get(`https://graph.facebook.com/v11.0/oauth/access_token?grant_type=fb_exchange_token&&client_id=314808506872080&&client_secret=292edcae7904371c9ead23f655702ca6&&fb_exchange_token=${accessToken}`)
    // const { data: { data } } = await Axios.get(`https://graph.facebook.com/v11.0/${id}/accounts?access_token=${access_token}`)
    if (access_token) {
      setfacebookToken(access_token);
    }
  }

  const componentClicked = async (res) => {
    console.log('clicked =>', res);
  }
  const handleResponse = (data) => {
    console.log(data);
  }

  const handleError = (error) => {
    this.setState({ error });
  }


  useEffect(() => {
    if (shouldProceed === false) return;
    if (currentStep === 1 && formik.errors &&
      (formik.errors.name || formik.errors.companyName || formik.errors.phone || formik.errors.facebookEmail || formik.errors.password)) {
      setShouldProceed(false);
      return;
    }
    if (currentStep === 2 && formik.errors &&
      (formik.errors.address || formik.errors.postcode || formik.errors.city || formik.errors.state ||
        formik.errors.country)) {
      setShouldProceed(false);
      return;
    }
    setStep(currentStep + 1);
  }, [shouldProceed, formik.errors]);

  useEffect(() => setShouldProceed(false), [currentStep]);

  const handleBack = () => setStep(currentStep - 1);

  return (
    <div className="d-flex flex-column flex-root">
      {/*SEO Support*/}
      <Helmet>
        <title>Signup | Total Reviews</title>

      </Helmet>
      {/*SEO Support End */}
      <div
        className="login login-3 wizard d-flex flex-column flex-lg-row flex-column-fluid wizard"
        data-wizard-state={
          currentStep === 4 ? 'last' : currentStep === 1 ? 'none' : 'between'
        }
        id="kt_login">
        <div className="login-aside d-flex flex-column flex-row-auto">
          <div className="d-flex flex-column-auto flex-column pt-15 px-30">
            <Link to="/auth/login" className="login-logo py-6">
              <img
                src={`${toAbsoluteUrl('/media/logos/tr-logo.png')}`}
                className="max-h-100px"
                alt=""
              />
            </Link>
            <div className="wizard-nav pt-5 pt-lg-30">
              <FormHeaders currentStep={currentStep} />
            </div>
          </div>
          <div
            className="aside-img-wizard d-flex flex-column-fluid px-10"
          >
            <SVG src={toAbsoluteUrl(
              '/media/svg/illustrations/signup.svg'
            )} alt="signup" className="h-auto max-w-100 align-self-end" />
          </div>
        </div>
        <div className="login-content flex-column-fluid d-flex flex-column p-10">
          <div className="text-right d-flex justify-content-center">
            <div className="top-signup text-right d-flex justify-content-end pt-5 pb-lg-0 pb-10">
              <span className="font-weight-bold text-muted font-size-h4">
                Having issues?
              </span>
              <a
                className="font-weight-bolder text-primary font-size-h4 ml-2"
                id="kt_login_signup">
                Get Help
              </a>
            </div>
          </div>
          <div className="d-flex flex-row-fluid flex-center">
            <div className="login-form login-form-signup">
              <form
                onSubmit={formik.handleSubmit}
                className="form"
                novalidate="novalidate"
                id="kt_login_signup_form">
                <Step1
                  formik={formik}
                  getInputClassNamees={getInputClassNamees}
                  currentStep={currentStep}
                />
                <Step2
                  formik={formik}
                  getInputClassNamees={getInputClassNamees}
                  currentStep={currentStep}
                />
                <Step3
                  facebookToken={facebookToken}
                  formik={formik}
                  handleClick={componentClicked}
                  handleResponse={responseFacebook}
                  getInputClassNamees={getInputClassNamees}
                  currentStep={currentStep}
                />
                <Step4
                  // email={facebookEmail}
                  formik={formik}
                  getInputClassNamees={getInputClassNamees}
                  currentStep={currentStep}
                />

                <div className="d-flex justify-content-between pt-3">
                  <div className="mr-2">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn btn-light-primary font-weight-bolder font-size-h6 pl-6 pr-8 py-4 my-3 mr-3"
                      data-wizard-type="action-prev">
                      <Previous />
                      Previous
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary font-weight-bolder font-size-h6 pl-5 pr-8 py-4 my-3"
                      data-wizard-type="action-submit"
                      type="submit"
                      id="kt_login_signup_form_submit_button">
                      Submit

                      <Submit />
                      {loading && <span className="ml-3 spinner spinner-white"></span>}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNext(formik)}
                      className="btn btn-primary font-weight-bolder font-size-h6 pl-8 pr-4 py-4 my-3"
                      data-wizard-type="action-next"
                      disabled={(_.isEmpty(facebookToken) === true) && currentStep === 3 ? true : false}
                    >
                      Next Step
                      <Next />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
