/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useLayoutEffect, useEffect, useState } from "react";
import objectPath from "object-path";
import { useLocation } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_helpers";
import { QuickActions } from "./components/QuickActions";
import { BreadCrumbs } from "./components/BreadCrumbs";
import {
  getBreadcrumbsAndTitle,
  useSubheader,
} from "../../_core/MetronicSubheader";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { NewReviewButton } from '../../../Modals';
import { getAllUserClient } from '../../../../app/modules/Auth/_redux/authCrud';
import { shallowEqual, useSelector } from "react-redux";


export function SubHeader(props) {
  console.log('props:', props);
  const uiService = useHtmlClassService();
  const location = useLocation();
  const subheader = useSubheader();

  const [modalShow, setModalShow] = useState(false);
  const [userId, setUserId] = useState('');
  const [userClients, setUserClients] = useState([]);
  const [addUser, setAddUser] = useState(false);

  const layoutProps = useMemo(() => {
    return {
      config: uiService.config,
      subheaderFixed: objectPath.get(uiService.config, "subheader.fixed"),
      subheaderMobileToggle: objectPath.get(
        uiService.config,
        "subheader.mobile-toggle"
      ),
      subheaderCssClasses: uiService.getClasses("subheader", true),
      subheaderContainerCssClasses: uiService.getClasses(
        "subheader_container",
        true
      ),
    };
  }, [uiService]);

  useLayoutEffect(() => {
    const aside = getBreadcrumbsAndTitle("kt_aside_menu", location.pathname);
    const header = getBreadcrumbsAndTitle("kt_header_menu", location.pathname);
    const breadcrumbs =
      aside && aside.breadcrumbs.length > 0
        ? aside.breadcrumbs
        : header.breadcrumbs;
    subheader.setBreadcrumbs(breadcrumbs);
    subheader.setTitle(
      aside && aside.title && aside.title.length > 0
        ? aside.title
        : header.title
    );
    // eslint-disable-next-line
  }, [location.pathname]);

  // Do not remove this useEffect, need from update title/breadcrumbs outside (from the page)
  useEffect(() => { }, [subheader, modalShow]);

  let clients = useSelector((state) => state.auth.clients, shallowEqual);
  let id = useSelector((state) => state.auth.user.id, shallowEqual);

  useEffect(() => {
    // if (clients) {
    //   setUserClients(clients);
    // }
    // else
    if (id) {
      getAllUserClient({ userId: id },)
        .then(({ data: { data: { clients } } }) => {
          setUserClients(clients);
          props.setClient(clients);
        })
        .catch((e) => {
          console.log('SubheaderCatchError', e)
        });
    }
  }, [id, clients, addUser])


  let showModal = () => {
    setModalShow(true);
  }
  let closeModal = () => setModalShow(false);

  return (
    <div
      id="kt_subheader"
      className={`subheader py-3 py-lg-8 ${layoutProps.subheaderCssClasses}`}
    >
      <div
        className={`${layoutProps.subheaderContainerCssClasses} d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap`}
      >
        {/* Info */}
        <div className="d-flex align-items-center flex-wrap mr-1">
          {/* begin::Mobile Toggle */}
          {layoutProps.subheaderMobileToggle && (
            <button
              className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none"
              id="kt_subheader_mobile_toggle"
            >
              <span />
            </button>
          )}
          {/* end::Mobile Toggle */}

          {/* begin::Heading */}
          <div className="d-flex align-items-baseline mr-5">
            {/* begin::Title */}
            <h2 className="subheader-title text-dark font-weight-bold my-2 mr-3">
              {subheader.title}
            </h2>
            {/* end::Title */}

            <BreadCrumbs items={subheader.breadcrumbs} />
          </div>
          {/* end::Heading */}
        </div>
        {/* Info */}

        {/* Toolbar */}
        <div className="d-flex align-items-center flex-wrap">
          <button
            type="button"
            onClick={showModal}
            className={`btn btn-primary btn-fixed-height font-weight-bold px-2 px-lg-5 mr-2`}
          >
            <span className="svg-icon svg-icon-lg" >
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Add-user.svg"
                )}
              />
            </span>
            {` `}New Rating Request
          </button>
          <NewReviewButton show={modalShow} onHide={closeModal}
            id={id} data={userClients}
            setAddUser={setAddUser} addUser={addUser} />

          <QuickActions />

          {/* Button */}
          {/* <button
            className="btn btn-primary btn-icon font-weight-bolds   "
            data-toggle="modal"
            data-target="#kt_chat_modal"
          >
            <span className="svg-icon svg-icon-lg">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Group-chat.svg"
                )}
              />
            </span>
          </button> */}
        </div>
      </div>
    </div>
  );
}
