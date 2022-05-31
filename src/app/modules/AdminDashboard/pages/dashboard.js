import React, { useEffect, useState } from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Icon, Switch, TextField } from '@material-ui/core';
import _, { set } from 'lodash';
import Helmet from 'react-helmet';
import SVG from "react-inlinesvg";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { deleteUser, getAllUsers } from '../../Auth/_redux/authCrud';
import { AddModal, ChangePasswordModal, EditModal } from '../Modals';
import useDebounce from '../../../utils/Debounce';

import { AdminFilters } from "../../../utils/filter-schemas";

import { Filter, TablePagination } from '../../../../_metronic/_partials/widgets';

var pageNumbers = [];

const Dashboard = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [initials, setInitials] = useState({});
  const [modalHeading, setModalHeading] = useState('Add User');
  const [buttonType, setButtonType] = useState('add');
  const [addUser, setAddUser] = useState(false);
  const [selectedClient, setSelectedUser] = useState('');
  const [show, setShowDeleteModal] = useState(false);
  const [userId, setUserDeleteId] = useState(0);
  const [active, setActive] = useState(true);
  const [showpasswordModal, setPasswordModalShow] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [rows, setRows] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [queryPage, setQueryPage] = useState(0);
  const [value, setValue] = useState(1);

  const [search, setSearch] = useState('');

  const debouncedSearchTerm = useDebounce(search, 300);

  const getallUsers = async (search) => {
    getAllUsers(queryPage, filter, rows, search)
      .then(({ data: { data: { users, totalPages, currentPage } } }) => {
        pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push({ value: i, label: i });
        }
        setUsers(users);
        setQueryPage(currentPage);
        setTotalPages(totalPages);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error >>', error.message);
      })
  }

  useEffect(() => {
    getallUsers(search)
  }, [addUser, filter, value, rows])

  useEffect(() => {
    // if (debouncedSearchTerm) {
    getallUsers(debouncedSearchTerm);
    // }
  }, [debouncedSearchTerm])



  const handleActive = async (event, id) => {
    const { checked } = event.target;
    await deleteUser({ userId: id, isDeleted: (checked === false ? true : false) })
      .then(({ data: { message } }) => {
        setAddUser(!addUser);
        if (checked === false) {
          swal({
            text: "User Deactivated",
            icon: "success",
            buttons: false,
            timer: 2000
          });
        }
        else {
          swal({
            text: "User Activated",
            icon: "success",
            buttons: false,
            timer: 2000
          });
        }


      })
      .catch((e) => {
        swal({ text: e.response.data.message });
      })
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

  const logoutClick = () => {
    history.push("/logout");
  };
  const modalPasswordClose = () => { setPasswordModalShow(false); }

  const showChangePasswordModal = (email, id) => {
    const Password = {
      email,
      password: '',
      confirm: ''
    };
    setInitials(Password);
    setPasswordModalShow(true);
    setSelectedUser(id);
  }

  let modalClose = (a) => {
    setModalShow(false);
  }

  let modalEditClose = (a) => {
    setModalEditShow(false);
  }

  let closeDeleteModal = () => setShowDeleteModal(false);

  let showDeleteModal = (id) => {
    setShowDeleteModal(true);
    setUserDeleteId(id);
  }


  let getUsers = async ({ name, companyName, facebookEmail, phone, city, state, country, addressLane1, postcode, id }) => {
    const user = {
      name,
      companyName,
      facebookEmail,
      addressLane1,
      phone,
      city,
      state,
      country,
      postcode,
      acceptTerms: false,
    }
    setInitials(user);
    setModalEditShow(true);
    setSelectedUser(id);
  }
  let addUsers = () => {
    setModalHeading('Add User');
    setModalShow(true);
  }

  if (loading) {
    return '';
  }

  return (
    <>
      {/*SEO Support*/}
      <Helmet>
        <title>Admin Dashboard | Total Reviews</title>

      </Helmet>
      {/*SEO Support End */}
      <div className="col-lg-12">
        <div className="d-flex flex-row justify-content-end pt-5 pb-5 pl-5 ">
          <button
            className="btn btn-primary btn-bold"
            onClick={logoutClick}
          >
            Sign out
          </button>
        </div>
        {/* begin::Base Table Widget 6 */}
        <div className={`card card-custom card-stretch gutter-b`}>
          {/* begin::Header */}
          <div className="card-header justify-content-evenly  border-0 py-5">
            <h3 className="card-title align-items-center flex-column ">
              <span className="card-label font-weight-bolder text-dark">Admin Dashboard</span>
              {/* <span className="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new members</span> */}
            </h3>
            <div className="card-toolbar tools">
              <Filter
                data={AdminFilters}
                rows={rows}
                filter={filter}
                setRows={handleRows}
                handleSearch={handleSearch}
                handleFilter={handleFilter}
              />
            </div>
            <div className="add-user">
              <a onClick={addUsers}
                href="#" className="btn btn-info font-weight-bolder font-size-sm"><span className="svg-icon svg-icon-lg" >
                  <SVG
                    src={toAbsoluteUrl(
                      "/media/svg/icons/Communication/Add-user.svg"
                    )}
                  />
                </span>Add New User</a>
              {/* <div className="mr-3">
              <TextField size="small" onChange={handleSearch} id="outlined-search"
                label="Search..." type="search" variant="outlined"
              />
            </div> */}

              {/* <a href="#" className="btn btn-danger font-weight-bolder font-size-sm">Create</a> */}
            </div>
          </div>
          {/* end::Header */}

          {/* begin::Body */}
          <div className="card-body pt-2 pb-0">
            {/* begin::Table */}

            <div className="table-responsive">
              {
                _.isEmpty(users) !== true ?
                  <table className="table table-head-custom table-vertical-center table-head-bg table-borderless ">

                    <thead>

                      <tr>
                        <th style={{ width: "50px" }} />
                        <th style={{ minWidth: "150px", maxWidth: "150px" }}>
                          <span className="text-dark-75">Name</span>
                        </th>
                        <th style={{ minWidth: "45px", maxWidth: "45px" }} />
                        <th style={{ minWidth: "150px", maxWidth: "150px" }}>
                          <span className="text-dark-75">Company Name</span>
                        </th>
                        <th style={{ minWidth: "130px", maxWidth: "130px" }}>
                          <span className="text-dark-75">Password</span>
                        </th>
                        <th style={{ minWidth: "200px", maxWidth: "200px" }}>
                          <span className="text-dark-75">Address</span>
                        </th>
                        <th style={{ minWidth: "150px", maxWidth: "150px" }}>
                          <span className="text-dark-75">Contact</span>
                        </th>
                        <th style={{ minWidth: "120px", maxWidth: "120px" }} >
                          <span className="text-dark-75">Postcode</span>
                        </th>
                        <th style={{ minWidth: "120px", maxWidth: "120px" }} >
                          <span className="text-dark-75">City</span>
                        </th>
                        <th style={{ minWidth: "120px", maxWidth: "120px" }} >
                          <span className="text-dark-75">State</span>
                        </th>
                        <th style={{ minWidth: "120px", maxWidth: "120px" }} >
                          <span className="text-dark-75">Country</span>
                        </th>

                        <th style={{ minWidth: "80px", maxWidth: "80px" }}>
                          <span className="text-dark-75">Edit</span>
                        </th>
                        <th style={{ minWidth: "170px", maxWidth: "170px" }}>
                          <span className="text-dark-75">Activate/Dectivate</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        users.map(({ name, companyName, facebookEmail, password, phone, addressLane1, postcode,
                          city, isDeleted, state, country, id }) => (

                          <tr key={id}>
                            <td className="">
                              <div className="symbol symbol-50 symbol-light mr-2 mt-2">
                                <span className="symbol-label">
                                  <SVG
                                    className="h-75 align-self-end"
                                    src={toAbsoluteUrl("/media/svg/avatars/001-boy.svg")}
                                  ></SVG>
                                </span>
                              </div>
                            </td>
                            <td className="">
                              <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">{name}</a>
                              <span className="text-muted font-weight-bold d-block">{facebookEmail}</span>
                            </td>
                            <td></td>
                            <td className="text-left ">
                              {companyName}
                            </td>
                            <td className="text-left ">
                              ********{' '}<Icon
                                onClick={() => showChangePasswordModal(facebookEmail, id)}
                                className={'fas fa-edit mr-5 text-hover-primary actions'} color="action" />
                            </td>

                            <td className="text-left ">
                              {addressLane1}
                            </td>

                            <td className="text-left ">
                              <span className="text-dark-75 font-weight-bold d-block font-size-lg">
                                {phone}
                              </span>
                            </td>
                            <td className="text-left ">
                              {postcode}
                            </td>

                            <td className="text-left ">
                              {city}
                            </td>
                            <td className="text-left ">
                              {state}
                            </td>

                            <td className="text-left ">
                              {country}
                            </td>


                            <td className="pr-0 text-left">
                              <Icon
                                onClick={() => getUsers({
                                  name, companyName, facebookEmail,
                                  phone, addressLane1, state, country, city, postcode, id
                                })}
                                className={'fas fa-edit mr-5 text-hover-primary actions'} color="action" />{' '}
                              {/* <Icon
                            onClick={() => showDeleteModal(id)}
                            className={'fas fa-trash-alt text-hover-primary actions'} color="action" /> */}
                            </td>
                            <td className="pr-0 text-left">
                              <Switch
                                checked={isDeleted === false ? true : false}
                                onChange={(event) => handleActive(event, id)}
                                name="active"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                              />
                            </td>
                          </tr>

                        ))

                      }

                      <AddModal
                        show={modalShow}
                        newVal={addUser}
                        initials={initials}
                        onHide={modalClose}
                        newUser={setAddUser}
                        heading={modalHeading}
                        submitType={buttonType}
                        userId={selectedClient}
                      />

                      <EditModal
                        show={modalEditShow}
                        newVal={addUser}
                        initials={initials}
                        onHide={modalEditClose}
                        newUser={setAddUser}
                        heading={modalHeading}
                        submitType={buttonType}
                        userId={selectedClient}
                      />

                      <ChangePasswordModal
                        show={showpasswordModal}
                        newVal={addUser}
                        initials={initials}
                        onHide={modalPasswordClose}
                        newUser={setAddUser}
                        userId={selectedClient}
                      />
                      {/* <DeleteModal
                  show={show}
                  newVal={addUser}
                  userId={userId}
                  newUser={setAddUser}
                  onHide={closeDeleteModal}

                /> */}
                    </tbody>
                  </table>
                  : <div className="d-flex flex-row w-100 h-100 justify-content-center align-items-center">
                    <h2>No User Added Yet</h2>

                  </div>
              }

            </div>
            {
              _.isEmpty(users) !== true ?
                <TablePagination
                  value={value}
                  totalPages={totalPages}
                  pageNumbers={pageNumbers}
                  onPageSearch={onPageSearch}
                  handlePagination={handlePagination}
                />
                : ''
            }
            {/* end::Table */}
          </div>
          {/* end::Body */}
        </div>
        {/* end::Base Table Widget 6 */}
      </div >
    </>
  );
}
export default Dashboard;