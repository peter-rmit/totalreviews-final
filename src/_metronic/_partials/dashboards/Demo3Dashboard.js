import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useSubheader } from "../../../_metronic/layout";
import Axios from "axios";
import { connect, shallowEqual, useSelector } from "react-redux";
import { TempAdvanceTable } from "../widgets/advance-tables/tempAdvanceTable";
import { actions } from '../../../app/modules/Auth/_redux/authRedux'
import store from '../../../redux/store';
import axiosInstance from '../../../app/modules/Auth/_redux/authCrud';

import {
  MixedWidget4,
  BaseTablesWidget1,
  BaseTablesWidget2,
  BaseTablesWidget6,
  StatsWidget11,
  StatsWidget10,
  ListsWidget8,
  ListsWidget10,
  ListsWidget14,
  AdvanceTablesWidget9,
} from "../widgets";

const { setPage } = actions;

export function Demo3Dashboard() {
  const suhbeader = useSubheader();
  suhbeader.setTitle("Dashboard");
  const { facebookId, facebookToken } = useSelector((state) => state.auth.user, shallowEqual);
  const [reviews, setReviews] = useState([]);
  const [filteredFacebookReviews, setFilteredFacebookReviews] = useState([]);

  let FetchFacebookReviews = async () => {
    const pages = await Axios.get(`https://graph.facebook.com/v11.0/${facebookId}/accounts?fields=name,access_token&access_token=${facebookToken}`)
    const { data: { data } } = pages;
    console.log("pages >>", data);
    store.dispatch(setPage(data));
    let updatedReviews = [];
    for (let i = 0; i < data.length; i++) {
      const { id, access_token, name } = data[i];
      if (id && access_token) {
        // console.log(`iteration: ${i}`);
        const { data: { data } } = await Axios.get(`https://graph.facebook.com/v11.0/${id}/ratings?access_token=${access_token}`)
        // console.log(`review ${i}  >>`, data);
        updatedReviews = [...updatedReviews, { name: name, page: data }];
        // console.log(`stored ${i}`, updatedReviews);
      }
    }
    // console.log('latestRecieved: ', updatedReviews);
    setReviews(updatedReviews);
    setFilteredFacebookReviews(updatedReviews)
  }

  useEffect(() => {
    FetchFacebookReviews();
  }, [])

  return (
    <>
      {/*SEO Support*/}
      <Helmet>
        <title>Dashboard | TotalReviews</title>

      </Helmet>
      {/* begin::Dashboard */}

      {/* begin::Row */}
      <div className="row">
        <div className="col-xl-4">
          <MixedWidget4 className="gutter-b card-stretch" />
        </div>
        <div className="col-xl-8">
          <BaseTablesWidget6 className="gutter-b" />
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className="row">
        <div className="col-xl-4">
          <div className="row">
            <div className="col-xl-12">
              <StatsWidget11
                className="gutter-b"
                symbolShape="circle"
                baseColor="danger"
              />
            </div>
            <div className="col-xl-12">
              <StatsWidget10
                className="gutter-b"
                symbolShape="circle"
                baseColor="info"
              />
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <ListsWidget14 className="gutter-b card-stretch" />
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className="row">
        <div className="col-lg-12 col-xxl-12">
          <AdvanceTablesWidget9
            className="card-stretch gutter-b"
            Reviews={reviews}
            SyncReviews={FetchFacebookReviews}
            setFilterFBReviews={setFilteredFacebookReviews}
            filteredFacebookReviews={filteredFacebookReviews}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 col-xxl-12">
          {/* <TempAdvanceTable
            className="card-stretch gutter-b"
            Reviews={reviews}
            SyncReviews={FetchFacebookReviews}
          /> */}
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      {/* <div className="row">
        <div className="col-xl-6">
          <ListsWidget10 className="card-stretch gutter-b" />
        </div>
        <div className="col-xl-6">
          <BaseTablesWidget1 className="card-stretch gutter-b" />
        </div>
      </div> */}
      {/* end::Row */}

      {/* begin::Row */}
      <div className="row">
        <div className="col-lg-4">
          <ListsWidget8 className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-8">
          <BaseTablesWidget2 className="card-stretch gutter-b" />
        </div>
      </div>
      {/* end::Row */}

      {/* end::Dashboard */}
    </>
  );
}
const mapDispatchToProps = {
  setPage
}

