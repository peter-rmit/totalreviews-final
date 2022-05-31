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

import { ReviewedReqFilters, DayFilters } from "../../../../app/utils/filter-schemas";
import Axios from "axios";
import moment from "moment";


var pageNumbers = [];

export function TempAdvanceTable({ className, Reviews, SyncReviews }) {
  return (
    <>
      {/* begin::Advance Table Widget 9 */}
      <div className={`card card-custom ${className}`}>
        {/* begin::Header */}
        <div className="card-header justify-content-evenly border-0 py-5">
          <h3 className="card-title align-items-center flex-column">
            <span className="card-label font-weight-bolder text-dark">
              Facebook Reviews
            </span>
          </h3>
          {/* <div className="card-toolbar tools">
                        <Filter
                            data={ReviewedReqFilters}
                            dayFilter={DayFilters}
                            day={day}
                            rows={rows}
                            filter={filter}
                            setRows={handleRows}
                            handleSearch={handleSearch}
                            handleFilter={handleFilter}
                            handleDayFilter={handleDayFilter}
                        />
                    </div> */}
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
              Reviews && _.isEmpty(Reviews) !== true ?

                <div className="table-responsive all-reviews">
                  <table className="table table-head-custom table-vertical-center table-head-bg table-borderless">
                    <thead>
                      <tr className="text-left">
                        <th style={{ minWidth: "200px" }} className="pl-7">
                          <span className="text-dark-75">reviews</span>
                        </th>
                        {/* <th style={{ minWidth: "120px" }}>
                                                    <span className="text-dark-75">review on</span>
                                                </th> */}
                        <th style={{ minWidth: "100px" }}></th>
                        <th style={{ minWidth: "140px" }}>
                          <span className="text-dark-75">type</span>
                        </th>
                        <th style={{ minWidth: "100px" }}></th>
                        <th style={{ minWidth: "200px" }}>
                          <span className="text-dark-75">date</span>
                        </th>
                        {/* <th style={{ minWidth: "100px" }} /> */}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Reviews.map(({ created_time, review_text, recommendation_type }, index) => (
                          <tr key={index}>
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
                                  {/* <a
                                                                        href="#"
                                                                        className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                                                                    >
                                                                        {created_time}
                                                                    </a> */}
                                  <span className="text-muted font-weight-bold d-block text-wrap">
                                    {review_text}
                                  </span>
                                </div>
                              </div>
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
                                {recommendation_type}
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
                              <span
                                className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                              >
                                {moment(created_time).format('MMMM Do YYYY')}
                              </span>
                            </td>
                            {/* <td>
                                                            <Box component="fieldset" borderColor="transparent">
                                                                <Rating
                                                                    readOnly={true}
                                                                    size="medium"
                                                                    name="simple-controlled"
                                                                    value={clientRating}
                                                                />
                                                            </Box>
                                                        </td> */}
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
                      {/* <tr>
                    <td className="pl-0 py-0">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50 symbol-light mr-4">
                          <span className="symbol-label">
                            <SVG
                              className="h-75 align-self-end"
                              src={toAbsoluteUrl(
                                "/media/svg/avatars/018-girl-9.svg"
                              )}
                            ></SVG>{" "}
                          </span>
                        </div>
                        <div>
                          <a
                            href="#"
                            className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                          >
                            Jessie Clarcson
                          </a>
                          <span className="text-muted font-weight-bold d-block">
                            C#, ASP.NET, MS SQL
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="symbol-label">
                        <img
                          src={`${toAbsoluteUrl('/media/logos/google.png')}`}
                          className="max-h-30px"
                          alt="brand-logo"
                        />
                      </span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        $23,000,000
                      </span>
                      <span className="text-muted font-weight-bold">
                        Pending
                      </span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        $1,600
                      </span>
                      <span className="text-muted font-weight-bold">
                        Rejected
                      </span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        Agoda
                      </span>
                      <span className="text-muted font-weight-bold">
                        Houses & Hotels
                      </span>
                    </td>
                    <td>
                      <img
                        src={`${toAbsoluteUrl("/media/logos/stars.png")}`}
                        alt="image"
                        style={{ width: "5rem" }}
                      />
                      <span className="text-muted font-weight-bold d-block">
                        Above Average
                      </span>
                    </td>
                    <td className="pr-0 text-right">
                      <a
                        href="#"
                        className="btn btn-light-success font-weight-bolder font-size-sm"
                      >
                        View Offer
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-0 py-8">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50 symbol-light mr-4">
                          <span className="symbol-label">
                            <SVG
                              className="h-75 align-self-end"
                              src={toAbsoluteUrl(
                                "/media/svg/avatars/047-girl-25.svg"
                              )}
                            ></SVG>{" "}
                          </span>
                        </div>
                        <div>
                          <a
                            href="#"
                            className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                          >
                            Lebron Wayde
                          </a>
                          <span className="text-muted font-weight-bold d-block">
                            PHP, Laravel, VueJS
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        $34,000,000
                      </span>
                      <span className="text-muted font-weight-bold">Paid</span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        $6,700
                      </span>
                      <span className="text-muted font-weight-bold">Paid</span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        RoadGee
                      </span>
                      <span className="text-muted font-weight-bold">
                        Transportation
                      </span>
                    </td>
                    <td>
                      <img
                        src={`${toAbsoluteUrl("/media/logos/stars.png")}`}
                        alt="image"
                        style={{ width: "5rem" }}
                      />
                      <span className="text-muted font-weight-bold d-block">
                        Best Rated
                      </span>
                    </td>
                    <td className="pr-0 text-right">
                      <a
                        href="#"
                        className="btn btn-light-success font-weight-bolder font-size-sm"
                      >
                        View Offer
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-0 py-0">
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50 symbol-light mr-4">
                          <span className="symbol-label">
                            <SVG
                              className="h-75 align-self-end"
                              src={toAbsoluteUrl(
                                "/media/svg/avatars/014-girl-7.svg"
                              )}
                            ></SVG>
                          </span>
                        </div>
                        <div>
                          <a
                            href="#"
                            className="text-dark font-weight-bolder text-hover-primary mb-1 font-size-lg"
                          >
                            Natali Trump
                          </a>
                          <span className="text-muted font-weight-bold d-block">
                            Python, PostgreSQL, ReactJS
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        $2,600,000
                      </span>
                      <span className="text-muted font-weight-bold">Paid</span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        $14,000
                      </span>
                      <span className="text-muted font-weight-bold">
                        Pending
                      </span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        The Hill
                      </span>
                      <span className="text-muted font-weight-bold">
                        Insurance
                      </span>
                    </td>
                    <td>
                      <img
                        src={`${toAbsoluteUrl("/media/logos/stars.png")}`}
                        alt="image"
                        style={{ width: "5rem" }}
                      />
                      <span className="text-muted font-weight-bold d-block">
                        Average
                      </span>
                    </td>
                    <td className="pr-0  text-right">
                      <a
                        href="#"
                        className="btn btn-light-success font-weight-bolder font-size-sm"
                      >
                        View Offer
                      </a>
                    </td>
                  </tr> */}
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
