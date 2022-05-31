import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { deleteClient } from '../../../app/modules/Auth/_redux/authCrud';
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function DeleteClientModal({ show, onHide, newUser, newVal, clientId }) {

    const [loading, setLoading] = useState(false);

    const onDelete = async () => {
        setLoading(true);
        await deleteClient({ clientId })
            .then(({ data: { message } }) => {
                swal({
                    text: message,
                    icon: "success",
                    buttons: false,
                    timer: 2000
                });
                setLoading(false);
                onHide();
                newUser(!newVal);
            })
            .catch((e) => {
                console.log('LoginCatchError', e.message)
                onHide();
                setLoading(false);
                swal({ text: e.response.data.message });
            })
    }


    return (
        <Modal
            show={show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    Delete Client
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div class="align-items-center justify-content-center text-center p-5">

                    <FontAwesomeIcon icon={faQuestionCircle} color='lightblue' style={{ fontSize: 90 }} />

                    <div className='mb-3 mt-3'>
                        <h5>Are you sure?</h5>
                        <h6>Once deleted, you will not be able to recover this client!</h6>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button type='submit' onClick={onDelete} >Delete
                    {loading && <span className="ml-3 mr-3 spinner spinner-white"></span>}
                </Button>
                <p className="close" onClick={() => onHide()}>Cancel</p>
            </Modal.Footer>

        </Modal >

    )
}
export default DeleteClientModal;