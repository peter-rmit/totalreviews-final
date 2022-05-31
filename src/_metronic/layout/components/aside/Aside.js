/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import objectPath from "object-path";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../_helpers";
import { AsideSearch } from "./AsideSearch";
import { AsideMenu } from "./aside-menu/AsideMenu";
import { LanguageSelectorDropdown } from "../extras/dropdowns/LanguageSelectorDropdown";
import { QuickUserToggler } from "../extras/QuickUserToggler";
import { Brand } from "../brand/Brand";
import { KTUtil } from "./../../../_assets/js/components/util";
import { NavLink } from "react-router-dom"
import { useHistory } from "react-router";

export function Aside() {
  const uiService = useHtmlClassService();
  const history = useHistory();

  const layoutProps = useMemo(() => {
    return {
      asideClassesFromConfig: uiService.getClasses("aside", true),
      // asideSecondaryDisplay: objectPath.get(
      //   uiService.config,
      //   "aside.secondary.display"
      // ),
      // asideSelfMinimizeToggle: objectPath.get(
      //   uiService.config,
      //   "aside.self.minimize.toggle"
      // ),
      extrasSearchDisplay: objectPath.get(
        uiService.config,
        "extras.search.display"
      ),
      extrasNotificationsDisplay: objectPath.get(
        uiService.config,
        "extras.notifications.display"
      ),
      extrasQuickActionsDisplay: objectPath.get(
        uiService.config,
        "extras.quick-actions.display"
      ),
      extrasQuickPanelDisplay: objectPath.get(
        uiService.config,
        "extras.quick-panel.display"
      ),
      extrasLanguagesDisplay: objectPath.get(
        uiService.config,
        "extras.languages.display"
      ),
      extrasUserDisplay: objectPath.get(
        uiService.config,
        "extras.user.display"
      ),
    };
  }, [uiService]);

  const tabs = {
    tabId1: "kt_aside_tab_1",
    tabId2: "kt_aside_tab_2",
    tabId3: "kt_aside_tab_3",
    tabId4: "kt_aside_tab_4",
    tabId5: "kt_aside_tab_5",
    tabId6: "kt_aside_tab_6",
  };
  const [activeTab, setActiveTab] = useState(tabs.tabId1);
  const handleTabChange = (id) => {
    setActiveTab(id);
    const asideWorkspace = KTUtil.find(
      document.getElementById("kt_aside"),
      ".aside-secondary .aside-workspace"
    );
    if (asideWorkspace) {
      KTUtil.scrollUpdate(asideWorkspace);
    }
  };

  const logoutClick = () => {

    const toggle = document.getElementById("kt_quick_user_toggle");
    if (toggle) {
      toggle.click();
    }
    history.push("/logout");
  };


  return (
    <>
      {/* begin::Aside */}
      <div
        id="kt_aside"
        className={`aside aside-left d-flex ${layoutProps.asideClassesFromConfig}`}
      >
        {/* begin::Primary */}
        <div className="aside-primary d-flex flex-column align-items-center flex-row-auto">
          <Brand />
          {/* begin::Nav Wrapper */}
          <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull">
            {/* begin::Nav */}
            <ul className="list-unstyled flex-column" role="tablist">
              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="Latest Project"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-project">Dashboard</Tooltip>
                  }
                >
                  <NavLink
                    to="/dashboard"
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId1 && "active"}`}
                    data-toggle="tab"
                    data-target={`#${tabs.tabId1}`}
                    role="tab"
                    onClick={() => handleTabChange(tabs.tabId1)}
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Layout/Layout-4-blocks.svg"
                        )}
                      />
                    </span>
                  </NavLink>
                </OverlayTrigger>
              </li>
              {/* end::Item */}

              {/* begin::Item */}
              {/* <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="Metronic Features"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="metronic-features">Metronic Features</Tooltip>
                  }
                >
                  <Link
                    to="#"
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId2 && "active"}`}
                    data-toggle="tab"
                    data-target={`#${tabs.tabId2}`}
                    onClick={() => handleTabChange(tabs.tabId2)}
                    role="tab"
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Group.svg"
                        )}
                      />
                    </span>
                  </Link>
                </OverlayTrigger>
              </li> */}
              {/* end::Item */}

              {/* begin::Item */}
              {/* <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="Latest Reports"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="latest-reports">Latest Reports</Tooltip>
                  }
                >
                  <Link
                    to="#"
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId3 && "active"}`}
                    data-toggle="tab"
                    data-target={`#${tabs.tabId3}`}
                    role="tab"
                    onClick={() => handleTabChange(tabs.tabId3)}
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Media/Equalizer.svg"
                        )}
                      />
                    </span>
                  </Link>
                </OverlayTrigger>
              </li> */}
              {/* end::Item */}

              {/* begin::Item */}
              {/* <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="Project Management"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="project-management">
                      Project Management
                    </Tooltip>
                  }
                >
                  <Link
                    to="#"
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId4 && "active"}`}
                    data-toggle="tab"
                    data-target={`#${tabs.tabId4}`}
                    role="tab"
                    onClick={() => handleTabChange(tabs.tabId4)}
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/General/Shield-check.svg"
                        )}
                      />
                    </span>
                  </Link>
                </OverlayTrigger>
              </li> */}
              {/* end::Item */}

              {/* begin::Ite
              {/* begin::Item */}
              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="User Management"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="user-management">User Management</Tooltip>
                  }
                >
                  <NavLink to="/user-management" onClick={() => handleTabChange(tabs.tabId5)}
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId5 && "active"}`}
                    data-toggle="tab"
                    data-target={`#${tabs.tabId5}`}
                    role="tab">
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}
                      />
                    </span>
                  </NavLink>
                  {/* <a
                    href="/user-management"
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId5 && "active"}`}
                    data-toggle="tab"
                    data-target={`#${tabs.tabId5}`}
                    role="tab"
                    onClick={() => handleTabChange(tabs.tabId5)}
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}
                      />
                    </span>
                  </a> */}
                </OverlayTrigger>
              </li>
              {/* end::Item */}

              <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="User Management"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="user-management">User Profile</Tooltip>
                  }
                >
                  <NavLink to="/user-profile/personal-information" onClick={() => handleTabChange(tabs.tabId4)}
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId4 && "active"}`}
                    data-toggle="tab"
                    data-target={`#${tabs.tabId4}`}
                    role="tab">
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl("/media/svg/icons/General/User.svg")}
                      />
                    </span>
                  </NavLink>
                  {/* <a
                    href="/user-management"
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId5 && "active"}`}
                    data-toggle="tab"
                    data-target={`#${tabs.tabId5}`}
                    role="tab"
                    onClick={() => handleTabChange(tabs.tabId5)}
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl("/media/svg/icons/Home/Library.svg")}
                      />
                    </span>
                  </a> */}
                </OverlayTrigger>
              </li>
              {/* end::Item */}
              {/* begin::Item */}
              {/* <li
                className="nav-item mb-3"
                data-toggle="tooltip"
                data-placement="rigth"
                data-container="body"
                data-boundary="window"
                title="Privacy Policy"
              >
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="privacy-policy">
                      Privacy Policy
                    </Tooltip>
                  }
                >
                  <NavLink to="/privacy-policy" onClick={() => handleTabChange(tabs.tabId6)}
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId6 && "active"}`}
                    data-toggle="tab"
                    data-target={`#${tabs.tabId6}`}
                    role="tab">
                    <span className="svg-icon svg-icon-lg">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                    </span>
                  </NavLink>
                  <a
                    href="#"
                    className={`nav-link btn btn-icon btn-clean btn-lg ${activeTab ===
                      tabs.tabId6 && "active"}`}
                    data-toggle="tab"
                    data-target={`#${tabs.tabId6}`}
                    role="tab"
                    onClick={() => handleTabChange(tabs.tabId6)}
                  >
                    <span className="svg-icon svg-icon-lg">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Files/File-plus.svg"
                        )}
                      />
                    </span>
                  </a>
                </OverlayTrigger>
              </li> */}
              {/* end::Item */}
            </ul>
            {/* end::Nav */}
          </div>
          {/* end::Nav Wrapper */}

          {/* begin::Footer */}
          <div className="aside-footer d-flex flex-column align-items-center flex-column-auto py-4 py-lg-10">
            {/* begin::Aside Toggle */}
            {/* {layoutProps.asideSecondaryDisplay &&
              layoutProps.asideSelfMinimizeToggle && (
                <>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="toggle-aside">Toggle Aside</Tooltip>}
                  >
                    <span
                      className="aside-toggle btn btn-icon btn-primary btn-hover-primary shadow-sm"
                      id="kt_aside_toggle"
                    >
                      <i className="ki ki-bold-arrow-back icon-sm" />
                    </span>
                  </OverlayTrigger>
                </>
              )}  */}
            {/* end::Aside Toggle

            {/* begin::Search */}
            {/* {layoutProps.extrasSearchDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="toggle-search">Quick Search</Tooltip>}
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1"
                  id="kt_quick_search_toggle"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/General/Search.svg")}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )} */}
            {/* end::Search */}

            {/* begin::Notifications */}
            {/* {layoutProps.extrasNotificationsDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="toggle-notifications">Notifications</Tooltip>
                }
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1 position-relative"
                  id="kt_quick_notifications_toggle"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )} */}
            {/* end::Notifications */}

            {/* begin::Quick Actions */}
            {layoutProps.extrasQuickActionsDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="toggle-quick-actions">Logout</Tooltip>
                }
              >
                <a
                  href="#"
                  onClick={logoutClick}
                  className="btn btn-icon btn-clean btn-lg mb-1"
                  id="kt_quick_actions_toggle"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Media/logout.svg"
                      )}
                    />
                  </span>
                </a>
              </OverlayTrigger>
            )}
            {/* end::Quick Actions */}

            {/* begin::Quick Panel */}
            {/* {layoutProps.extrasQuickPanelDisplay && (
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip id="toggle-quick-panel">Quick Panel</Tooltip>}
              >
                <a
                  href="#"
                  className="btn btn-icon btn-clean btn-lg mb-1 position-relative"
                  id="kt_quick_panel_toggle"
                  data-placement="right"
                  data-container="body"
                  data-boundary="window"
                >
                  <span className="svg-icon svg-icon-lg">
                    <SVG
                      src={toAbsoluteUrl(
                        "/media/svg/icons/Layout/Layout-4-blocks.svg"
                      )}
                    />
                  </span>
                  <span className="label label-sm label-light-danger label-rounded font-weight-bolder position-absolute top-0 right-0 mt-1 mr-1">
                    3
                  </span>
                </a>
              </OverlayTrigger>
            )} */}
            {/* end::Quick Panel */}

            {/* begin::Languages*/}
            {/* {layoutProps.extrasLanguagesDisplay && <LanguageSelectorDropdown />} */}
            {/* end::Languages */}

            {/* begin::User*/}

            {/* {layoutProps.extrasUserDisplay && <QuickUserToggler />} */}
            {/* end::User */}
          </div>
          {/* end::Footer */}
        </div>
        {/* end::Primary */}

        {/* {layoutProps.asideSecondaryDisplay && (
          <> */}
        {/* begin::Secondary */}
        {/* <div className="aside-secondary d-flex flex-row-fluid"> */}
        {/* begin::Workspace */}
        {/* <div className="aside-workspace scroll scroll-push my-2">
                <div className="tab-content">
                  <AsideSearch isActive={activeTab === tabs.tabId1} />
                  <AsideMenu isActive={activeTab === tabs.tabId2} />
                </div>
              </div> */}
        {/* end::Workspace */}
        {/* </div> */}
        {/* end::Secondary */}
        {/* </> */}
        {/* )} */}
      </div>
      {/* end::Aside */}
    </>
  );
}
