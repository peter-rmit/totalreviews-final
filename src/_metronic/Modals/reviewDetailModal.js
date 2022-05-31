import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Modal, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { postMessage } from '../../app/modules/Auth/_redux/authCrud';


function ReviewDetailModal({ show, onHide, value, description, rating, email, phone, respond }) {
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(500);

  const initialValues = {
    message: ''
  }


  let toggleMessageField = () => {
    console.log('clicked')
    setToggle((toggle) => toggle = !toggle);
  }

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  useEffect(() => {

  }, [toggle])

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const CreateClientSchema = Yup.object().shape({
    message: Yup.string()
      .min(10, 'Minimum 10 characters')
      .max(500, 'Maximum 500 characters')
      .required('Message is a required field')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: CreateClientSchema,
    onSubmit: ({ message }, { setStatus, setSubmitting, resetForm }) => {
      enableLoading();
      setTimeout(() => {
        const clientData = {
          message,
          email
        }
        postMessage(clientData)
          .then(async ({ data: { message } }) => {
            swal({
              text: message,
              icon: "success",
              timer: 2000,
              buttons: false
            });


            onHide();
            resetForm({
              message: ''
            })
            disableLoading();
          })
          .catch((e) => {
            swal({
              text: e.response.data.message,
              icon: "error",
              timer: 2000,
              buttons: false
            });
            resetForm({
              message: '',
            })
            disableLoading();
          })

      }, 1000);
    },
  });


  const onHideModal = () => {
    onHide();
    setToggle(false);
  }


  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHideModal}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="form"
        novalidate="novalidate"
        id="kt_login_signup_form"
      >
        <Modal.Body className="d-flex flex-column" >
          {
            respond &&
            <div className="alert-light-success mb-10 alert alert-custom alert-dismissible fade show">
              <div className="alert-text font-weight-bold text-center">You have already reponded to this client</div>
            </div>
          }
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Box component="fieldset" borderColor="transparent">
              <Rating
                readOnly={true}
                size="large"
                name="simple-controlled"
                value={rating}
              />
            </Box>
            <p>{email}</p>
            <p>{phone}</p>
          </div>
          <hr className="w-100 solid-1px-lightgray" />
          {
            description &&
            <pre className="review-description">{description}</pre>
          }
          <button
            type="button"
            disabled={respond}
            onClick={toggleMessageField}
            // disabled={hasRated === "true" && clientMessage !== null ? false : true}
            className={"btn btn-primary btn-sm"}>

            <span className="d-block font-weight-bold font-size-sm">
              Respond to send email
            </span>
          </button>
          {
            toggle === true ?
              <div className="form-group">
                <label className="font-size-h6 font-weight-bolder text-dark">Message</label>
                <textarea
                  placeholder="Write your message here..."
                  value={formik.values.message}
                  maxLength={500}
                  rows={13}
                  className={`${formik.touched.message && formik.errors.message ? 'focus' : ''}
                            form-control h-auto bg-light py-4 px-8 border-1 rounded-lg font-size-h6 ${getInputClasses(
                    'message'
                  )}`}
                  name="message"
                  {...formik.getFieldProps('message')}
                />
                {formik.touched.message && formik.errors.message ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block error-color">{formik.errors.message}</div>
                  </div>
                ) : null}
                <div className="d-flex justify-content-between">
                  <div>
                    {
                      limit - formik.values.message.length === 0 ? <p className="error-color">Maximum limit reached</p>
                        : ''
                    }
                  </div>
                  <div>{limit - formik.values.message.length} / {limit}</div>
                </div>
              </div>
              : ''
          }

        </Modal.Body>
        <Modal.Footer>
          <Button type='submit' disabled={respond ? true : formik.isSubmitting} >Submit
            {loading && <span className="ml-3 mr-3 spinner spinner-white"></span>}
          </Button>
          <p className="close" onClick={onHideModal}>Cancel</p>
        </Modal.Footer>
      </form>
    </Modal>
  )

}
export default ReviewDetailModal;