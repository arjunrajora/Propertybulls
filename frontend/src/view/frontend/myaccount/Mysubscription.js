import React, { useState, useEffect, useRef } from "react";
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import config from "../../../config/config";
import axios from "axios";
import Moment from "react-moment";
import hmacSHA256 from 'crypto-js/hmac-sha256';
import ClipLoader from "react-spinners/ClipLoader";
import SidePanel from "./sidepanel";
import { Link, useNavigate, usez } from "react-router-dom";
import jsPDF from "jspdf";
import { ToastContainer, toast, Zoom } from "react-toastify";
import {
  Collapse,
  Alert,
  Tooltip,
  IconButton,
} from "@mui/material";
export default function Dashboard() {
  const StaticMessage = localStorage.getItem("staticAdded");
  const [staticAdded, setStaticAdded] = useState("");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mypackagelist, setmypackageList] = useState([]);
  const Locationapi = config.API_URL + "location/viewAll";
  const [allData, setallData] = useState([]);
  const [Image, setImage] = useState("");
  const roleId = JSON.parse(localStorage.getItem("roleId"));
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  //add s   
  let count = 0;

  const currentDate = new Date(); // Get the current date

  const Id = JSON.parse(localStorage.getItem("userId"));

  useEffect(() => {
    if (StaticMessage != null && StaticMessage !== "") {
      setOpenAlert(true);
      setStaticAdded(StaticMessage);
      setTimeout(() => {
        localStorage.setItem("staticAdded", "");
        setOpenAlert(false);
      }, 3000);
    } else {
      setOpenAlert(false);
      setStaticAdded("");
    }
  }, [StaticMessage]);

  useEffect(() => {
    const Url = config.API_URL + "auth/";
    // setCus_id(Id);
    fetch(Url + Id)
      .then((response) => response.json())
      .then((e) => {
        setallData(e.data);
        setName(e.data.name);

      });

    const apiUrl = config.API_URL + "auth/";
    fetch(apiUrl + Id)
      .then((response) => response.json())
      .then((e) => {
        setallData(e.data);
      });

    const subscribeapiUrl = config.API_URL + "clint/subscribe/mypackage";
    const body = {
      user_id: Id
    }
    axios.post(subscribeapiUrl, body)
      .then((res) => {
        setmypackageList(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);

      });
  }, [fetch]);

  const handleExportPDF = async (data) => {
    try {
      const pdf = new jsPDF("p", "pt", "a4");
      const columns = ["S.No.", "Description", "HSN Code", "Qty", "Rate", "Amount"];

      var rows = []
      var temp = [
        "1",
        data ? data.Subscription.package_name : "",
        "1",
        "1",
        data ? data.Subscription.package_price : "",
        data.amount
      ];
      rows.push(temp);
      pdf.text(280, 40, "INVOICE");
      pdf.setFontSize(15);
      pdf.text(40, 110, "Property Bull Limited");
      pdf.setFontSize(11);

      const text = "FC-6, 3rd Floor, Times Centre(DCPF), Sector-16A, Gautam Buddha Nagar, Noida-201301   ";
      const maxWidth = 200;
      const lines = pdf.splitTextToSize(text, maxWidth);
      for (let i = 0; i < lines.length; i++) {
        pdf.text(40, 115 + i * 13 + 10, lines[i]);
      }
      var invoiceDate = new Date();
      var day = invoiceDate.getDate();
      var month = invoiceDate.getMonth() + 1; // Note: Months are zero-indexed
      var year = invoiceDate.getFullYear();
      var formattedDate = (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year;
      pdf.text(420, 100 + lines.length * 1 + 1, "Invoice No:");
      pdf.text(40, 114 + lines.length * 10 + 20, "Website- www.propertybull.com");
      pdf.text(40, 127 + lines.length * 10 + 20, "email id- contact@propertybull.com ");
      pdf.text(40, 141 + lines.length * 10 + 20, "Tel No- 0120-6866600");
      pdf.text(420, 102 + lines.length * 3 + 3, "Invoice Date-" + formattedDate);
      const textVerticalPosition = 1;
      const imageUrl = 'https://stage.propertybull.com/images/logo.png';
      const imageWidth = 120;
      const imageHeight = 40;
      const x = 430;
      const y = textVerticalPosition + 120;
      pdf.addImage(imageUrl, 'PNG', x, y, imageWidth, imageHeight);
      pdf.text(40, 190 + lines.length * 10 + 20, "BILL TO :");
      pdf.text(40, 208 + lines.length * 10 + 20, `${data ? data.User.name : ""}`);
      pdf.text(40, 220 + lines.length * 10 + 20, `Address:- ${data ? data.User.address : ""}`);
      pdf.text(40, 232 + lines.length * 10 + 20, `+91- ${data ? data.User.mobile : ""}`);
      pdf.text(40, 244 + lines.length * 10 + 20, data ? data.User.username : "");
      pdf.text(370, 200 + lines.length * 10 + 25, `Order Id : ${data ? data.razorpay_order_id : ""}`);
      pdf.text(438, 465, "AMOUNT PAID");
      pdf.text(450, 480, "CGST: 190.6");
      pdf.text(450, 495, "SGST: 190.6");
      pdf.text(360, 510, "Total (Inclusive of GST): 2499");
      pdf.text(418, 525, `Amount Paid:${data.amount}`);
      pdf.text(40, 555, "GSTIN -09AAICM8228P1ZN");
      pdf.text(40, 570, "PAN Number - AAICM8228P");
      pdf.text(40, 585, "CIN Number - U70109DL2013PLC256668");

      // const image = 'https://ci4.googleusercontent.com/proxy/o5oT5fgx7Ljd5ZwJtD1X2yiN820DagkbuL3zSV5QwsfUTV_k9H9FiZbVGYzBmvHWRLiLSB4gUJViq0Fi5Gk2S4XDHc-OTn_Rj5pKAsSOjeVP3Thmzw=s0-d-e1-ft#https://cdn.staticmb.com//mbimages/appimages/mailers/signature.png';
      // pdf.addImage(image, 'PNG', x, y, imageWidth, imageHeight);
      pdf.text(40, 740, "Propertybull Authorized");

      pdf.text(40, 800, "Thank you for subscribing to  www.propertybull.com Your Purchase has been successfully registered.");
      pdf.autoTable(columns, rows, {
        startY: 340,
        theme: "grid",
        styles: {
          font: "times",
          halign: "center",
          cellPadding: 3.5,
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
          textColor: [0, 0, 0],
        },
        headStyles: {
          textColor: [0, 0, 0],
          fontStyle: "normal",
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
          fillColor: [166, 204, 247],
        },
        alternateRowStyles: {
          fillColor: [212, 212, 212],
          textColor: [0, 0, 0],
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
        },
        rowStyles: {
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
        },
        tableLineColor: [0, 0, 0],
      });
      console.log(pdf.output("datauristring"));
      pdf.save("Subscription.Pakage.invoice.pdf");
    } catch (error) {
      console.log("error from data", error);
    }
  };
  return (
    <div>
      <Header />
      <div className="myAccountPage">
        <ToastContainer />

        {/* {roleId == 1 ?
          <div className="myAccountTabBar">
            <h5>Welcome to {allData.name} </h5>

            {staticAdded != null && openAlert === true && (
              <Collapse in={openAlert}>
                <Alert aria-hidden={true} severity="success">
                  {staticAdded}
                </Alert>
              </Collapse>
            )}
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
              <Link to="/dashboard">
                <li className="nav-item" role="presentation">
                  <button className="nav-link " id="pills-dashboard-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-dashboard" type="button" role="tab" aria-controls="pills-dashboard"
                    aria-selected="true">Dashboard</button>
                </li>
              </Link>
              <Link to="/dashboard/myproperties">

                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-properties-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-properties" type="button" role="tab" aria-controls="pills-properties"
                    aria-selected="false">My Properties</button>
                </li>
              </Link>
              <Link to="/dashboard/myrequirement">
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-requirements-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-requirements" type="button" role="tab" aria-controls="pills-requirements"
                    aria-selected="false">My Requirements</button>
                </li>
              </Link>
              <Link to="/dashboard/search">
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-searches-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-searches" type="button" role="tab" aria-controls="pills-searches"
                    aria-selected="false">My Searches</button>
                </li>
              </Link>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-searches-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-searches"
                  type="button"
                  role="tab"
                  aria-controls="pills-searches"
                  aria-selected="false"
                >
                  My Subscription
                </button>
              </li>
              <Link to="/dashboard/account">

                <li className="nav-item" role="presentation">
                  <button className="nav-link " id="pills-profile-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-profile-search" type="button" role="tab"
                    aria-controls="pills-profile-search" aria-selected="false">Profile</button>
                </li>
              </Link>
              {roleId == 1 ?
                <li className="nav-item" role="presentation">
                  <Link to="/dashboard/addproperty" className="nav-link">Add Property</Link>
                </li> : ""}
            </ul>
          </div> : <div></div>} */}

        {/* {roleId == 2 ? (
          <div className="col-lg-2">
            <h5>Welcome to {allData.name} </h5>
            <SidePanel />
            <ul className="nav nav-pills" id="pills-tab" role="tablist">
              <Link to="/dashboard">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link "
                    id="pills-dashboard-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-dashboard"
                    type="button"
                    role="tab"
                    aria-controls="pills-dashboard"
                    aria-selected="true"
                  >
                    Dashboard
                  </button>
                </li>
              </Link>
              <Link to="/dashboard/myproperties">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-properties-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-properties"
                    type="button"
                    role="tab"
                    aria-controls="pills-properties"
                    aria-selected="false"
                  >
                    My Properties
                  </button>
                </li>
              </Link>
              <Link to="/dashboard/myrequirement">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-requirements-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-requirements"
                    type="button"
                    role="tab"
                    aria-controls="pills-requirements"
                    aria-selected="false"
                  >
                    My Requirements
                  </button>
                </li>
              </Link>
              <Link to="/dashboard/search">
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-searches-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-searches" type="button" role="tab" aria-controls="pills-searches"
                    aria-selected="false">My Searches</button>
                </li>
              </Link>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-searches-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-searches"
                  type="button"
                  role="tab"
                  aria-controls="pills-searches"
                  aria-selected="false"
                >
                  My Subscription
                </button>
              </li>
              <Link to="/dashboard/account">
                <li className="nav-item" role="presentation">
                  <button className="nav-link " id="pills-profile-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-profile-search" type="button" role="tab"
                    aria-controls="pills-profile-search" aria-selected="false">Profile</button>
                </li>
              </Link>
              <li className="nav-item" role="presentation">
                <Link to="/dashboard/addproperty" className="nav-link">
                  Add Property
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div></div>
        )} */}

        {/* {roleId == 3 ? (
          <div className="myAccountTabBar">
            <h5>Welcome to {allData.name} </h5>

            <ul className="nav nav-pills" id="pills-tab" role="tablist">
              <Link to="/dashboard">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link "
                    id="pills-dashboard-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-dashboard"
                    type="button"
                    role="tab"
                    aria-controls="pills-dashboard"
                    aria-selected="true"
                  >
                    Dashboard
                  </button>
                </li>
              </Link>

              <Link to="/dashboard/myproperties">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-properties-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-properties"
                    type="button"
                    role="tab"
                    aria-controls="pills-properties"
                    aria-selected="false"
                  >
                    My Properties
                  </button>
                </li>
              </Link>
              <Link to="/dashboard/myrequirement">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-requirements-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-requirements"
                    type="button"
                    role="tab"
                    aria-controls="pills-requirements"
                    aria-selected="false"
                  >
                    My Requirements
                  </button>
                </li>
              </Link>
              <Link to="/dashboard/search">
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-searches-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-searches" type="button" role="tab" aria-controls="pills-searches"
                    aria-selected="false">My Searches</button>
                </li>
              </Link>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-searches-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-searches"
                  type="button"
                  role="tab"
                  aria-controls="pills-searches"
                  aria-selected="false"
                >
                  My Subscription
                </button>
              </li>
              <Link to="/dashboard/account">
                <li className="nav-item" role="presentation">
                  <button className="nav-link " id="pills-profile-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-profile-search" type="button" role="tab"
                    aria-controls="pills-profile-search" aria-selected="false">Profile</button>
                </li>
              </Link>
              {roleId == 3 ? (
                <li className="nav-item" role="presentation">
                  <Link to="/dashboard/addproperty" className="nav-link">
                    Add Property
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        ) : (
          <div></div>
        )} */}

        {/* {roleId == 4 ? (
          <div className="myAccountTabBar">
            <h5>Welcome to {allData.name}</h5>

            <ul className="nav nav-pills" id="pills-tab" role="tablist">
              <Link to="/dashboard">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link "
                    id="pills-dashboard-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-dashboard"
                    type="button"
                    role="tab"
                    aria-controls="pills-dashboard"
                    aria-selected="true"
                  >
                    Dashboard
                  </button>
                </li>
              </Link>
              <Link to="/dashboard/myproperties">
                {" "}
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-properties-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-properties"
                    type="button"
                    role="tab"
                    aria-controls="pills-properties"
                    aria-selected="false"
                  >
                    My Projects
                  </button>
                </li>
              </Link>
              <Link to="/dashboard/search">
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-searches-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-searches" type="button" role="tab" aria-controls="pills-searches"
                    aria-selected="false">My Searches</button>
                </li>
              </Link>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-searches-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-searches"
                  type="button"
                  role="tab"
                  aria-controls="pills-searches"
                  aria-selected="false"
                >
                  My Subscription
                </button>
              </li>
              <Link to="/dashboard/account">
                <li className="nav-item" role="presentation">
                  <button className="nav-link " id="pills-profile-tab" data-bs-toggle="pill"
                    data-bs-target="#pills-profile-search" type="button" role="tab"
                    aria-controls="pills-profile-search" aria-selected="false">Profile</button>
                </li>
              </Link>
            </ul>
          </div>
        ) : (
          <div></div>
        )} */}


        <div className="row">
          <div className="col-lg-2">
            <SidePanel />
          </div>
          <div className="col-lg-10">
          <div className="side_right">
            {isLoading ? (

              <div className="loader inner-loader" colSpan={9}>
                <ClipLoader
                  loading={isLoading}
                  size={100}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>


            ) : (
              <div className="tab-content dashboardTab" id="pills-tabContent">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab">
                    <div className="row">
                      <div className="col-lg-3">
                        {
                          mypackagelist.map((e, index) => {
                            let packaesName;
                            if (e.Subscription != null) {
                              packaesName = e.Subscription.package_name;
                            } else {
                              packaesName = '-'
                            }
                            let edatil;
                            if (e.Projects != null) {
                              edatil = e.Projects.filter(project => project.featured_post === "Y").length;
                            }
                            let propertyfeature = e.f2 - edatil
                            let total = e.f1 - e.Projects.length

                            if (index == 0) {
                              return (
                                <div className="mysubsrictions-box">
                                  <div className="r-box">
                                    <p>
                                      <span className="package">Package</span>( {packaesName})
                                    </p>
                                    <div className="expire">
                                      <p>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="12"
                                          height="14"
                                          fill="white"
                                          class="bi bi-calendar-check"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                        </svg>
                                        <span>{e.validity} day</span>
                                      </p>
                                      <p>
                                        <i class="fa-regular fa-calendar-days"></i> Start Date {""}
                                        <Moment format="DD-MM-YYYY">
                                          {e.createdAt}
                                        </Moment>                          </p>
                                      <p>
                                        <i class="fa-regular fa-calendar-days"></i> Expire
                                        Date {""} <Moment format="DD-MM-YYYY">
                                          {e.pkg_expiredate}
                                        </Moment>
                                      </p>
                                      <p>
                                        <i class="fa-solid fa-wallet"></i> ₹{e.amount}
                                      </p>
                                    </div>
                                  </div>
                                  {currentDate.toISOString().split('T')[0] <= e.pkg_expiredate.split('T')[0] ?
                                    <div className="d-box">
                                      <div>
                                        <p className="job">No of property post</p>
                                        <p className="out out-1">{e.Projects.length} property post left out of {total}</p>
                                      </div>

                                      <div className="bordeer">
                                        <p className="profile">No of propety featured</p>
                                        <p className="out">
                                          {edatil} propety featured seen left out of {propertyfeature}
                                        </p>
                                      </div>

                                      <div className="l-list bordeer">
                                        <p className="shortlist">No of contact enquiry</p>
                                        <p className="out">
                                          {e.f3} contact enquiry shortlist left out of 25
                                        </p>
                                      </div>
                                    </div> :
                                    <div className="d-box">
                                      <div className="l-list bordeer">
                                        <p className="shortlist" style={{ color: "red" }}>Your Subscription Package Expiryed</p>
                                        <p className="out" style={{ textAlign: "end", marginRight: "15px", marginTop: "19px" }}>
                                          <Link to="/subscription" className="btn" style={{
                                            background: "red", color: "white", textAlign: "center", padding: "0px 0px",
                                            width: "76px", margin: "auto"
                                          }}> Update</Link>                          </p>
                                      </div>
                                    </div>

                                  }
                                  <br />

                                </div>

                              )
                            }


                          })}
                      </div>



                      <div className="col-lg-9">
                        <div className="gama">

                          <table className="table rounded-2 table-bordered ">
                            <tbody className="thead-default ">
                              <tr className="alpa pt-2">
                                <th>S.No.</th>
                                <th>Package Name</th>
                                <th>Amount</th>
                                <th>Subscription Date</th>
                                <th>Expiry Date</th>
                                <th style={{ textAlign: "center" }}>Status</th>
                                <th style={{ textAlign: "center" }}>Action</th>
                              </tr>
                            </tbody>


                            <tbody className="thead-default ">

                              {
                                mypackagelist.map((e, index) => {
                                  let packagenames;
                                  if (e.Subscription != null) {
                                    packagenames = e.Subscription.package_name
                                  } else {
                                    packagenames = '-'
                                  }
                                  return (
                                    <tr className="beta mt-3">
                                      <th>{index + 1}</th>
                                      <td>
                                        {packagenames}
                                      </td>
                                      <td>&#8377;{e.amount}</td>
                                      <td> <Moment format="DD-MM-YYYY">
                                        {e.createdAt}
                                      </Moment></td>
                                      <td> <Moment format="DD-MM-YYYY">
                                        {e.pkg_expiredate}
                                      </Moment>

                                      </td>
                                      <td style={{ textAlign: "center" }}>
                                        {currentDate.toISOString().split('T')[0] >= e.pkg_expiredate.split('T')[0] ?
                                          (
                                            <Link to="/subscription" className="btn" style={{
                                              background: "red", color: "white", textAlign: "center", padding: "0px 0px",
                                              width: "76px", margin: "auto"
                                            }}> Renew</Link>

                                          ) : (<button className="btn" style={{
                                            background: "#88ac2e", color: "white", padding: "0px 0px",
                                            width: "76px", margin: "auto"
                                          }}> Active</button>)}
                                      </td>
                                      <td>
                                        <Tooltip title="Invoice " onClick={(ee) => {
                                          handleExportPDF(e)
                                        }}>
                                          <IconButton className="btn pdfButton">
                                            <i className="fas fa-file-invoice "></i>

                                          </IconButton>
                                        </Tooltip>
                                      </td>
                                    </tr>

                                  )
                                })

                              }

                            </tbody>
                          </table>

                        </div>
                      </div>
                    </div>



                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
        </div></div>

      <Footer />
    </div>
  );
}