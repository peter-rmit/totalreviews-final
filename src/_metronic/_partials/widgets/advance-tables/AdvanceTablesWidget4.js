import React, { useState, useEffect } from 'react';
import { Icon } from '@material-ui/core';
import SVG from "react-inlinesvg";
import swal from 'sweetalert';
import _ from 'lodash';
import CSVReader from 'react-csv-reader';
import * as EmailValidator from 'email-validator';

import { toAbsoluteUrl } from "../../../_helpers";
import { CSVImport } from '../../../../app/modules/Auth/_redux/authCrud';
import { Filter, TablePagination } from '../../../../_metronic/_partials/widgets';

export function AdvanceTablesWidget4({
  className, showModal,
  clients, getSpecificClient,
  showDeleteModal, id, newVal, newUser,
  rows, filter, setRows, handleSearch, handleFilter,
  totalPages, pageNumbers, onPageSearch, handlePagination, value }) {

  const [loading, setLoading] = useState(false);
  let getUserDetail = async ({ name, email, id, phone }) => {
    const detail = {
      name,
      email,
      phone
    }
    getSpecificClient(detail, id)
  }

  let onDelete = async (id) => {
    showDeleteModal(true, id)
  }

  let onFileUpload = async (data) => {
    setLoading(true);
    let heading = data[0];
    let json = [];
    let invalidEmails = [];

    if (heading[0] === "name" && heading[1] === "email" && heading[2] === "phone") {
      for (var i = 1; i <= data.length - 2; i++) {
        if (EmailValidator.validate(data[i][1]) === true) {
          json.push({
            [heading[0]]: data[i][0],
            [heading[1]]: data[i][1],
            [heading[2]]: data[i][2]
          })
        }
        else {
          invalidEmails.push(data[i][1]);
        }
      }

      if (!_.isEmpty(json)) {
        CSVImport({ clients: json, userId: id })
          .then(({ data: { message } }) => {
            setLoading(false);
            swal({
              style: {
                color: 'red'
              },
              title: message,
              text: `${invalidEmails.length > 1 ? 'These' : 'This'}  ${invalidEmails.join(', ')} ${invalidEmails.length > 1 ? 'emails' : 'email'} ${invalidEmails.length > 1 ? 'are' : 'is'}  invalid`,
              icon: "success",
              // timer: 3000,
              button: 'Close'
            })
            newUser(!newVal);
          })
          .catch(error => {
            console.log(error.message);
            setLoading(false);
            swal({
              text: error.response.data.message,
              icon: "error",
              timer: 3000,
              buttons: false
            })
          })
      }
      // if (!_.isEmpty(invalidEmails)) {
      //   swal({
      //     text: `,
      //     icon: "error",
      //     button: 'Close'
      //   })
      // }
    }
    else {
      setLoading(false);
      swal({
        text: "CSV File must have first row headings in sequence => name, email, phone",
        icon: "error",
        timer: 5000,
        buttons: false
      })
    }
  }

  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header justify-content-evenly align-items-center border-0 py-5">
        <h3 className="card-title align-items-start flex-column ">
          <span className="card-label font-weight-bolder text-dark">Clients Details</span>
          {/* <span className="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new members</span> */}
        </h3>
        <div className="card-toolbar user_manage_tools">
          <Filter
            data={''}
            rows={rows}
            filter={filter}
            setRows={setRows}
            handleSearch={handleSearch}
            handleFilter={handleFilter}
          />
        </div>
        {/* <input onChange={onFileUpload}
        type="file" accept='.csv' placeholder="Import CSV" class="btn btn-light font-weight-bolder font-size-sm mr-3" /> */}
        <div className="csv_button">
          <CSVReader
            cssClass="btn btn-light font-weight-bolder font-size-sm"
            cssLabelClass="mr-3"
            label="Import CSV File"
            className="btn btn-light font-weight-bolder font-size-sm"
            accept='.csv'
            onFileLoaded={onFileUpload}
          />

        </div>
        <div className="manage_add_user">
          <a href="#" onClick={showModal()} className="btn btn-info font-weight-bolder font-size-sm"><span className="svg-icon svg-icon-lg" >
            <SVG
              src={toAbsoluteUrl(
                "/media/svg/icons/Communication/Add-user.svg"
              )}
            />
          </span>Add New Client</a>
          {/* <a href="#" className="btn btn-danger font-weight-bolder font-size-sm">Create</a> */}
        </div>
      </div>
      {/* Body */}
      <div className="card-body pt-0 pb-3">
        <div className="tab-content">
          <div className="table-responsive ">
            <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
              <thead>
                <tr className="text-left text-uppercase">
                  <th className="pl-7" style={{ maxWidth: "250px" }}>
                    <span className="text-dark-75">Clients</span>
                  </th>
                  <th style={{ maxWidth: "110px" }}></th>
                  <th style={{ maxWidth: "100px" }}>
                    <span className="text-dark-75">Contact</span>
                  </th>
                  <th style={{ maxWidth: "100px" }}></th>
                  <th style={{ maxWidth: "110px" }} />
                  <th style={{ maxWidth: "80px" }}></th>
                  <th style={{ maxWidth: "110px" }}>
                    <span className="text-dark-75">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  clients && clients.length >= 1 ?
                    clients.map(({ name, email, phone, id }) => (

                      <tr key={id} >
                        <td className="py-8">
                          <div className="d-flex align-items-center">
                            <div className="symbol symbol-50 symbol-light mr-4">
                              <span className="symbol-label">
                                <span className="svg-icon h-75 align-self-end">
                                  <SVG src={toAbsoluteUrl("/media/svg/avatars/001-boy.svg")} />
                                </span>
                              </span>
                            </div>
                            <div>
                              <a href="#" className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">{name}</a>
                              <span className="text-muted font-weight-bold d-block">{email}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          {/* <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                            {phone}
                          </span> */}
                          {/* <span className="text-muted font-weight-bold">
                            In Proccess
                      </span> */}
                        </td>
                        <td className="pl-1">
                          <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                            {phone}
                          </span>
                          {/* <span className="text-muted font-weight-bold">
                            Paid
                      </span> */}
                        </td>
                        <td>
                          {/* <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                            Intertico
                      </span>
                          <span className="text-muted font-weight-bold">
                            Web, UI/UX Design
                      </span> */}
                        </td>
                        <td>
                        </td>
                        <td>
                          {/* <img src={toAbsoluteUrl("/media/logos/stars.png")} alt="image" style={{ width: "5.5rem" }} />
                          <span className="text-muted font-weight-bold d-block font-size-sm">
                            Best Rated
                      </span> */}
                        </td>
                        <td className="pr-0 text-left">
                          <Icon
                            onClick={() => getUserDetail({ name, email, phone, id })} className={'fas fa-edit mr-5 text-hover-primary actions'} color="action" />{' '}
                          <Icon onClick={() => onDelete(id)} className={'fas fa-trash-alt text-hover-primary actions'} color="action" />
                        </td>
                      </tr>

                    ))
                    :
                    ''

                }
              </tbody>

            </table>
            {
              _.isEmpty(clients) !== true ?
                <TablePagination
                  value={value}
                  totalPages={totalPages}
                  pageNumbers={pageNumbers}
                  onPageSearch={onPageSearch}
                  handlePagination={handlePagination}
                />
                : ''
            }
          </div>
        </div>
      </div>
    </div >
  );
}
