import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { shallowEqual, useSelector } from "react-redux";
import * as Yup from 'yup';
import { createClient, updateClient } from '../Auth/_redux/authCrud';
import swal from 'sweetalert';


const AddClientModal = ({ heading, show, onHide, newVal, newUser, initials, submitType, clientId}) => {

    const id = useSelector((state) => state.auth.user.id, shallowEqual);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [initialValues, setInitialValues] = useState({
        name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        setUserId(id);
        if (initials) {
            setInitialValues((initialValues) => initialValues = initials);
        }
    }, [id, initials])

    useEffect(() => {
    }, [initialValues])

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
            .min(3, 'Minimum 3 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('Name is required field'),
        email: Yup.string()
            .email("Wrong email format")
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required('Email is required field'),
        phone: Yup.string()
            .min(10, 'Minimum 10 symbols')
            .max(50, 'Maximum 50 symbols')
        // .required(),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: CreateClientSchema,
        onSubmit: (values, { setStatus, setSubmitting, resetForm }) => {
            enableLoading();
            setTimeout(() => {
                const clientData = {
                    name: values.name, email: values.email, phone: values.phone, userId, clientId
                }
                submitType && submitType === "add" ?
                    createClient(clientData)
                        .then(async ({ data: { data: { client }, message } }) => {
                            swal({
                                text: message,
                                icon: "success",
                                timer: 2000,
                                buttons: false
                            });
                            onHide();
                            resetForm({
                                name: '',
                                email: '',
                                phone: '',
                            });
                            newUser(!newVal);
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
                                name: '',
                                email: '',
                                phone: '',
                            });
                            console.log('LoginCatchError', e.message)
                            disableLoading();

                        })
                    :
                    updateClient(clientData)
                        .then(async ({ data: { data: { client }, message } }) => {
                            swal({
                                text: message,
                                icon: "success",
                                timer: 2000,
                                buttons: false
                            });
                            onHide();
                            newUser(!newVal);
                            disableLoading();
                        })
                        .catch((e) => {
                            console.log('LoginCatchError', e.message)
                            swal({
                                text: e.response.data.message,
                                icon: "error",
                                timer: 2000,
                                buttons: false
                            });
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
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {heading}
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
                            value={formik.values.name}
                            className={`${formik.touched.name && formik.errors.name ? 'focus' : ''}
                            form-control h-auto bg-light py-4 px-6 border- rounded-lg font-size-h6 ${getInputClasses(
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
                            value={formik.values.email}
                            className={`${formik.touched.email && formik.errors.email ? 'focus' : ''}
                            form-control h-auto bg-light py-4 px-6 border-1 rounded-lg font-size-h6 ${getInputClasses(
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
                            value={formik.values.phone}
                            className={`${formik.touched.phone && formik.errors.phone ? 'focus' : ''}
                            form-control h-auto bg-light py-4 px-6 border-1 rounded-lg font-size-h6 ${getInputClasses(
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

                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit' >Submit
                    {loading && <span className="ml-3 mr-3 spinner spinner-white"></span>}
                    </Button>
                    <p className="close" onClick={() => onHide()}>Cancel</p>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
export default AddClientModal;