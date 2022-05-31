/* eslint-disable no-restricted-imports */
import {
    FormControl,
    Hidden,
    InputLabel,
} from '@material-ui/core';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import MultiSelect from "react-multi-select-component";
import swal from 'sweetalert';
import { clientReviewRequest } from "../../app/modules/Auth/_redux/authCrud";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../_helpers";
import AddClientModal from '../../app/modules/UserManagement/addClientmodal';
import { shallowEqual, useSelector } from 'react-redux';

const NewReviewButton = ({ show, onHide, data, id, addUser, setAddUser }) => {
    const [loading, setLoading] = useState(false);
    const [all, setAll] = useState(false);
    const [personName, setPersonName] = React.useState([]);
    const [clients, setClients] = useState([]);
    const [failed, setFailedEmails] = useState([]);
    const [reviewed, setAlreadyReviewed] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [initials, setInitials] = useState({ name: '', email: '', phone: '' });
    const [page, setPage] = useState('');

    let pages = useSelector((state) => state.auth.pages, shallowEqual);
    console.log('pages => ', pages);
    useEffect(() => {
        let filterArray = [];
        if (data) {
            data.map(({ name, email }) => {
                let filterObject = {
                    label: `${name} (${email})`,
                    value: `${email}`
                };
                filterArray.push(filterObject)
            });
            setClients(filterArray);
        }
    }, [data])

    let modalClose = (a) => {
        setModalShow(false);
    }

    let addClient = () => {
        setModalShow(true);
    }

    const _HandlePageChange = (e) => {
        const { value } = e.target;
        console.log(value);
        setPage(value);
    }
    const onSubmit = () => {
        let emails = [];

        setLoading(true);
        emails = personName.map(({ value }) => value);
        clientReviewRequest({ userId: id, emails, page })
            .then(async ({ data: { data: { failedEmails, alreadyReviewed }, message } }) => {
                setFailedEmails(failedEmails);
                setAlreadyReviewed(alreadyReviewed);
                if (emails.length === 1 && (failedEmails.length === 1 || alreadyReviewed.length === 1)) {
                }
                else {
                    swal({
                        text: message,
                        icon: "success",
                        timer: 2000,
                        buttons: false
                    });
                }
                if (_.isEmpty(failedEmails) !== true
                    || (_.isEmpty(alreadyReviewed) !== true)
                ) {
                    setLoading(false);
                }
                else {
                    onHide();
                    setLoading(false);
                }
            })
            .catch((e) => {
                swal({
                    text: e.response.data.message,
                    icon: "error",
                    timer: 2000,
                    buttons: false
                });
                setLoading(false);

            })
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
                    New Rating Request
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                    {failed && _.isEmpty(failed) !== true ?
                        <p className="text-center text-danger">{failed.length > 1 ? 'These' : 'This'}  {failed.join(', ')} {failed.length > 1 ? 'emails' : 'email'}  failed to deliver, contact our support system for help.</p>
                        :
                        reviewed && _.isEmpty(reviewed) !== true ?
                            <p className="text-center text-danger">{reviewed.length > 1 ? 'These' : 'This'} {reviewed.join(', ')} {reviewed.length > 1 ? 'emails' : 'email'}  have already reviewed the app.</p>
                            : ''
                    }
                </div>
                <div className="form-group text-right">
                    <a href="#" onClick={addClient} className="btn btn-info font-weight-bolder font-size-sm mr-3"><span className="svg-icon svg-icon-lg" >
                        <SVG
                            src={toAbsoluteUrl(
                                "/media/svg/icons/Communication/Add-user.svg"
                            )}
                        />
                    </span>Add New Client</a>

                </div>
                <AddClientModal
                    show={modalShow}
                    newVal={addUser}
                    initials={initials}
                    onHide={modalClose}
                    newUser={setAddUser}
                    heading={'Add Client'}
                    submitType={'add'}
                />
                <div className="form-group">
                    <label className="font-size-h6 font-weight-bolder text-dark">Clients</label>
                    <FormControl className='w-100'>
                        <InputLabel id="demo-mutiple-chip-label"></InputLabel>
                        <MultiSelect
                            value={personName}
                            options={clients}
                            selected={personName}
                            onChange={setPersonName}
                            labelledBy={"Select"}
                        />
                    </FormControl>
                </div>
                <div className="form-group">
                    <label className="font-size-h6 font-weight-bolder text-dark">Page</label>
                    <FormControl className='w-100'>
                        <InputLabel id="demo-mutiple-chip-label"></InputLabel>
                        <Form.Control
                            as="select"
                            onChange={_HandlePageChange}
                            value={page}>
                            <option value="">Select</option>
                            {
                                pages && pages.map(({ name, id }, index) => (
                                    <option value={id}>{name}</option>
                                ))
                            }
                        </Form.Control>
                    </FormControl>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <p style={{
                    position: 'absolute',
                    left: 0,
                    paddingLeft: '20px'
                }}>{all ? data.length : personName.length}/{data.length}</p>
                <Button type='submit' disabled={page === '' ? true : false} onClick={onSubmit} >Submit
                    {loading && <span className="ml-3 mr-3 spinner spinner-white"></span>}
                </Button>
                <p className="close" onClick={() => onHide()}>Cancel</p>
            </Modal.Footer>
        </Modal>
    )
}
export default NewReviewButton;