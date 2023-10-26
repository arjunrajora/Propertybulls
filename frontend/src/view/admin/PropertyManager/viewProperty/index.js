import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../../config/config";
import AdminHeader from "../../../../element/adminFooter";
import AdminFooter from "../../../../element/adminHeader";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ClipLoader from "react-spinners/ClipLoader";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";
import { ToastContainer, toast, Zoom } from 'react-toastify';

import Moment from 'react-moment';
import {
  Collapse, Alert, Switch, TablePagination, Button, IconButton,
  Tooltip
} from "@mui/material";

import axios from "axios";
export default function Property() {
  var Locality
  var state
  var FACING
  var ownername, cityname, Rolename;
  var rolename
  const navigate = useNavigate()
  // const apiUrl = config.API_URL + "Features/viewAll";
  const facingurl = config.API_URL + "Facing/viewAll";
  const api = config.API_URL + "property/viewAll"
  const deleteurl = config.API_URL + "property/"
  const apiFeature = config.API_URL + 'property/featured/';
  const apiStatus = config.API_URL + "property/status/"
  const apI = config.API_URL + "state/viewAll"
  const url = config.API_URL + "city/viewAll"
  const Location = config.API_URL + "location/viewAll"
  const Agent = config.API_URL + "agent/viewAll"
  const propertyTypes = config.API_URL + "propertyTypes/viewAll";
  const Feature = config.API_URL + "Features/viewAll";
  const [facing, setFacing] = useState([]);
  const [PropertyType, setPropertyType] = useState([]);
  const [Features, setFeatures] = useState([]);
  const [staticAdded, setStaticAdded] = useState('');
  const StaticMessage = localStorage.getItem('staticAdded');
  const [openAlert, setOpenAlert] = useState(false);
  const [city, setCity] = useState([])
  const [locat, setLocation] = useState([])
  const [State, setstate] = useState([])
  const [property, setProperty] = useState([])
  const [agent, setAgent] = useState([])
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [state_id, setstate_id] = useState("");
  const [cus_id, setcus_id] = useState("");
  const [featured, setfeatured] = useState("");
  const [city_id, setcity_id] = useState("");
  const [location_id, setlocation_id] = useState("");
  const [option, setoption] = useState("");
  const [p_typeid, setp_typeid] = useState("");
  const [Max_price, setMax_price] = useState("")
  const [Min_price, setMin_price] = useState("")

  const [id, setId] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(50);
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((value) => {
        // console.log(value.data);
        setProperty(value.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
    fetch(apI, options)
      .then((response) => response.json())
      .then((value) => {
        setstate(value.data);
      });
    fetch(url, options)
      .then((response) => response.json())
      .then((value) => {
        setCity(value.data);

      });
    fetch(Location, options)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);

      });
    fetch(Agent, options)
      .then((response) => response.json())
      .then((value) => {
        setAgent(value.data);
      });
    fetch(propertyTypes, options)
      .then((response) => response.json())
      .then((value) => {
        setPropertyType(value.data);
      });
    fetch(Feature, options)
      .then((response) => response.json())
      .then((value) => {
        setFeatures(value.data);
      });
    fetch(facingurl, options)
      .then((response) => response.json())
      .then((value) => {
        setFacing(value.data);
      });

  }, [fetch]);

  // console.log("Property", property)



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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  // const Delete = async (id) => {
  //   const res = await axios.delete(
  //     deleteurl + id
  //   );
  //   const msg = res.data.message;
  //   localStorage.setItem(
  //     "staticAdded",
  //     msg
  //   );
  //   fetch(Agent, options)
  //     .then((response) => response.json())
  //     .then((value) => {
  //       setAgent(value.data);
  //     });
  // }

  const Delete = async (id) => {
    try {
      const res = await axios.delete(deleteurl + id, options);
      const msg = res.data.message;
      localStorage.setItem("staticAdded", msg);
      fetch(Agent, options)
        .then((response) => response.json())
        .then((value) => {
          setAgent(value.data);
        });
    } catch (err) {
      let message = err.response.data.message
      toast.error(message, {
        position: "top-right",
        autoClose: 1000,
        type: "error",
        transition: Zoom,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  };

  const deleteconfirmation = (id, message) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: message,
      buttons: [
        {
          label: 'Yes',
          onClick: () => Delete(id)
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        }
      ]
    });
  }
  const Searchproperty = config.API_URL + "property/searchAll"
  const HandleSearch = async (event) => {
    event.preventDefault();
    // Check if any of the parameters is provided, if not, keep the previous 'data' value (empty array).
    if (!status && !option && !featured && !p_typeid && !location_id && !city_id && !state_id && !cus_id && !id && !Min_price && !Max_price) {
      return;
    }
    const body = {
      status: status,
      option: option,
      featured: featured,
      p_typeid: p_typeid,
      location_id: location_id,
      city_id: city_id,
      state_id: state_id,
      cus_id: cus_id,
      id: id,
      Min_price: Min_price,
      Max_price: Max_price
    };
    console.log("search", body);
    await axios
      .post(Searchproperty, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );
        const { data } = res.data;
        console.log("=>>>", res.data);
        setProperty(data);
      })
      .catch((err) => console.log(err));
  };

  // Export to excel
  const headers = [
    { label: "Id", key: "id" },
    { label: "url", key: "url" },
    { label: "Property Name", key: "name" },
    { label: "PropertyType", key: "propertyType" },
    { label: "Property Owner Name", key: "User" },
    { label: "Address", key: "address" },
    { label: "state_id", key: "state_id" },
    { label: "option", key: "option" },


  ];
  const onExportLinkPress = async () => {
    var rows = [];

    for (let i = 0; i < property.length; i++) {
      var temp = [
        property[i].id + 1,
        property[i].url,
        property[i].name,
        property[i].propertyType ? property[i].propertyType.name : "---",
        property[i].User ? property[i].User.name : "---",
        property[i].address,
        property[i].option,
        property[i].state_id,
      ];
      rows.push(temp);
    }
  };



  const handleExportPDF = async () => {
    try {
      const pdf = new jsPDF("p", "pt", "a4");
      const columns = ["Id", "Property Name", "PropretyType", "Property Owner Name", "Address", "Option", "Pincode"];
      var rows = [];

      for (let i = 0; i < property.length; i++) {
        var temp = [
          property[i].id + 1,
          property[i].name,
          property[i].propertyType ? property[i].propertyType.name : "---",
          property[i].User ? property[i].User.name : "---",
          property[i].address,
          property[i].option,
          property[i].pincode,


        ];
        rows.push(temp);
      }
      pdf.text(235, 40, "PropertyList");
      pdf.autoTable(columns, rows, {
        startY: 65,
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
      pdf.save("pdf");
    } catch (error) {
      console.log("error from data", error);
    }
  };



  var states
  var propertytypes
  var cityss, projectname, ContactInquiryCount
  // console.log("Property", property)
  //  Reset all fild
  const handleReset = () => {
    setstate_id('');
    setcity_id('');
    setlocation_id('');
    setStatus('');
    setcus_id('');
    setp_typeid('');
    setId('');
    setoption('');
    setfeatured('');
    setMax_price('');
    setMin_price('');

    // setPkg_expiredate(null);


    // Fetch data from the API when Reset button is clicked
    fetch(api, options)
      .then((response) => response.json())
      .then((value) => {
        setProperty(value.data);
      });
  };




  return (
    <div>
      <AdminHeader />

      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body card p-2">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  {staticAdded != null && openAlert === true && (
                    <Collapse in={openAlert}>
                      <Alert aria-hidden={true} severity="success">
                        {staticAdded}
                      </Alert>
                    </Collapse>
                  )}

                  <ToastContainer />

                  <div className="card-header p-0">
                    <h4 className="card-title">PROPERTY LIST </h4>
                    <br />

                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                    <div className="heading-elements">
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li>
                          <Tooltip title="PDF List" onClick={handleExportPDF}>
                            <IconButton className="btn pdfButton">
                              <i className="fas fa-file-pdf"></i>
                            </IconButton>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip title="Excel List" onClick={onExportLinkPress}>
                            <IconButton>
                              <CSVLink
                                headers={headers}
                                data={property}
                                filename={"my-file.csv"}
                                className="btn excelButton"
                                target="_blank"
                              >
                                <i className="fas fa-file-excel"></i>
                                {/* <Iconify icon="vscode-icons:file-type-excel" /> */}
                              </CSVLink>
                            </IconButton>
                          </Tooltip>
                        </li>
                        <li>
                          <Link
                            to="/admin/property/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="la la-plus"></i> ADD PROPERTY
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/property/csv"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            ADD PROPERTY FROM CSV
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <form>
                    <div className="row">
                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select
                            name="role_id"
                            className="form-control"
                            value={state_id}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setstate_id(e.target.value);
                            }}
                          >
                            <option>Select State</option>
                            {State.map((value) => {
                              if (value.id == 99 && value.status == 'Y') {
                                states = value.name
                              }
                              else {
                                return null
                              }
                              return <option key={value.id} value={value.id}>{states}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select
                            name="role_id"
                            className="form-control"
                            value={city_id}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setcity_id(e.target.value);
                            }}
                          >
                            <option>Select City</option>
                            {city.map((value) => {
                              if (value.id == 27 && value.status == 'Y') {
                                cityss = value.name
                              }
                              else {
                                return null
                              }
                              return <option key={value.id} value={value.id}>{cityss}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select name="role_id" className="form-control"

                            value={location_id}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setlocation_id(e.target.value);
                            }}
                          >
                            <option value="">--Select Locality--</option>
                            {locat.map((value) => {
                              return <option key={value.id} value={value.id}> {value.name}</option>;

                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select
                            // name="fname"
                            className="form-control"
                            value={status}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setStatus(e.target.value);
                            }}
                          >
                            <option value="">--Select Status--</option>
                            <option value="Y">Active</option>
                            <option value="N">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select name="role_id" className="form-control"
                            value={cus_id}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setcus_id(e.target.value);
                            }}
                          >
                            <option value="">--Select Agent--</option>
                            {agent.map((value) => {
                              return <option key={value.id} value={value.id}> {value.name}</option>;

                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter PropertyId"
                            name="PropertyId" value={id}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setId(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select name="role_id" className="form-control"
                            value={p_typeid}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setp_typeid(e.target.value);
                            }}
                          >
                            <option value="">--select Type--</option>
                            {PropertyType.map((value) => {
                              return <option key={value.id} value={value.id}> {value.name}</option>;

                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select name="role_id" className="form-control"
                            value={option}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setoption(e.target.value);
                            }}

                          >
                            <option value="">--select option--</option>
                            <option value="sell">Sell</option>
                            <option value="Rent">Rent</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select name="role_id" className="form-control"
                            value={featured}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setfeatured(e.target.value);
                            }}>
                            <option value="">--select Feature--</option>
                            <option value="1">Featured</option>
                            <option value="0">UnFeatured</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select className="form-control"
                            value={Min_price}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setMin_price(e.target.value);

                            }}


                          >
                            <option value="">Select MIN Price</option>
                            <option value="1000000">10 Lacs</option>
                            <option value="2000000">20 Lacs</option>
                            <option value="3000000">30 Lacs</option>
                            <option value="4000000">40 Lacs</option>
                            <option value="5000000">50 Lacs</option>
                            <option value="6000000">60 Lacs</option>
                            <option value="7000000">70 Lacs</option>
                            <option value="8000000">80 Lacs</option>
                            <option value="9000000">90 Lacs</option>
                            <option value="10000000">1 Crore</option>
                            <option value="50000000">5 Crore</option>
                            <option value="100000000">10 Crore</option>
                            <option value="2000">2,000</option>
                            <option value="5000">5,000</option>
                            <option value="10000">10,000</option>
                            <option value="20000">20,000</option>
                            <option value="500000">5 Lacs</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select className="form-control"
                            value={Max_price}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setMax_price(e.target.value);

                            }}

                          >
                            <option value="">Select MAX Price</option>
                            <option value="1000000">10 Lacs</option>
                            <option value="2000000">20 Lacs</option>
                            <option value="3000000">30 Lacs</option>
                            <option value="4000000">40 Lacs</option>
                            <option value="5000000">50 Lacs</option>
                            <option value="6000000">60 Lacs</option>
                            <option value="7000000">70 Lacs</option>
                            <option value="8000000">80 Lacs</option>
                            <option value="9000000">90 Lacs</option>
                            <option value="10000000">1 Crore</option>
                            <option value="50000000">5 Crore</option>
                            <option value="100000000">10 Crore</option>
                            <option value="2000">2,000</option>
                            <option value="5000">5,000</option>
                            <option value="10000">10,000</option>
                            <option value="20000">20,000</option>
                            <option value="500000">5 Lacs</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-1 col-xs-6">
                        <button
                          type="submit"
                          className="btn btn-primary pull-right"
                          onClick={HandleSearch}

                        >
                          Search
                        </button>
                      </div>
                      <div className="col-sm-1 col-xs-6">
                        <Button
                          className="btn btn-primary pull-right"
                          onClick={handleReset} >
                          Reset
                        </Button>
                      </div>


                    </div>
                  </form>

                  <hr />


                  <div className="card-content collapse show">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="thead-default table-dark">
                          <tr>
                            <th scope="col">S.No</th>
                            <th className="th_width-2">Owner</th>
                            <th className="th_width-2">Type</th>
                            <th >Address</th>
                            <th className="th_width-2">Features</th>
                            <th className="th_width-2">Area</th>
                            <th >Total Price</th>
                            <th className="th_width-2">Added Date</th>
                            <th >Descriptive</th>
                            <th >Active</th>
                          </tr>
                        </thead>
                        {isLoading ? (
                          <tbody>
                            <tr>
                              <td colSpan={9}>
                                <div className="loader inner-loader">
                                  <ClipLoader
                                    // color={color}
                                    loading={isLoading}
                                    size={100}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        ) : (
                          <tbody>
                            {property.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, index) => {
                              if (value.Location != null) {
                                Locality = value.Location.name
                              }
                              else {
                                Locality = "---"
                              }
                              if (value.State != null) {
                                state = value.State.name
                              }
                              else {
                                state = "---"
                              }
                              if (value.City != null) {
                                cityname = value.City.name
                              }
                              else {
                                ownername = "---"
                              }
                              if (value.Facing != null) {
                                FACING = value.Facing.name
                              }
                              else {
                                FACING = "---"
                              }
                              if (value.propertyType != null) {
                                propertytypes = value.propertyType.name
                              }
                              else {
                                propertytypes = "---"
                              }

                              if (value.User != null) {
                                ownername = value.User.name
                              }
                              else {
                                ownername = "---"
                              }
                              // if (value.User != null) {
                              //   Rolename = value.User.Role.title
                              // }
                              // else {
                              //   Rolename = "---"
                              // }


                              if (value.User != null) {
                                if (value.User.Role != null) {
                                  Rolename = value.User.Role.title;
                                } else {
                                  Rolename = "---";
                                }
                              } else {
                                Rolename = "---";
                              }

                              if (value.pro_name) {
                                projectname = value.pro_name
                              } else if (value.other) {
                                projectname = value.other
                              } else {
                                projectname = "---"
                              }

                              if (value.Contactinquiries != null) {
                                ContactInquiryCount = value.Contactinquiries.length
                              }
                              else {
                                ContactInquiryCount = "0"
                              }

                              // console.log("ContactInquiryCount", ContactInquiryCount)





                              //     if value.pro_name:
                              //     print(value.pro_name)
                              // elif value.other:
                              //     print(value.other)
                              // else:
                              //     print("Koi data nahi hai.")
                              return (

                                <tr key={value.id}>
                                  <td>{index + 1}</td>
                                  <td>
                                    {ownername}<br />
                                    Posted By:{Rolename}  <br />
                                    Remark:<div dangerouslySetInnerHTML={{ __html: value.remark ? value.remark.replace(/<p>/g, '').replace(/<\/p>/g, '') : '' }}></div>

                                    {/* Remark:{value.remark} */}

                                  </td>
                                  <td> ID:{value.id}<br /><br />

                                    Contact Inquiry:({ContactInquiryCount})


                                    <br /><br /><Link to={`/propertyshow/${value.url}`} target="_blank">
                                      {value.name}
                                    </Link><br />
                                    Project Name:{projectname}

                                    {/* Project Name:{projectname} */}



                                    <br />{propertytypes}</td>
                                  <td>{Locality}<br />
                                    {cityname}<br />
                                    {state}</td>
                                  <td>Face:{FACING}<br />option:{value.option}<br />Room:{value.room}<br />Bath:{value.bath}<br />Floor:{value.floor}</td>

                                  <td>Area:{value.area}  <br /> {value.a_unit}</td>

                                  <td>
                                    {value.tot_price
                                      ? value.tot_price >= 10000000
                                        ? (value.tot_price / 10000000).toFixed(1) + ' crore'
                                        : value.tot_price >= 100000
                                          ? (value.tot_price / 100000).toFixed(1) + ' lac'
                                          : value.tot_price.toLocaleString()
                                      : 'Price Not Disclosed'}
                                  </td>
                                  <td>
                                    {/* <Moment format="DD-MMM-YYYY">
                                      {new Date(value.createdAt)}
                                    </Moment> */}
                                    <Moment format="DD-MM-YYYY">
                                      {value.createdAt}
                                    </Moment>
                                  </td>
                                  <td>
                                    <Link to="#">Show Map</Link><br />

                                    <Link to={"/admin/property/gallery/" + value.id} target="_blank"   >View Gallery</Link>
                                    {/* <Link to={"/admin/property/gallery/"+value.id}>View Gallery</Link> */}

                                    <br />

                                    <Link to={"/admin/property/description/" + value.id
                                    }
                                      target="_blank">
                                      Description
                                    </Link><br />
                                    <Link to="/admin/property/upload_video">Upload Video</Link><br /><br />

                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <Link to={"/admin/property/edit/" + value.id} className="icEdit" >
                                        <i
                                          className="fas fa-pen"

                                          title="Edit"
                                        ></i>
                                      </Link>

                                      {/* <a className="icEdit"
                                          onClick={(e) => {
                                            navigate("/admin/customer/edit", {
                                              state: {
                                                lineData: value,
                                                id: value.id,
                                              },
                                            });
                                          }}
                                        >
                                          <i
                                            className="fas fa-pen"
                                            title="Edit"
                                          ></i>
                                        </a> */}


                                      <a href="#" className="icDelete" onClick={(e) => {
                                        deleteconfirmation(
                                          value.id,
                                          "Are you sure you want to Delete ?"
                                        );
                                      }}>
                                        <i
                                          className="fas fa-trash-alt"
                                          title="delete"

                                        ></i>
                                      </a>

                                      <div>
                                        {value.featured === 0 && (
                                          <Link>
                                            <i className="far fa-star" title="unfeatured" style={{ fontSize: '2em' }}
                                              checked={value.featured === 1}
                                              onClick={async (e) => {
                                                const body = {
                                                  featured: value.featured,
                                                };
                                                var res = await axios.put(
                                                  apiFeature + value.id,
                                                  body, options
                                                );
                                                const msg = res.data.message;
                                                localStorage.setItem(
                                                  "staticAdded",
                                                  msg
                                                );
                                                await fetch(api, options)
                                                  .then((response) => response.json())
                                                  .then((value) => {
                                                    setProperty(value.data);
                                                  });
                                              }}

                                            ></i>
                                          </Link>
                                        )}


                                        {value.featured === 1 && (
                                          <Link>
                                            <i className="fa fa-star" title="featured" style={{ fontSize: '2em' }}

                                              checked={value.featured === 1}
                                              onClick={async (e) => {
                                                const body = {
                                                  featured: value.featured,
                                                };
                                                var res = await axios.put(
                                                  apiFeature + value.id,
                                                  body, options
                                                );
                                                const msg = res.data.message;
                                                localStorage.setItem(
                                                  "staticAdded",
                                                  msg
                                                );
                                                await fetch(api, options)
                                                  .then((response) => response.json())
                                                  .then((value) => {
                                                    setProperty(value.data);
                                                  });
                                              }}
                                            ></i>
                                          </Link>
                                        )}

                                      </div>




                                      <Switch
                                        checked={(value.status === "Y") ? true : false}
                                        onChange={async (e) => {
                                          const body = { status: value.status }
                                          var res = await axios.put(apiStatus + value.id, body);
                                          const msg = res.data.message;
                                          localStorage.setItem(
                                            "staticAdded",
                                            msg
                                          );
                                          fetch(api, options)
                                            .then((response) => response.json())
                                            .then((value) => {
                                              setProperty(value.data);
                                            })
                                        }}

                                      />




                                    </div>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        )}
                      </table>
                      <TablePagination
                        component="div"
                        count={property.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminFooter />
    </div>
  );
}
