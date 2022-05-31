/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import _ from 'lodash';
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import SVG from "react-inlinesvg";
import { shallowEqual, useSelector } from "react-redux";
import { getAllRequestReviewers } from '../../../../app/modules/Auth/_redux/authCrud';
import { ReviewDetailModal } from "../../../Modals";
import { toAbsoluteUrl } from "../../../_helpers";

export function BaseTablesWidget6({ className }) {
  const id = useSelector((state) => state.auth.user.id, shallowEqual);
  const [reviews, setReviews] = useState([]);
  const [value, setValue] = React.useState(0);
  const [show, onSetModalShow] = useState(false);
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState(0);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [respond, setRespond] = useState(false);


  useEffect(() => {
    if (id) {
      getAllRequestReviewers(id).then(({ data: { data: { reviews } } }) => {
        setReviews(reviews)
        console.log('reviews: ', reviews);
      })
        .catch(e => {
          console.log(e.message);
        })
    }
  }, [])



  let onModalClose = () => onSetModalShow(false);
  let onModalOpen = ({ clientPhone, clientEmail, clientRating, clientMessage, hasRespond }) => {
    setRating(clientRating);
    setDescription(clientMessage);
    setPhone(clientPhone);
    setEmail(clientEmail);
    setRespond(hasRespond);
    onSetModalShow(true);
  }

  const tabs = {
    tab1: "kt_tab_pane_3_1",
    tab2: "kt_tab_pane_3_2",
    tab3: "kt_tab_pane_3_3",
  };
  const [activeTab, setActiveTab] = useState(tabs.tab1);

  return (
    <>
      {/* begin::Base Table Widget 6 */}
      <div className={`card card-custom ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">
              Sent Requests
            </span>
            {/* <span className="text-muted mt-3 font-weight-bold font-size-sm">
              More than 400+ new members
            </span> */}
          </h3>
          {/* <div className="card-toolbar">
            <ul className="nav nav-pills nav-pills-sm nav-dark-75">
              <li className="nav-item">
                <a
                  className={`nav-link py-2 px-4 ${activeTab === tabs.tab1 &&
                    "active"}`}
                  data-toggle="tab"
                  href={`#${tabs.tab1}`}
                  onClick={() => setActiveTab(tabs.tab1)}
                >
                  Month
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link py-2 px-4 ${activeTab === tabs.tab2 &&
                    "active"}`}
                  data-toggle="tab"
                  href={`#${tabs.tab2}`}
                  onClick={() => setActiveTab(tabs.tab2)}
                >
                  Week
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link py-2 px-4 ${activeTab === tabs.tab3 &&
                    "active"}`}
                  data-toggle="tab"
                  href={`#${tabs.tab3}`}
                  onClick={() => setActiveTab(tabs.tab3)}
                >
                  Day
                </a>
              </li>
            </ul>
          </div> */}
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className="card-body pt-2 pb-0">
          {/* begin::Table */}
          {
            reviews && _.isEmpty(reviews) !== true ?
              <div className="table-responsive client-reviews">
                <table className="table table-head-custom table-vertical-center table-head-bg table-borderless ">
                  <thead>
                    <tr>
                      <th style={{ width: "50px" }} />
                      <th style={{ minWidth: "150px" }}>
                        <span className="text-dark-75">clients</span>
                      </th>
                      <th style={{ minWidth: "45px" }} />
                      <th style={{ minWidth: "140px" }}>
                        <span className="text-dark-75">Status</span>
                      </th>
                      {/* <th style={{ minWidth: "130px" }}>
                        <span className="text-dark-75">contacts</span>
                      </th> */}
                      <th style={{ minWidth: "120px" }} >
                        <span className="text-dark-75">ratings</span>
                      </th>
                      <th style={{ minWidth: "150px" }}>
                        <span className="text-dark-75">details</span>
                      </th>
                      <th style={{ minWidth: "10px" }}>
                        <span className="text-dark-75">responded</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      reviews.map(({ id, clientName, clientEmail, clientRating, clientPhone, hasRated, clientMessage, hasRespond }) => (
                        <tr key={id}>
                          <td className="pl-2">
                            <div className="symbol symbol-50 symbol-light mr-2 mt-2">
                              <span className="symbol-label">
                                <SVG
                                  className="h-75 align-self-end"
                                  src={toAbsoluteUrl("/media/svg/avatars/001-boy.svg")}
                                ></SVG>
                              </span>
                            </div>
                          </td>
                          <td className="pl-2">
                            <a
                              href="#"
                              className="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg"
                            >
                              {clientName}
                            </a>
                            <span className="text-muted font-weight-bold d-block">
                              {clientEmail}
                            </span>
                          </td>
                          <td></td>
                          <td className="text-left pl-2">
                            {hasRated === "true" ?
                              <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                Reviewed
                              </span>
                              :
                              <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                Not Reviewed
                              </span>
                            }
                          </td>
                          {/* <td className="text-left pl-0">
                            <span className="text-dark-75 font-weight-bold d-block font-size-lg">
                              {clientPhone}
                            </span> */}
                          {/* <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                            $2,000,000
                    </span> */}
                          {/* </td> */}
                          <td className="text-left pl-2">
                            <Box component="fieldset" borderColor="transparent">
                              <Rating
                                readOnly={true}
                                size="medium"
                                name="simple-controlled"
                                value={clientRating}
                              />
                            </Box>
                          </td>

                          {/* <td className="text-right">
                          <span className="font-weight-bolder text-primary">
                            +28%
                    </span>
                        </td> */}
                          <td className="text-left pl-2 pr-0">
                            <button
                              onClick={() => onModalOpen({ clientRating, clientPhone, clientEmail, clientMessage, hasRated, hasRespond })}
                              disabled={hasRated === "true" && clientMessage !== null ? false : true}
                              className={hasRated === "true" && clientMessage !== null ? "btn btn-primary btn-sm" : "btn btn-light btn-sm disable-pointer"}>
                              <span className="d-block font-weight-bold font-size-sm">
                                View Review
                              </span>
                            </button>
                          </td>
                          <td className="text-left pl-2 pr-0">
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="toggle-quick-actions">{hasRespond ? 'Responded' : 'Not Responded'}</Tooltip>
                              }
                            >
                              <span className={`svg-icon svg-icon-lg ${hasRespond ? 'text-success' : 'text-warning'}`}>
                                <SVG
                                  src={toAbsoluteUrl(
                                    `/media/svg/icons/Media/${hasRespond ? 'check-circle.svg' : 'info-circle.svg'}`
                                  )}
                                />
                              </span>
                            </OverlayTrigger>
                          </td>
                        </tr>
                      ))
                    }
                    <ReviewDetailModal
                      show={show} onHide={onModalClose}
                      rating={rating}
                      phone={phone}
                      email={email}
                      description={description}
                      respond={respond}
                    />
                    {/* <tr>
                  <td className="pl-0">
                    <div className="symbol symbol-50 symbol-light mr-2 mt-2">
                      <span className="symbol-label">
                        <SVG
                          className="h-75 align-self-end"
                          src={toAbsoluteUrl(
                            "/media/svg/avatars/018-girl-9.svg"
                          )}
                        ></SVG>
                      </span>
                    </div>
                  </td>
                  <td className="pl-0">
                    <a
                      href="#"
                      className="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg"
                    >
                      Jessie Clarcson
                    </a>
                    <span className="text-muted font-weight-bold d-block">
                      HTML, CSS Coding
                    </span>
                  </td>
                  <td></td>
                  <td className="text-right">
                    <span className="text-muted font-weight-bold d-block font-size-sm">
                      Paid
                    </span>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      $1,200,000
                    </span>
                  </td>
                  <td className="text-right">
                    <span className="font-weight-bolder text-warning">
                      +52%
                    </span>
                  </td>
                  <td className="text-right pr-0">
                    <a href="#" className="btn btn-icon btn-light btn-sm">
                      <span className="svg-icon svg-icon-md svg-icon-success">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Navigation/Arrow-right.svg"
                          )}
                        ></SVG>
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="pl-0">
                    <div className="symbol symbol-50 symbol-light mr-2 mt-2">
                      <span className="symbol-label">
                        <SVG
                          className="h-75 align-self-end"
                          src={toAbsoluteUrl(
                            "/media/svg/avatars/047-girl-25.svg"
                          )}
                        ></SVG>
                      </span>
                    </div>
                  </td>
                  <td className="pl-0">
                    <a
                      href="#"
                      className="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg"
                    >
                      Lebron Wayde
                    </a>
                    <span className="text-muted font-weight-bold d-block">
                      ReactJS Developer
                    </span>
                  </td>
                  <td></td>
                  <td className="text-right">
                    <span className="text-muted font-weight-bold d-block font-size-sm">
                      Paid
                    </span>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      $3,400,000
                    </span>
                  </td>
                  <td className="text-right">
                    <span className="font-weight-bolder text-danger">-34%</span>
                  </td>
                  <td className="text-right pr-0">
                    <a href="#" className="btn btn-icon btn-light btn-sm">
                      <span className="svg-icon svg-icon-md svg-icon-success">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Navigation/Arrow-right.svg"
                          )}
                        ></SVG>
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="pl-0">
                    <div className="symbol symbol-50 symbol-light mr-2 mt-2">
                      <span className="symbol-label">
                        <SVG
                          className="h-75 align-self-end"
                          src={toAbsoluteUrl(
                            "/media/svg/avatars/014-girl-7.svg"
                          )}
                        ></SVG>
                      </span>
                    </div>
                  </td>
                  <td className="pl-0">
                    <a
                      href="#"
                      className="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg"
                    >
                      Natali Trump
                    </a>
                    <span className="text-muted font-weight-bold d-block">
                      UI/UX Designer
                    </span>
                  </td>
                  <td></td>
                  <td className="text-right">
                    <span className="text-muted font-weight-bold d-block font-size-sm">
                      Paid
                    </span>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      $4,500,000
                    </span>
                  </td>
                  <td className="text-right">
                    <span className="font-weight-bolder text-success">
                      +48%
                    </span>
                  </td>
                  <td className="text-right pr-0">
                    <a href="#" className="btn btn-icon btn-light btn-sm">
                      <span className="svg-icon svg-icon-md svg-icon-success">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Navigation/Arrow-right.svg"
                          )}
                        ></SVG>
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="pl-0">
                    <div className="symbol symbol-50 symbol-light mr-2 mt-2">
                      <span className="symbol-label">
                        <SVG
                          className="h-75 align-self-end"
                          src={toAbsoluteUrl(
                            "/media/svg/avatars/043-boy-18.svg"
                          )}
                        ></SVG>
                      </span>
                    </div>
                  </td>
                  <td className="pl-0">
                    <a
                      href="#"
                      className="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg"
                    >
                      Kevin Leonard
                    </a>
                    <span className="text-muted font-weight-bold d-block">
                      Art Director
                    </span>
                  </td>
                  <td></td>
                  <td className="text-right">
                    <span className="text-muted font-weight-bold d-block font-size-sm">
                      Paid
                    </span>
                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                      $35,600,000
                    </span>
                  </td>
                  <td className="text-right">
                    <span className="font-weight-bolder text-info">+230%</span>
                  </td>
                  <td className="text-right pr-0">
                    <a href="#" className="btn btn-icon btn-light btn-sm">
                      <span className="svg-icon svg-icon-md svg-icon-success">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Navigation/Arrow-right.svg"
                          )}
                        ></SVG>
                      </span>
                    </a>
                  </td>
                </tr> */}
                  </tbody>
                </table>
              </div>

              :

              <h5 className="text-center mt-4">No Reviews Yet</h5>
          }
          {/* end::Table */}
        </div>
        {/* end::Body */}
      </div>
      {/* end::Base Table Widget 6 */}
    </>
  );
}
