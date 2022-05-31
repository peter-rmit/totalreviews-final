import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import * as Yup from 'yup';
import { requestResetPassword } from '../../Auth/_redux/authCrud';


const ChangePasswordModal = ({ show, onHide, newVal, newUser, userId, initials }) => {

    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        email: '',
        password: '',
        confirm: ''
    });

    useEffect(() => {
        if (initials) {
            setInitialValues((initialValues) => initialValues = initials);
        }
    }, [initials])

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
        password: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required('Password field is required'),
        confirm: Yup.string()
            .min(3, "Minimum 3 symbols")
            .max(50, "Maximum 50 symbols")
            .required("Confirm Password field is required")
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: CreateClientSchema,
        onSubmit: ({ password, email }, { resetForm }) => {
            enableLoading();
            setTimeout(() => {
                const userData = {
                    email, password, userId
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
                        newUser(!newVal);
                        onHide();
                    })
                    .catch((error) => {
                        setLoading(false);
                        swal({
                            text: error.response.data.message,
                            icon: "error",
                            timer: 3000,
                            buttons: false
                        });
                        onHide();
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
                    Change Password
                </Modal.Title>
            </Modal.Header>
            <form
                onSubmit={formik.handleSubmit}
                className="form"
                noValidate="novalidate"
                id="kt_login_signup_form"
            >
                <Modal.Body>
                    <div className="form-group">
                        <label className="font-size-h6 font-weight-bolder text-dark">New Password</label>
                        <input
                            placeholder="password"
                            type="password"
                            value={formik.values.password}
                            className={`${formik.touched.password && formik.errors.password ? 'focus' : ''}
                            form-control h-auto bg-light py-4 px-6 border-1 rounded-lg font-size-h6 ${getInputClasses(
                                'password'
                            )}`}
                            name="password"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block error-color">{formik.errors.password}</div>
                            </div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label className="font-size-h6 font-weight-bolder text-dark">Confirm Password</label>
                        <input
                            placeholder="Confirm Password"
                            type="password"
                            value={formik.values.confirm}
                            className={`${formik.touched.confirm && formik.errors.confirm ? 'focus' : ''}
                            form-control h-auto bg-light py-4 px-6 border-1 rounded-lg font-size-h6 ${getInputClasses(
                                'confirm'
                            )}`}
                            name="confirm"
                            {...formik.getFieldProps('confirm')}
                        />
                        {formik.touched.confirm && formik.errors.confirm ? (
                            <div className="fv-plugins-message-container">
                                <div className="fv-help-block error-color">{formik.errors.confirm}</div>
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
export default ChangePasswordModal;