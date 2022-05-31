import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { postBadFeedback } from '../../app/modules/Auth/_redux/authCrud';
import swal from 'sweetalert';


function BadReviewModal({ show, onHide, rating, data, props }) {
    const [loading, setLoading] = useState(false);
    const [id, setClientId] = useState(0);
    const [limit, setLimit] = useState(500);
    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        phone: '',
        review: '',
    })

    useEffect(() => {
        if (data) {
            const { id, name, email, phone } = data;
            setClientId(id);
            setInitialValues({
                name,
                email,
                phone,
                review: ''
            })
        }
    }, [])

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

    const CreateClientSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Minimum 3 characters')
            .max(50, 'Maximum 50 characters')
            .required('Name is a required field'),
        email: Yup.string()
            .email("Wrong email format")
            .min(3, "Minimum 3 characters")
            .max(50, "Maximum 50 characters")
            .required('Email is a required field'),
        review: Yup.string()
            .min(10, 'Minimum 10 characters')
            .max(500, 'Maximum 500 characters')
            .required('Review is a required field'),
        phone: Yup.string()
            .min(10, 'Minimum 10 characters')
            .max(50, 'Maximum 50 characters')
            .required('Phone is a required field')
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: CreateClientSchema,
        onSubmit: (values, { setStatus, setSubmitting, resetForm }) => {
            enableLoading();
            setTimeout(() => {
                const clientData = {
                    id: id, clientName: values.name, clientEmail: values.email,
                    clientPhone: values.phone, clientMessage: values.review,
                    clientRating: rating
                }
                postBadFeedback(clientData)
                    .then(async ({ data: { message } }) => {
                        // swal({
                        //     text: message,
                        //     icon: "success",
                        //     timer: 2000,
                        //     buttons: false
                        // });
                        onHide();
                        resetForm({
                            name: '',
                            email: '',
                            phone: '',
                            review: '',
                        })
                        disableLoading();
                        props.history.push('/auth/thankyou');
                    })
                    .catch((e) => {
                        swal({
                            text: e.response.data.message,
                            icon: "error",
                            timer: 2000,
                            buttons: false
                        });
                        resetForm({
                            name: '',
                            email: '',
                            phone: '',
                            review: '',
                        })
                        disableLoading();
                    })

            }, 1000);
        },
    });


    return (
        <Modal
            show={show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Review
                </Modal.Title>
            </Modal.Header>
            <form
                onSubmit={formik.handleSubmit}
                className="form"
                novalidate="novalidate"
                id="kt_login_signup_form"
            >
                <Modal.Body>

                    <div className="form-group">
                        <label className="font-size-h6 font-weight-bolder text-dark">Name</label>
                        <input
                            placeholder="Full Name"
                            type="text"
                            disabled={true}
                            value={formik.values.name}
                            className={`${formik.touched.name && formik.errors.name ? 'focus' : ''}
                            form-control h-auto bg-light py-4 px-6 border-1 rounded-lg text-muted font-size-h6 ${getInputClasses(
                                'name'
                            )}`}
                            name="name"
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block error-color">{formik.errors.name}</div>
                            </div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label className="font-size-h6 font-weight-bolder text-dark">Email</label>
                        <input
                            placeholder="example@me.com"
                            type="email"
                            disabled={true}
                            value={formik.values.email}
                            className={`${formik.touched.email && formik.errors.email ? 'focus' : ''}
                            form-control h-auto bg-light py-4 px-6 border-1 rounded-lg text-muted font-size-h6 ${getInputClasses(
                                'email'
                            )}`}
                            name="email"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block error-color">{formik.errors.email}</div>
                            </div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label className="font-size-h6 font-weight-bolder text-dark">Contact Number</label>
                        <input
                            placeholder="+00 0000 000000"
                            type="phone"
                            disabled={true}
                            value={formik.values.phone}
                            className={`${formik.touched.phone && formik.errors.phone ? 'focus' : ''}
                            form-control h-auto bg-light py-4 px-6 border-1 rounded-lg text-muted font-size-h6 ${getInputClasses(
                                'phone'
                            )}`}
                            name="phone"
                            {...formik.getFieldProps('phone')}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block error-color">{formik.errors.phone}</div>
                            </div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label className="font-size-h6 font-weight-bolder text-dark">Review</label>
                        <textarea
                            placeholder="Write your review here..."
                            value={formik.values.review}
                            maxLength={500}
                            rows={13}
                            className={`${formik.touched.review && formik.errors.review ? 'focus' : ''}
                            form-control h-auto bg-light py-4 px-8 border-1 rounded-lg font-size-h6 ${getInputClasses(
                                'review'
                            )}`}
                            name="review"
                            {...formik.getFieldProps('review')}
                        />
                        {formik.touched.review && formik.errors.review ? (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block error-color">{formik.errors.review}</div>
                            </div>
                        ) : null}
                        <div className="d-flex justify-content-between">
                            <div>
                                {
                                    limit - formik.values.review.length === 0 ? <p className="error-color">Maximum limit reached</p>
                                        : ''
                                }
                            </div>
                            <div>{limit - formik.values.review.length} / {limit}</div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit' disabled={formik.isSubmitting} >Submit
                        {loading && <span className="ml-3 mr-3 spinner spinner-white"></span>}
                    </Button>
                    <p className="close" onClick={() => onHide()}>Cancel</p>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
export default BadReviewModal;
