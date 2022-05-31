/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

import SVG from "react-inlinesvg";
import Rating from '@material-ui/lab/Rating';
import { Box } from '@material-ui/core';
import _ from 'lodash';
import { toAbsoluteUrl } from "../../../_helpers";
import { shallowEqual, useSelector } from "react-redux";
import { getAllReviewedClients } from '../../../../app/modules/Auth/_redux/authCrud';
import { Filter, TablePagination } from '../../../_partials/widgets';
import useDebounce from '../../../../app/utils/Debounce';
import { Form, InputGroup } from 'react-bootstrap';
import { ReviewedReqFilters, DayFilters } from "../../../../app/utils/filter-schemas";
import Axios from "axios";
import ReadMore from '../../ReadMore';


var pageNumbers = [];

export function AdvanceTablesWidget9({ className, Reviews, SyncReviews, setFilterFBReviews, filteredFacebookReviews }) {

  const { facebookId, id, facebookToken } = useSelector((state) => state.auth.user, shallowEqual);
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [day, setDayFilter] = useState("10");
  const [rows, setRows] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [queryPage, setQueryPage] = useState(0);
  const [value, setValue] = useState(1);
  const [search, setSearch] = useState('');
  const [filteredPlatformReviews, setFilteredPlatformReviews] = useState([]);
  const debouncedSearchTerm = useDebounce(search, 1000);

  // console.log('Reviews: ', Reviews);
  const getAllRequests = async (search) => {
    if (id) {
      // .........................This is a a previous code with pagination and filters......................//

      //   getAllReviewedClients(id, filter, rows, search, queryPage, day).then(({ data: { data: { users, totalPages, currentPage } } }) => {
      //     pageNumbers = [];
      //     for (let i = 1; i <= totalPages; i++) {
      //       pageNumbers.push({ value: i, label: i });
      //     }
      //     setReviews(users)
      //     setQueryPage(currentPage);
      //     setTotalPages(totalPages);
      //   })
      //     .catch(e => {
      //       console.log(e.message);
      //     })
      // }
      //.............................New Code without filters and pagination............................//
      try {
        const { data: { data: { users } } } = await getAllReviewedClients(id, filter, rows, search, queryPage, day)
        setReviews(users);
        setFilteredPlatformReviews(users);
      }
      catch (e) {
        console.log(e.message);
      }
    }
  }

  // useEffect(() => {
  //   getAllRequests(search)
  // }, [filter, day, value, rows])

  useEffect(() => {
    // if (debouncedSearchTerm) {
    getAllRequests(debouncedSearchTerm);
    // }
  }, [])

  useEffect(() => {
    _HandleSearchFilter(search);
  }, [debouncedSearchTerm])

  useEffect(() => {
    // console.log('fb: ', filteredFacebookReviews)
    // console.log('platform: ', filteredPlatformReviews)

  }, [filteredPlatformReviews, filteredFacebookReviews])



  const _HandleSearchFilter = (search) => {
    if (search === '') {
      setFilterFBReviews(Reviews);
      setFilteredPlatformReviews(reviews);
    }
    else {
      let newFbArray = [];
      let newPlatformArray = [];

      for (let i = 0; i < Reviews.length; i++) {
        if (Reviews[i].name.toLowerCase().includes(search.toLowerCase())) {
          newFbArray.push(Reviews[i]);
        }
      }
      // console.log('newFbArray: ', newFbArray);
      setFilterFBReviews(newFbArray);
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].clientName.toLowerCase().includes(search.toLowerCase()) ||
          reviews[i].clientEmail.toLowerCase().includes(search.toLowerCase()) ||
          reviews[i].clientRating === parseInt(search) ||
          reviews[i].clientPhone.includes(search)) {
          newPlatformArray.push(reviews[i]);
        }
      }
      setFilteredPlatformReviews(newPlatformArray);
      // console.log('newPlatformArray: ', newPlatformArray);

      // const filteredReviewsFb = Reviews.filter((review) => {
      //   console.log(review);
      //    === true && review
      // })
      // const filteredReviewsPlatform = reviews.map((review) => {
      //   review.clientName.includes(search) || review.clientEmail.includes(search) ||
      //     review.clientRating.includes(parseInt(search)) || review.clientPhone.includes(search) && review
      // })
      // console.log(filteredReviewsPlatform);

    }
  }


  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  const handleDayFilter = (event) => {
    setDayFilter(event.target.value);
  }

  const handleSearch = (e) => {
    const { value } = e.target;
    // console.log('values: ', value)
    setSearch(value);
  }

  const handlePagination = (event, value) => {
    setValue(value);
    setQueryPage(value - 1);
  }

  const onPageSearch = (value) => {
    setValue(value.value);
    setQueryPage(value.value - 1);
  }

  const handleRows = (checked) => {
    setQueryPage(0);
    setValue(1);
    setRows(checked)

  }

  return (
    <>
      {/* begin::Advance Table Widget 9 */}
      <div className={`card card-custom ${className}`}>
        {/* begin::Header */}
        <div className="card-header justify-content-evenly border-0 py-5">
          <h3 className="card-title align-items-center flex-column">
            <span className="card-label font-weight-bolder text-dark">
              Reviews
            </span>
          </h3>
          <div className="card-toolbar tools">
            {/* <Filter
              data={ReviewedReqFilters}
              dayFilter={DayFilters}
              day={day}
              rows={rows}
              filter={filter}
              setRows={handleRows}
              handleSearch={handleSearch}
              handleFilter={handleFilter}
              handleDayFilter={handleDayFilter}
            /> */}
            <InputGroup>
              <Form.Control
                className="searchbar"
                placeholder="Search..."
                aria-label="Search"
                onChange={handleSearch}
                aria-describedby="basic-addon2"
              />
            </InputGroup>
          </div>
          <div className="add-user">
            <div
              onClick={SyncReviews}
              className="btn btn-info font-weight-bolder font-size-sm"
            >
              Sync Reviews
            </div>
          </div>


        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className="card-body pt-0 pb-3">
          <div className="tab-content">
            {/* begin::Table */}
            {
              /* (reviews && _.isEmpty(reviews) !== true) || (Reviews && _.isEmpty(Reviews) !== true) ? */
              (filteredPlatformReviews && _.isEmpty(filteredPlatformReviews) !== true) ||
                (filteredFacebookReviews && _.isEmpty(filteredFacebookReviews) !== true) ?

                <div className="table-responsive all-reviews">
                  <table className="table table-head-custom table-vertical-center table-head-bg table-borderless">
                    <thead>
                      <tr className="text-left">
                        <th style={{ maxWidth: "70px" }} className="pl-7">
                          <span className="text-dark-75">clients</span>
                        </th>
                        <th style={{ minWidth: "120px" }}>
                          <span className="text-dark-75">review on</span>
                        </th>
                        <th style={{ minWidth: "100px" }}></th>
                        <th style={{ minWidth: "140px" }}>
                          <span className="text-dark-75">contact</span>
                        </th>
                        <th style={{ minWidth: "100px" }}></th>
                        <th style={{ minWidth: "100px" }}>
                          <span className="text-dark-75">rating</span>
                        </th>
                        {/* <th style={{ minWidth: "100px" }} /> */}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filteredPlatformReviews.map(({ id, clientName, clientEmail,
                          clientRating, clientPhone, platform, hasRated }) => (
                          <tr key={id}>
                            <td className="pl-0 py-8">
                              <div className="d-flex align-items-center">
                                <div className="symbol symbol-50 symbol-light mr-4">
                                  <span className="symbol-label">
                                    <SVG
                                      className="h-75 align-self-end"
                                      src={toAbsoluteUrl(
                                        "/media/svg/avatars/001-boy.svg"
                                      )}
                                    ></SVG>
                                  </span>
                                </div>
                                <div>
                                  <a
                                    href="#"
                                    className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                                  >
                                    {clientName}
                                  </a>
                                  <span className="text-muted font-weight-bold d-block">
                                    {clientEmail}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="symbol-label">
                                {platform === 'facebook' ?
                                  <img
                                    src={`${toAbsoluteUrl('/media/logos/facebook.png')}`}
                                    className="max-h-50px"
                                    alt="brand-logo"
                                  />
                                  :
                                  platform === 'google' ?
                                    <img
                                      src={`${toAbsoluteUrl('/media/logos/google.png')}`}
                                      className="max-h-35px"
                                      alt="brand-logo"
                                    />
                                    :
                                    platform === "total reviews" ?
                                      <h5 style={{ color: "#007bff" }}>total reviews</h5>
                                      :

                                      ''
                                }
                              </span>
                            </td>
                            <td>
                              {/* <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                {clientPhone}
                              </span> */}
                              {/* <span className="text-muted font-weight-bold">
                                In Proccess
                      </span> */}
                            </td>
                            <td>
                              <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                {clientPhone}
                              </span>
                              {/* <span className="text-muted font-weight-bold">Paid</span> */}
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
                              <Box component="fieldset" borderColor="transparent">
                                <Rating
                                  readOnly={true}
                                  size="medium"
                                  name="simple-controlled"
                                  value={clientRating}
                                />
                              </Box>
                            </td>
                            {/* <td className="pr-0 text-right">
                              <a
                                href="#"
                                className="btn btn-light-success font-weight-bolder font-size-sm"
                              >
                                View Offer
                      </a>
                            </td> */}
                          </tr>
                        ))
                      }

                      {
                        filteredFacebookReviews.map(({ name, page }, index) => (
                          page.map(({ created_time, recommendation_type, review_text }) => (
                            <tr key={index + 1}>
                              <td className="pl-0 py-8">
                                <div className="d-flex align-items-center">
                                  <div className="symbol symbol-50 symbol-light mr-4">
                                    <span className="symbol-label">
                                      <SVG
                                        className="h-75 align-self-end"
                                        src={toAbsoluteUrl(
                                          "/media/svg/avatars/001-boy.svg"
                                        )}
                                      ></SVG>
                                    </span>
                                  </div>
                                  <div>
                                    <a
                                      href="#"
                                      className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                                    >
                                      {name}
                                    </a>
                                    <span className="text-muted font-weight-bold d-block">
                                      <ReadMore>
                                        {review_text}
                                      </ReadMore>
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <span className="symbol-label">
                                  <img
                                    src={`${toAbsoluteUrl('/media/logos/facebook.png')}`}
                                    className="max-h-50px"
                                    alt="brand-logo"
                                  />

                                </span>
                              </td>
                              <td>
                                {/* <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                {clientPhone}
                              </span> */}
                                {/* <span className="text-muted font-weight-bold">
                                In Proccess
                      </span> */}
                              </td>
                              <td>
                                <span className="text-dark-75 font-weight-bolder d-block font-size-lg">

                                </span>
                                {/* <span className="text-muted font-weight-bold">Paid</span> */}
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
                                {/* <Box component="fieldset" borderColor="transparent">
                                  <Rating
                                    readOnly={true}
                                    size="medium"
                                    name="simple-controlled"
                                    value={clientRating}
                                  />
                                </Box> */}
                              </td>
                              {/* <td className="pr-0 text-right">
                              <a
                                href="#"
                                className="btn btn-light-success font-weight-bolder font-size-sm"
                              >
                                View Offer
                      </a>
                            </td> */}
                            </tr>
                          ))
                        ))
                      }

                    </tbody>
                  </table>
                </div>
                :
                <h5 className="text-center mt-4">No Reviews Yet</h5>
            }
            {/* {
              _.isEmpty(reviews) !== true ?
                <TablePagination
                  value={value}
                  totalPages={totalPages}
                  pageNumbers={pageNumbers}
                  onPageSearch={onPageSearch}
                  handlePagination={handlePagination}
                />
                : ''
            } */}
            {/* end::Table */}
          </div>
        </div>
        {/* end::Body */}
      </div>
      {/* end::Advance Table Widget 9 */}
    </>
  );
}
