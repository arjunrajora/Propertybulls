import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
// import ClipLoader from "react-spinners/ClipLoader";
// import { BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
const config = require("../config/config");

export default function AdminHeader() {
  const navigate = useNavigate();
  const [allData, setallData] = useState([])
  const clearUserData = () => {
    localStorage.clear();
    navigate("/admin", { replace: true });
    return true;
  };
  const apiUrl = config.API_URL + "auth/";
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userId"));
    if (id) {
      fetch(apiUrl + id)
        .then((response) => response.json())
        .then((value) => {
          setallData(value.data);
        });
    }
  }, []);

  return (
    <React.Fragment>
      {<Helmet>

        <link
          rel="apple-touch-icon"
          href={config.SITE_URL + "theme-assets/images/ico/apple-icon-120.png"}
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href={config.SITE_URL + "theme-assets/images/ico/favicon.ico"}
        />


        <link
          rel="stylesheet"
          type="text/css"
          href={config.SITE_URL + "theme-assets/css/vendors.css"}
        />

        <link
          rel="stylesheet"
          type="text/css"
          href={config.SITE_URL + "theme-assets/css/app-lite.css"}
        />


        <link
          rel="stylesheet"
          type="text/css"
          href={config.SITE_URL + "theme-assets/css/design.css"}
        />

      </Helmet>}

      <nav className="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light __web-inspector-hide-shortcut__">
        <div className="navbar-wrapper">
          <div className="navbar-container content">
            <div
              className="collapse navbar-collapse show d-flex justify-content-between align-items-center h-100"
              id="navbar-mobile"
            >
              <ul className="nav navbar-nav mr-auto">
                <li className="nav-item d-block d-md-none">
                  <a
                    className="nav-link nav-menu-main menu-toggle hidden-xs is-active"
                  >
                    <i className="ft-menu"></i>
                  </a>
                </li>
              </ul>
              <ul className="nav navbar-nav align-items-center">
                <li className="dropdown dropdown-user nav-item myAccountMenu">
                  <a
                    className="dropdown-toggle nav-link dropdown-user-link"
                    href="/admin/dashboard"
                    data-toggle="dropdown"
                  >
                    <span className="topname">
                      <img
                        alt="Account"
                        src={config.Image_URL + allData.Image}
                      />
                      {allData.name ? allData.name : "account"} <i className="fas fa-sort-down"></i>
                    </span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <div className="arrow_box_right">
                      <div className="dropdown-item">
                        <Link to="/admin/users/current" className="nav-link">
                          <i className="fas fa-user"></i>
                          <span>My Profile</span>
                        </Link>
                      </div>
                      <a className="dropdown-item" href="/admin/dashboard">
                        <i className="fas fa-rupee-sign"></i>
                        <span>Account &amp; Billing</span>
                      </a>
                      <a className="dropdown-item" onClick={clearUserData}>
                        <i className="fas fa-power-off" ></i>
                        <span>Logout</span>
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="main-menu menu-fixed menu-light menu-accordion    menu-shadow "
        data-scroll-to-active="true"
        data-img="theme-assets/images/backgrounds/02.jpg"
      >
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mr-auto d-flex align-items-center">
              <Link className="navbar-brand leftMenuLogo" to="/admin/dashboard">
                <img
                  className="brand-logo"
                  alt="Admin logo"
                  src={config.SITE_URL + "theme-assets/images/logo/logo.png"}
                />
              </Link>
            </li>
          </ul>
        </div>
        <div className="main-menu-content adminLeftMenuContainer">
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link">
                <i className="leftMenuIcon fas fa-home"></i>
                <span className="menu-title" data-i18n="">
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/users/customer">
                <i className="leftMenuIcon fas fa-users"></i>
                <span className="menu-title" data-i18n="">
                  Customer Manager
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/role" className="nav-link">
                <i className="leftMenuIcon fas fa-user-tie"></i>
                <span className="menu-title" data-i18n="">
                  Agents Manager
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/builder" className="nav-link">
                <i className="leftMenuIcon fas fa-building"></i>
                <span className="menu-title" data-i18n="">
                  Builder Manager
                </span>
              </Link>
            </li>

            <li className="nav-item dropdown dropDownMenu">
              <Link
                className="dropdown-toggle nav-link"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="leftMenuIcon fas fa-headset"></i>
                <span className="menu-title" data-i18n="">
                  Service Provider Manager
                </span>
              </Link>
              <div className="dropdown-menu">
                <Link
                  to="/admin/serviceProviderCategory"
                  className="dropdown-item"
                >
                  <span>Service Provider Category</span>
                </Link>
                <Link to="/admin/serviceProvider" className="dropdown-item">
                  <span>View Service Provider</span>
                </Link>
              </div>
            </li>

            <li className="nav-item dropdown dropDownMenu">
              <Link
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="leftMenuIcon fas fa-city"></i>
                <span className="menu-title" data-i18n="">
                  Property Manager
                </span>
              </Link>
              <div className="dropdown-menu">
                <Link to="/admin/property" className="dropdown-item">
                  <span>View Property</span>
                </Link>
                <Link to="/admin/propertyType" className="dropdown-item">
                  <span>View Property Type</span>
                </Link>
                <Link to="/admin/propertyFeature" className="dropdown-item">
                  <span>View Property Features</span>
                </Link>
                <Link to="/admin/propertyFacing" className="dropdown-item">
                  <span>View Property Facing</span>
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <Link to="/admin/project" className="nav-link">
                <i className="leftMenuIcon fas fa-tasks"></i>
                <span className="menu-title" data-i18n="">
                  Project Manager
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/requirement">
                <i className="leftMenuIcon fas fa-sticky-note"></i>
                <span className="menu-title" data-i18n="">
                  Requirement Manager
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/contactInquiry">
                <i className="leftMenuIcon fas fa-sticky-note"></i>
                <span className="menu-title" data-i18n="">
                  Contact Inquiry Manager
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/requirementAlert">
                <i className="leftMenuIcon fas fa-sticky-note"></i>
                <span className="menu-title" data-i18n="">
                  Requirement Alerts Manager
                </span>
              </Link>
            </li>

            <li className="nav-item dropdown dropDownMenu">
              <Link
                className="dropdown-toggle"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="leftMenuIcon fas fa-map-marker-alt"></i>
                <span className="menu-title" data-i18n="">
                  Location Manager
                </span>
              </Link>
              <div className="dropdown-menu">
                <Link to="/admin/state" className="dropdown-item">
                  <span>State</span>
                </Link>
                <Link to="/admin/city" className="dropdown-item">
                  <span>City</span>
                </Link>
                <Link to="/admin/location" className="dropdown-item">
                  <span>Location</span>
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <Link to="/admin/slider">
                <i className="leftMenuIcon fas fa-image"></i>
                <span className="menu-title" data-i18n="">
                  Slider Manager
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/static">
                <i className="leftMenuIcon fas fa-file-alt"></i>
                <span className="menu-title" data-i18n="">
                  Static Pages Manager
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/faq">
                <i className="leftMenuIcon fas fa-file-alt"></i>
                <span className="menu-title" data-i18n="">
                  FAQ Post
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/article">
                <i className="leftMenuIcon fas fa-link"></i>
                <span className="menu-title" data-i18n="">
                  Article Manager
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/seo">
                <i className="leftMenuIcon fas fa-laptop"></i>
                <span className="menu-title" data-i18n="">
                  SEO Manager
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/newsletter">
                <i className="leftMenuIcon fas fa-envelope"></i>
                <span className="menu-title" data-i18n="">
                  Newsletter
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/subscription" className="nav-link">
                <i className="leftMenuIcon fas fa-user-tie"></i>
                <span className="menu-title" data-i18n="">
                  Subscription Manager
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/package" className="nav-link">
                <i className=" leftMenuIcon fas fa-box-open"></i>
                <span className="menu-title" data-i18n="">
                  Package Manager
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/emailTemplate">
                <i className="leftMenuIcon fas fa-envelope"></i>
                <span className="menu-title" data-i18n="">
                  Email Template
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/loan">
                <i className="leftMenuIcon fas fa-rupee-sign"></i>
                <span className="menu-title" data-i18n="">
                  Loan
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/admin/visibilitymatrix">
              <i className="leftMenuIcon fas fa-user-tie"></i>
                <span className="menu-title" data-i18n="">
                Visibility Matrix

                </span>
              </Link>
            </li>


            <li className="nav-item">
              <Link to="/admin/advertisement/index">
                <i class="fa fa-audio-description" aria-hidden="true"></i>
                <span className="menu-title" data-i18n="">
                  Advertisement Package Manager

                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/advertisementsubscription">
              <i class="fa fa-audio-description" aria-hidden="true"></i>
                <span className="menu-title" data-i18n="">
                  Advertisement Subscription Manager

                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
