import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import FacebookLogin from 'react-facebook-login';
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";
import * as auth from "../Auth";
import { updateUserPages, updateProfile } from '../../modules/Auth/_redux/authCrud';
import swal from "sweetalert";
import Axios from "axios";

function PersonaInformation(props) {
  const user = useSelector((state) => state.auth.user, shallowEqual);
  // Fields
  const [loading, setloading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pic, setPic] = useState("");
  const [picture, setPicture] = useState("");
  const [facebookId, setFacebookId] = useState("");
  const [facebookToken, setfacebookToken] = useState("");
  const [initialValues, setInitialValues] = useState({
    // pic: user.picture,
    name: user.name,
    // firstname: user.name,
    // lastname: user.lastName,
    companyName: user.companyName,
    phone: user.phone,
    facebookEmail: user.facebookEmail,
    // website: user.website
  });
  const dispatch = useDispatch();
  // console.log('user: ', user);


  useEffect(() => {
    if (user.picture) {
      setPic(user.picture);
      setPicture(user.picture);
    }
  }, [user]);

  // Methods
  const saveUser = (values, setStatus, setSubmitting) => {
    setloading(true);
    // const updatedUser = Object.assign(user, values);
    // user for update preparation
    // console.log({ updatedUser, })
    setTimeout(() => {
      setloading(true);
      setSubmitting(false);
      let formData = new FormData();
      formData.append('file', picture);
      formData.append('userId', user.id);
      formData.append('name', values.name);
      formData.append('phone', values.phone);
      formData.append('companyName', values.companyName);
      // Do request to your server for user update, we just imitate user update there, For example:
      updateProfile(formData)
        .then(({ data: { data: { updatedUser }, message } }) => {
          dispatch(props.setUser(updatedUser));
          setloading(false);
        })
        .catch((error) => {
          setloading(false);
          setSubmitting(false);
          setStatus(error);
        });
    }, 1000);
  };
  // UI Helpers

  const Schema = Yup.object().shape({
    // pic: Yup.string(),
    // firstname: Yup.string().required("First name is required"),
    // lastname: Yup.string().required("Last name is required"),
    name: Yup.string().required("Name is required"),
    companyName: Yup.string(),
    phone: Yup.string().required("Phone is required"),
    facebookEmail: Yup.string()
      .email("Wrong email format")
      .required("Email is required"),
    // website: Yup.string(),
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
    enableReinitialize: true,
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      saveUser(values, setStatus, setSubmitting);
    },
    onReset: (values, { resetForm }) => {
      resetForm();
    },
  });
  const getUserPic = () => {
    if (!pic) {
      return "none";
    }

    return `url(${pic})`;
  };
  const removePic = () => {
    setPic("");
    setPicture("");
  };

  const responseFacebook = async (response) => {
    const { id, accessToken, email } = response;
    // setFacebookEmail(email);
    setFacebookId(id);
    try {
      const { data: { access_token } } = await Axios.get(`https://graph.facebook.com/v11.0/oauth/access_token?grant_type=fb_exchange_token&&client_id=314808506872080&&client_secret=292edcae7904371c9ead23f655702ca6&&fb_exchange_token=${accessToken}`)
      // const { data: { data } } = await Axios.get(`https://graph.facebook.com/v11.0/${id}/accounts?access_token=${access_token}`)
      if (access_token) {
        setfacebookToken(access_token);
      }
    }
    catch (e) {
      console.log('error in graphApi: ', e);
    }
    if (facebookId && facebookToken) {
      try {
        setUploading(true);
        const { data: { message } } = await updateUserPages({ userId: user.id, facebookId, facebookToken });
        console.log('res: ', message);
        swal({
          text: message,
          icon: 'success',
          timer: 3000,
          buttons: false,
          dangerMode: true,
        })
        setUploading(false);
      }
      catch (e) {
        console.log('Error in PageUpdate Api: ', e);
        swal({
          text: e.response.data.message,
          icon: 'success',
          timer: 3000,
          buttons: false,
          dangerMode: true,
        })
        setUploading(false);
      }
    }
  }

  const componentClicked = async (res) => {
    console.log('clicked =>', res);
  }

  const handleImageChange = ({ target }) => {
    const { files } = target;
    const image = files[0];
    setPicture(image)
    const imageURL = URL.createObjectURL(image);
    setPic(imageURL);
  }


  return (
    <>
      <div className="card card-custom mb-3">
        <div className="card-header py-3">
          <div className="card-title align-items-center justify-content-center flex-column">
            <h3 className="card-label font-weight-bolder text-dark ">
              Add or Remove Facebook pages
            </h3>
            {/* <span className="text-muted font-weight-bold font-size-sm mt-1">
              Update your personal informaiton
            </span> */}
          </div>
          <div className="card-toolbar">
            <FacebookLogin
              cssClass="btn btn-success mr-2"
              textButton="Add/Remove Pages"
              appId="314808506872080"
              autoLoad={false}
              fields="name,email,picture"
              scope="email, pages_show_list, pages_read_user_content"
              onClick={componentClicked}
              callback={responseFacebook} />
            {uploading && <span className="ml-3 spinner spinner-white"></span>}
            {/* <button
              type="submit"
              className="btn btn-success mr-2"
            >
              Facebook
              {formik.isSubmitting}
            </button> */}
          </div>
        </div>
      </div>
      <form
        className="card card-custom "
        onSubmit={formik.handleSubmit}
      >
        {loading && <ModalProgressBar />}

        {/* begin::Header */}
        <div className="card-header py-3">
          <div className="card-title align-items-start flex-column">
            <h3 className="card-label font-weight-bolder text-dark">
              Personal Information
            </h3>
            <span className="text-muted font-weight-bold font-size-sm mt-1">
              Update your personal informaiton
            </span>
          </div>
          <div className="card-toolbar">
            <button
              type="submit"
              className="btn btn-success mr-2"
              disabled={
                formik.isSubmitting || (formik.touched && !formik.isValid)
              }
            >
              Save Changes
              {formik.isSubmitting}
            </button>
            <Link
              to="/user-profile/profile-overview"
              className="btn btn-secondary"
            >
              Cancel
            </Link>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Form */}
        <div className="form">
          {/* begin::Body */}
          <div className="card-body">
            <div className="row">
              <label className="col-xl-3"></label>
              <div className="col-lg-9 col-xl-6">
                <h5 className="font-weight-bold mb-6">Customer Info</h5>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">Avatar</label>
              <div className="col-lg-9 col-xl-6">
                <div
                  className="image-input image-input-outline"
                  id="kt_profile_avatar"
                  style={{
                    backgroundImage: `url(${toAbsoluteUrl(
                      "/media/users/blank.png"
                    )}`,
                  }}
                >
                  <div
                    className="image-input-wrapper"
                    style={{ backgroundImage: `${getUserPic()}` }}
                  />
                  <label
                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                    data-action="change"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="Change avatar"
                  >
                    <i className="fa fa-pen icon-sm text-muted"></i>
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleImageChange}
                    />
                    <input type="hidden" name="profile_avatar_remove" />
                  </label>
                  <span
                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                    data-action="cancel"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="Cancel avatar"
                  >
                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                  </span>
                  <span
                    onClick={removePic}
                    className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                    data-action="remove"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="Remove avatar"
                  >
                    <i className="ki ki-bold-close icon-xs text-muted"></i>
                  </span>
                </div>
                <span className="form-text text-muted">
                  Allowed file types: png, jpg, jpeg.
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Full Name
              </label>
              <div className="col-lg-9 col-xl-6">
                <input
                  type="text"
                  placeholder="Full name"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "name"
                  )}`}
                  name="name"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="invalid-feedback">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
            </div>
            {/* <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Last Name
              </label>
              <div className="col-lg-9 col-xl-6">
                <input
                  type="text"
                  placeholder="Last name"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "lastname"
                  )}`}
                  name="lastname"
                  {...formik.getFieldProps("lastname")}
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div className="invalid-feedback">{formik.errors.lastname}</div>
                ) : null}
              </div>
            </div> */}
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Company Name
              </label>
              <div className="col-lg-9 col-xl-6">
                <input
                  type="text"
                  placeholder="Company name"
                  className={`form-control form-control-lg form-control-solid`}
                  name="companyName"
                  {...formik.getFieldProps("companyName")}
                />
                {/* <span className="form-text text-muted">
                  If you want your invoices addressed to a company. Leave blank to
                  use your full name.
                </span> */}
              </div>
            </div>
            <div className="row">
              <label className="col-xl-3"></label>
              <div className="col-lg-9 col-xl-6">
                <h5 className="font-weight-bold mt-10 mb-6">Contact Info</h5>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Contact Phone
              </label>
              <div className="col-lg-9 col-xl-6">
                <div className="input-group input-group-lg input-group-solid">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-phone"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="+1(123)112-11-11"
                    className={`form-control form-control-lg form-control-solid ${getInputClasses(
                      "phone"
                    )}`}
                    name="phone"
                    {...formik.getFieldProps("phone")}
                  />
                </div>
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="invalid-feedback display-block">
                    {formik.errors.phone}
                  </div>
                ) : null}
                <span className="form-text text-muted">
                  We'll never share your phone with anyone else.
                </span>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Email Address
              </label>
              <div className="col-lg-9 col-xl-6">
                <div className="input-group input-group-lg input-group-solid">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-at"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    className={`form-control form-control-lg form-control-solid ${getInputClasses(
                      "facebookEmail"
                    )}`}
                    name="facebookEmail"
                    {...formik.getFieldProps("facebookEmail")}
                  />
                </div>
                {formik.touched.facebookEmail && formik.errors.facebookEmail ? (
                  <div className="invalid-feedback display-block">
                    {formik.errors.facebookEmail}
                  </div>
                ) : null}
              </div>
            </div>
            {/* <div className="form-group row">
              <label className="col-xl-3 col-lg-3 col-form-label">
                Company Site
              </label>
              <div className="col-lg-9 col-xl-6">
                <div className="input-group input-group-lg input-group-solid">
                  <input
                    type="text"
                    placeholder="https://keenthemes.com"
                    className={`form-control form-control-lg form-control-solid`}
                    name="website"
                    {...formik.getFieldProps("website")}
                  />
                </div>
                {formik.touched.website && formik.errors.website ? (
                  <div className="invalid-feedback display-block">
                    {formik.errors.website}
                  </div>
                ) : null}
              </div>
            </div> */}
          </div>
          {/* end::Body */}
        </div>
        {/* end::Form */}
      </form>
    </>
  );
}

export default connect(null, auth.actions)(PersonaInformation);
