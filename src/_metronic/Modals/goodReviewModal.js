import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import { postGoodFeedback } from '../../app/modules/Auth/_redux/authCrud';
import { useHistory } from 'react-router-dom';

function GoodReviewModal({ show, onHide, data, rating, props }) {
    // const id = useSelector((state) => state.auth.user.id, shallowEqual);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [id, setClientId] = useState(0);

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    useEffect(() => {

        if (data) {
            const { id } = data;
            setClientId(id);
        }
    }, [])

    let byGoogle = () => {
        let clientData = {
            id,
            clientRating: rating,
            platform: 'google'
        }
        postGoodFeedback(clientData).then(({ data: { message } }) => {
            swal({
                text: message,
                icon: "success",
                timer: 2000,
                buttons: false
            });
            props.history.push('/auth/thankyou');
        })
            .catch(error => {
                swal({
                    text: error.response.data.message,
                    icon: "error",
                    timer: 2000,
                    buttons: false
                });
            })

    }
    let byFacebook = () => {
        const { page } = data;
        window.location = `https://www.facebook.com/${page}`
        // let clientData = {
        //     id,
        //     clientRating: rating,
        //     platform: 'facebook'
        // }
        // postGoodFeedback(clientData).then(({ data: { message } }) => {
        //     swal({
        //         text: message,
        //         icon: "success",
        //         timer: 2000,
        //         buttons: false
        //     });
        //     props.history.push('/auth/thankyou');
        // })
        //     .catch(error => {
        //         swal({
        //             text: error.response.data.message,
        //             icon: "error",
        //             timer: 2000,
        //             buttons: false
        //         });
        //     })

    }

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
                    Submit Review
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div>
                    <p className="mb-6">Thank you! <strong>We need your help.</strong> Would you share your experience on
                        one of these sites?</p>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center">
                    <a onClick={byGoogle} class="btn btn-primary mr-3" style={{ backgroundColor: '#dd4b39' }} href="#!" role="button">
                        <i class="fab fa-google me-2"></i>Google
                    </a>
                    <a onClick={byFacebook} class="btn btn-primary" style={{ backgroundColor: '#3b5998' }} href="#!" role="button">
                        <i class="fab fa-facebook me-2"></i>Facebook
                    </a>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <p className="close" onClick={() => onHide()}>Cancel</p>
            </Modal.Footer>

        </Modal >
    )

}
export default GoodReviewModal;
