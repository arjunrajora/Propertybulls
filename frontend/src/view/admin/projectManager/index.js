import React, { useState, useEffect } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { Link } from "react-router-dom";
import config from "../../../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast, Zoom } from 'react-toastify';

import "react-confirm-alert/src/react-confirm-alert.css";
import { CSVLink } from "react-csv";
import {
  Collapse,
  Alert,
  Switch,
  TablePagination,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import { Bathroom } from "@mui/icons-material";

export default function Project() {
  const builderUrl = config.API_URL + "builder/viewAll"
  const viewProject = config.API_URL + "project/viewAll";
  const deleteProject = config.API_URL + "project/";
  const apiStatus = config.API_URL + "project/status/";
  const apiFeature = config.API_URL + "project/featured/";
  const featured_galleryapi = config.API_URL + "project/featured_gallery/";
  const stateUrl = config.API_URL + "state/viewAll";
  const locationUrl = config.API_URL + "location/viewAll";
  const cityurl = config.API_URL + "city/viewAll";
  const viewpropertytype = config.API_URL + "propertyTypes/viewAll";
  const [p_typeid, setP_typeid] = useState("");
  const [featured, setFeatured] = useState("");
  const [project, setProject] = useState([])
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [builder, setBuilder] = useState([]);

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  const StaticMessage = localStorage.getItem("staticAdded");
  const [staticAdded, setStaticAdded] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [option, setOption] = useState("");

  const [state, setState] = useState([]);
  const [state_id, setState_id] = useState("");
  const [location, setLocation] = useState([]);
  const [location_id, setLocation_id] = useState("");
  const [city, setCity] = useState([]);
  const [city_id, setcity_id] = useState("");
  const [builder_id, setbuilder_id] = useState("");

  const [project_id, setProject_id] = useState("");
  const [PropertyType, setPropertyType] = useState([]);
  const [status, setStatus] = useState("");
  const [Max_price, setMax_Price] = useState("");
  const [Min_price, setMin_Price] = useState("");

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
    fetch(viewProject, options)
      .then((response) => response.json())
      .then((value) => {
        setProject(value.data);
        console.log(value.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
    fetch(stateUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setState(value.data);
      });
    fetch(locationUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);
      });

    fetch(builderUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setBuilder(value.data);
      });
    fetch(cityurl, options)
      .then((response) => response.json())
      .then((value) => {
        setCity(value.data);
      });
    fetch(viewpropertytype, options)
      .then((response) => response.json())
      .then((value) => {
        setPropertyType(value.data);
      });
  }, [])




  function numDifferentiation(val) {
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2) + ' Crore';
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(1) + ' Lacs';
    }
    else if (val >= 1000) val = (val).toFixed() + ' Thousand';
    return val;
  }

  const headers = [
    { label: "Name", key: "name" },
    { label: "cus_id", key: "cus_id" },
    { label: "rera_registration", key: "rera_registration" },
    { label: "build_id", key: "build_id" },
    { label: "location_id", key: "location" },
    { label: "pincode", key: "pincode" },
    { label: "p_unit", key: "p_unit" },
    { label: "Created", key: "createdAt" },
  ];

  var projectpropertydetails;

  const handleExportPDF = async () => {
    try {
      const pdf = new jsPDF("p", "pt", "a4");
      const columns = ["Id", "Name", "cus_id", "rera_registration", "build_id", "location", "pincode", "p_unit", "Created"];
      var rows = [];
      for (let i = 0; i < project.length; i++) {
        var temp = [
          project[i].id + 1,
          project[i].name,
          project[i].cus_id,
          project[i].rera_registration,
          project[i].build_id,
          project[i].Location ? project[i].Location.name : "---",
          project[i].pincode,
          project[i].p_unit,
          project[i].createdAt,
        ];
        rows.push(temp);

      }

      pdf.text(235, 40, "project List");
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
  var statess;
  // Excel Download
  const onExportLinkPress = async () => {
    var rows = [];
    for (let i = 0; i < project.length; i++) {
      var temp = [
        project[i].id + 1,
        project[i].name,
        project[i].cus_id,
        project[i].rera_registration,
        project[i].build_id,
        project[i].location_id,
        project[i].pincode,
        project[i].p_unit,
        project[i].createdAt,
      ];
      rows.push(temp);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let type;
  let projectname;
  let projectLocation;


  // const Delete = async (id) => {
  //   const res = await axios.delete(deleteProject + id, options);
  //   const msg = res.data.message;
  //   localStorage.setItem("staticAdded", msg);
  //   fetch(viewProject, options)
  //     .then((response) => response.json())
  //     .then((value) => {
  //       setProject(value.data);
  //     })
  // };
  const Delete = async (id) => {
    try {
      const res = await axios.delete(deleteProject + id, options);
      const msg = res.data.message;
      localStorage.setItem("staticAdded", msg);
      fetch(viewProject, options)
        .then((response) => response.json())
        .then((value) => {
          setProject(value.data);
        })
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
      title: "Confirm to submit",
      message: message,
      buttons: [
        {
          label: "Yes",
          onClick: () => Delete(id),
        },
        {
          label: "No",

        },
      ],
    });

  }

  const SearchUrl = config.API_URL + "project/search";
  const HandleSearch = async (event) => {
    event.preventDefault();
    if (!status && !name && !featured && !location_id && !option && !project_id && !state_id && !city_id && !featured && !p_typeid && !builder_id && !Min_price && !Max_price) {
      return;
    }
    const body = {
      name: name,
      option: option,
      id: project_id,
      city_id: city_id,
      state_id: state_id,
      location_id: location_id,
      status: status,
      featured: featured,
      p_typeid: p_typeid,
      build_id: builder_id,
      Max_price: Max_price,
      Min_price: Min_price,
    };
    await axios
      .post(SearchUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        const { data } = res.data;
        setProject(data);

      })
      .catch((err) => console.log(err));
  };
  var cityss, ContactInquiryCount;
  var Bathrooms;


  //  Reset all fild
  const handleReset = () => {
    setState_id('');
    setcity_id('');
    setLocation_id('');
    setStatus('');
    setbuilder_id('');
    setP_typeid('');
    setProject_id('');
    setOption('');
    setFeatured('');
    setMax_Price('');
    setMin_Price('');
    // setTot_price('');

    // setPkg_expiredate(null);


    // Fetch data from the API when Reset button is clicked
    fetch(viewProject, options)
      .then((response) => response.json())
      .then((value) => {
        setProject(value.data);
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
                {staticAdded != null && openAlert === true && (
                  <Collapse in={openAlert}>
                    <Alert aria-hidden={true} severity="success">
                      {staticAdded}
                    </Alert>
                  </Collapse>
                )}
                <ToastContainer />

                <div className="card">
                  <div className="card-header p-0">
                    <h4 className="card-title">PROJECT LIST</h4>
                    <br />

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
                          <Tooltip
                            title="Excel List"
                            onClick={onExportLinkPress}
                          >
                            <IconButton>
                              <CSVLink
                                headers={headers}
                                data={project}
                                filename={"my-file.csv"}
                                className="btn excelButton"
                                target="_blank"
                              >
                                <i className="fas fa-file-excel"></i>

                              </CSVLink>
                            </IconButton>
                          </Tooltip>
                        </li>
                        <li>
                          <Link to="/admin/project/add"
                            type="button"
                            className="btn btn-outline-primary btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >

                            <i className="fas fa-plus" title="Add"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <form
                    className="form-horizontal form-M"
                  >
                    <div className="row">

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select
                            name="role_id"
                            className="form-control"
                            value={state_id}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setState_id(e.target.value);
                            }}

                          >
                            {state.map((value) => {
                              if (value.id == 99 && value.status == "Y") {
                                statess = value.name
                              } else {
                                return null
                              }
                              return (
                                <option key={value.id} value={value.id}>{statess}</option>
                              )
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
                          <select
                            name="role_id"
                            className="form-control"
                            value={location_id}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setLocation_id(e.target.value);
                            }}
                          >
                            <option value="">--Select Locality--</option>
                            {location.map((value) => {
                              return (
                                <option key={value.id} value={value.id}>
                                  {value.name}
                                </option>
                              );
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
                            <option value="">Select Status</option>
                            <option value="Y">Active</option>
                            <option value="N">Inactive</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select
                            value={project_id}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setProject_id(e.target.value);
                            }}
                            name="id" className="form-control">
                            <option value="">Select Id</option>
                            {
                              project && project.map((e) => {
                                return (
                                  <option value={e.id} key={e.id}>{e.id}</option>
                                )
                              })
                            }
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Project Name"
                            value={name}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setName(e.target.value);
                            }}
                          />
                          <button type="submit" >
                          </button>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select name="option"
                            className="form-control"
                            value={option}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setOption(e.target.value);
                            }}>
                            <option value="">Select Category</option>
                            <option value="Sell">Sell</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select
                            // name="fname"
                            className="form-control"
                            value={featured}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setFeatured(e.target.value);
                            }}
                          >
                            <option value="">Select Feature</option>
                            <option value={1}>Feature</option>
                            <option value={0}>UnFeature</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select name="id" className="form-control"
                            value={p_typeid}
                            onChange={(e) => {
                              setP_typeid(e.target.value);
                              console.log(e.target.value);
                            }}>

                            <option value="">
                              Select Property Type</option>
                            {PropertyType.map((value) => {

                              return <option value={value.id} key={value.id}> {value.name}</option>;
                            })}
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select name="id" className="form-control"
                            value={Min_price}
                            onChange={(e) => {
                              setMin_Price(e.target.value);
                              console.log(e.target.value);
                            }}
                          >
                            <option value="">Select MIN Price</option>
                            <option value="500000">5 Lacs</option>
                            <option value="1000000">10 Lacs</option>
                            <option value="2000000">20 Lacs</option>
                            <option value="3000000">30 Lacs</option>
                            <option value="4000000">40 Lacs</option>
                            <option value="5000000">50 Lacs</option>
                            <option value="6000000">60 Lacs</option>
                            <option value="7000000">80 Lacs</option>
                            <option value="9000000">90 Lacs</option>
                            <option value="10000000">1Crore</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select name="id" className="form-control"

                            value={Max_price}
                            onChange={(e) => {
                              setMax_Price(e.target.value);
                              console.log(e.target.value);
                            }}
                          >
                            <option value="">Select MAX Price</option>
                            <option value="500000">5 Lacs</option>
                            <option value="1000000">10 Lacs</option>
                            <option value="2000000">20 Lacs</option>
                            <option value="3000000">30 Lacs</option>
                            <option value="4000000">40 Lacs</option>
                            <option value="5000000">50 Lacs</option>
                            <option value="6000000">60 Lacs</option>
                            <option value="7000000">80 Lacs</option>
                            <option value="9000000">90 Lacs</option>
                            <option value="10000000">1Crore</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-2 col-xs-6">
                        <div className="input select">
                          <select name="id" className="form-control"

                            value={builder_id}
                            onChange={(e) => {
                              setbuilder_id(e.target.value);
                              console.log(e.target.value);
                            }}
                          >
                            <option value="">Select Builder</option>
                            {builder.map((e) => {
                              return (
                                <option value={e.id} key={e.id}>{e.name}</option>
                              )
                            })}
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <button
                          type="submit"
                          className="btn btn-primary pull-right"
                          onClick={HandleSearch}

                        >
                          Search
                        </button>
                      </div>
                      <div className="col-sm-2 col-xs-6">

                        <Button
                          className="btn btn-dark"
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
                            <th>
                              S.No
                            </th>
                            <th scope="col">Type</th>
                            <th scope="col">Builder Name</th>
                            <th scope="col">Address</th>
                            <th className="th_width-3">Features</th>
                            <th className="th_width-5">Area</th>
                            <th className="th_width-6">Total Price</th>
                            <th className="th_width-7">Added Date</th>
                            <th scope="col">Descriptive</th>
                            <th >Actions</th>
                          </tr>
                        </thead>
                        {isLoading ? (
                          <tbody>
                            <tr>
                              <td colSpan={9}>
                                <div className="loader inner-loader">
                                  <ClipLoader
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
                            {project.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            ).map((value, index) => {
                              if (value.propertyType != null) {
                                type = value.propertyType.name
                              } else {
                                type = ''
                              }
                              if (value.Builder != null) {
                                projectname = value.Builder.name
                              } else {
                                projectname = ''
                              }
                              if (value.Contactinquiries != null) {
                                ContactInquiryCount = value.Contactinquiries.length
                              }
                              else {
                                ContactInquiryCount = "0"
                              }



                              if (value.Location != null) {
                                projectLocation = value.Location.name
                              } else {
                                projectLocation = ''
                              }
                              let minroom = null;
                              let maxroom = null;
                              let minbath = null;
                              let maxbath = null;
                              let maxcarparking = null;
                              if (value.propertydetails != null) {
                                const Bathrooms = value.propertydetails && value.propertydetails.map(e => e.bathroom).filter(bathroom => bathroom !== null);
                                maxbath = Bathrooms && Bathrooms.length > 0 ? Math.max(...Bathrooms) : null;
                                minbath = Bathrooms && Bathrooms.length > 0 ? Math.min(...Bathrooms) : null;
                                const carparking = value.propertydetails.map(e => e.carparking).filter(carparking => carparking !== null);
                                maxcarparking = carparking.length > 0 ? Math.max(...carparking) : null;
                                const rooms = value.propertydetails.map(e => e.room).filter(room => room !== null);
                                maxroom = rooms.length > 0 ? Math.max(...rooms) : null;
                                minroom = rooms.length > 0 ? Math.min(...rooms) : null;
                              } else {
                                // Code to be executed when value.propertydetails is null
                              }
                              // console.log("project_id", value.project_id)
                              return (

                                <tr key={value.id}>
                                  <td>{index + 1}</td>
                                  <td>ID: {value.id}<br />{value.name}<br />{type}<br /><br />
                                    Contact Inquiry:({ContactInquiryCount})
                                  </td>
                                  <td>{projectname}</td>
                                  <td>{value.address}<br />{value.address2}<br />{projectLocation}<br />jaipur Rajasthan</td>
                                  <td>Option:{value.option}<br />
                                    Room:{maxroom !== null ? maxroom : '0'}<br />
                                    <p>Bathroom:{maxbath !== null ? maxbath : '0'}</p>
                                  </td>
                                  <td>Area:{value.area} {value.ship}<br />
                                    <p>carparking:{maxcarparking !== null ? maxcarparking : '0'}</p>
                                  </td>
                                  <td>{numDifferentiation(value.tot_price)}</td>
                                  <td>
                                    <Moment format="DD-MM-YYYY">
                                      {value.createdAt}
                                    </Moment>
                                  </td>
                                  <td>
                                    <Link to="/admin">Show Map</Link><br />
                                    <Link to={"/admin/project/gallery/" + value.id}>View Gallery</Link><br />
                                    <Link to={"/admin/project/description/" + value.id}>Description</Link><br />
                                    <Link to={"/admin/project/propertyes/" + value.id}>View Propertyes</Link>

                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <Switch title="Status" checked={
                                        value.status === "Y" ? true : false
                                      }
                                        onChange={async (e) => {
                                          const body = { status: value.status };
                                          var res = await axios.put(
                                            apiStatus + value.id,
                                            body, options
                                          );
                                          const msg = res.data.message;
                                          localStorage.setItem(
                                            "staticAdded",
                                            msg
                                          );
                                          fetch(viewProject, options)
                                            .then((response) => response.json())
                                            .then((value) => {
                                              setProject(value.data);
                                            });
                                        }}
                                      />
                                      <Switch title="feature"
                                        checked={value.featured === 1}
                                        onChange={async (e) => {
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
                                          await fetch(viewProject, options)
                                            .then((response) => response.json())
                                            .then((value) => {
                                              setProject(value.data);
                                            });
                                        }}
                                      />
                                      <a className="icEdit" onClick={(e) => {
                                        navigate("/admin/project/edit/" + value.id, {
                                          state: {
                                            lineData: value,
                                            id: value.id,
                                          },
                                        });
                                      }}>
                                        <i
                                          className="fas fa-pen"

                                          title="Edit"
                                        ></i>
                                      </a>

                                      <a className="icDelete" onClick={(e) => {
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
                                        {value.featured_gallery === "0" && (
                                          <Link>
                                            <i className="far fa-star" title="unfeatured gallery" style={{ fontSize: '2em' }}
                                              checked={value.featured_gallery === 0}
                                              onClick={async (e) => {
                                                const body = {
                                                  featured_gallery: 0,
                                                };
                                                console.log("🚀 ~ file: index.js:819 ~ onClick={ ~ body:", body)

                                                var res = await axios.put(
                                                  featured_galleryapi + value.id,
                                                  body, options
                                                );
                                                const msg = res.data.message;
                                                localStorage.setItem(
                                                  "staticAdded",
                                                  msg
                                                );
                                                fetch(viewProject, options)
                                                  .then((response) => response.json())
                                                  .then((value) => {
                                                    setProject(value.data);

                                                  });
                                              }}

                                            ></i>
                                          </Link>
                                        )}


                                        {value.featured_gallery === "1" && (
                                          <Link>
                                            <i className="fa fa-star" title="featured gallery" style={{ fontSize: '2em' }}

                                              checked={value.featured_gallery === 1}
                                              onClick={async (e) => {
                                                const body = {
                                                  featured_gallery: 1,
                                                };
                                                console.log("🚀 ~ file: index.js:sssssssss ~ onClick={ ~ body:", body)

                                                var res = await axios.put(
                                                  featured_galleryapi + value.id,
                                                  body, options
                                                );
                                                const msg = res.data.message;
                                                localStorage.setItem(
                                                  "staticAdded",
                                                  msg
                                                );
                                                fetch(viewProject, options)
                                                  .then((response) => response.json())
                                                  .then((value) => {
                                                    setProject(value.data);
                                                  });
                                              }}







                                            ></i>
                                          </Link>
                                        )}

                                      </div>

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
                        count={project.length}
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
