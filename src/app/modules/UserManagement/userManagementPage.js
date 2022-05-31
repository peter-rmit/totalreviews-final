import React, { useState, useEffect } from 'react';
import { useSubheader } from "../../../_metronic/layout";
import { AdvanceTablesWidget4 } from '../../../_metronic/_partials/widgets'

import { getUserClient } from '../Auth/_redux/authCrud';
import AddClientModal from './addClientmodal';
import DeleteClientModal from './deleteClientModal';
import { injectIntl } from "react-intl";
import { shallowEqual, useSelector } from "react-redux";
import * as auth from "../Auth/_redux/authRedux";
import { connect } from "react-redux";
import { Helmet } from 'react-helmet';

import useDebounce from '../../utils/Debounce';


var pageNumbers = [];

const UserManagementPage = (props) => {
    const suhbeader = useSubheader();
    suhbeader.setTitle("User Management");

    const [modalShow, setModalShow] = useState(false);
    const [userClients, setUserClients] = useState([]);
    const [addUser, setAddUser] = useState(false);
    const [initials, setInitials] = useState({});
    const [modalHeading, setModalHeading] = useState('Add Client');
    const [buttonType, setButtonType] = useState('add');
    const [selectedClient, setSelectedClient] = useState('');
    const [show, setShowDeleteModal] = useState(false);
    const [clientId, setClientDeleteId] = useState(0);
    const [filter, setFilter] = useState("ALL");
    const [rows, setRows] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [queryPage, setQueryPage] = useState(0);
    const [value, setValue] = useState(1);

    const [search, setSearch] = useState('');

    const debouncedSearchTerm = useDebounce(search, 300);


    let id = useSelector((state) => state.auth.user.id, shallowEqual);
    let clients = useSelector((state) => state.auth.clients, shallowEqual);


    const getClients = async (search) => {
        await getUserClient({ userId: id }, queryPage, rows, search)
            .then(({ data: { data: { users, totalPages, currentPage } } }) => {
                pageNumbers = [];
                for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push({ value: i, label: i });
                }
                setQueryPage(currentPage);
                setTotalPages(totalPages);
                setUserClients(users);
                props.setClient(users);

            })
            .catch((e) => {
                console.log('User Management Catch Error', e.message)
            });
    }

    useEffect(() => {
        if (id) {
            getClients(search);
        }
    }, [id, addUser, modalShow, filter, value, rows])

    useEffect(() => {
    }, [initials, buttonType])

    useEffect(() => {
        // if (debouncedSearchTerm) {
        getClients(debouncedSearchTerm);
        // }
    }, [debouncedSearchTerm])

    let modalClose = (a) => {
        setModalShow(false);
    }

    let closeDeleteModal = () => setShowDeleteModal(false);

    let showDeleteModal = (show, id) => {
        setShowDeleteModal(show);
        setClientDeleteId(id);
    }


    let getClient = async (client, id) => {
        setInitials(client);
        setModalShow(true);
        setSelectedClient(id);
        setButtonType('edit');
        setModalHeading('Edit Client');
    }

    let addClient = () => {
        setModalHeading('Add Client');
        setModalShow(true);
        setButtonType('add');
        setInitials({ name: '', email: '', phone: '' })
    }


    const handleFilter = (event) => {
        setFilter(event.target.value);
    }

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);
    }

    const handlePagination = (event, value) => {
        setValue(value);
        setQueryPage(value - 1);
    }

    const onPageSearch = (value) => {
        // setSearch(value)
        setValue(value.value);
        setQueryPage(value.value - 1);
    }

    const handleRows = (checked) => {
        setQueryPage(0);
        setValue(1);
        setRows(checked)

    }



    return (
        <div className="d-flex flex-column">
            {/*SEO Support*/}
            <Helmet>
                <title>User Management | Total Reviews</title>

            </Helmet>
            {/*SEO Support End */}
            <AdvanceTablesWidget4
                newVal={addUser}
                id={id}
                newUser={setAddUser}
                clients={userClients}
                showModal={() => addClient}
                showDeleteModal={showDeleteModal}
                className="card-stretch gutter-b"
                getSpecificClient={(client, id) => getClient(client, id)}
                value={value}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
                onPageSearch={onPageSearch}
                handlePagination={handlePagination}
                rows={rows}
                filter={filter}
                setRows={handleRows}
                handleSearch={handleSearch}
                handleFilter={handleFilter}

            />
            <AddClientModal
                show={modalShow}
                newVal={addUser}
                initials={initials}
                onHide={modalClose}
                newUser={setAddUser}
                heading={modalHeading}
                submitType={buttonType}
                clientId={selectedClient}

            />
            <DeleteClientModal
                show={show}
                newVal={addUser}
                clientId={clientId}
                newUser={setAddUser}
                onHide={closeDeleteModal}

            />

        </div>

    )


}
export default injectIntl(connect(null, auth.actions)(UserManagementPage));