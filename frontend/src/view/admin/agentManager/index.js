import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import config from "../../../config/config";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Moment from "react-moment";
import ClipLoader from "react-spinners/ClipLoader";

import { ToastContainer, toast, Zoom } from 'react-toastify';

import {
  Collapse,
  Alert,
  Switch,
  TablePagination,
  Button,
  Tooltip,
  IconButton
} from "@mui/material";
import { CSVLink } from "react-csv";
function Agent() {
  const navigate = useNavigate();
  const [lineData, setLineData] = useState("");
  const apI = config.API_URL + "state/viewAll";
  const url = config.API_URL + "city/viewAll";
  const Location = config.API_URL + "location/viewAll";
  const Agent = config.API_URL + "agent/viewAll";
  const deleteAgent = config.API_URL + "agent/";
  const apiStatus = config.API_URL + "agent/status/";
  const [agent, setAgent] = useState([]);
  const [State, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [location, setLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const StaticMessage = localStorage.getItem("staticAdded");
  const [loc_ids, setLoc_ids] = useState("");
  const [state_id, setstate_id] = useState("");
  const [city_id, setcity_id] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [staticAdded, setStaticAdded] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [status, setStatus] = useState("");
  var options = {
    headers: {
      'Authorization': localStorage.getItem('accessToken')
    }
  }


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
    fetch(apI, options)
      .then((response) => response.json())
      .then((value) => {
        setState(value.data);
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
        console.log('Agent >>>>>>>', value.data);
        setAgent(value.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });

  }, [fetch]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var Locality;
  const SearchUrl = config.API_URL + "agent/serchviewAll";
  const HandleSearch = async (event) => {
    event.preventDefault();
    if (!status && !name && !loc_ids && !city_id && !state_id && !mobile) {
      return;
    }
    const body = {
      name: name,
      mobile: mobile,
      state_id: state_id,
      city_id: city_id,
      status: status,
      loc_ids: loc_ids
    };
    console.log("search", body);
    await axios
      .post(SearchUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );
        const { data } = res.data;
        console.log("=>>>", res.data);
        setAgent(data);
      })
      .catch((err) => console.log(err));
  };
  const Delete = async (id) => {
    try {
      const res = await axios.delete(deleteAgent + id, options);
      const msg = res.data.message;
      localStorage.setItem("staticAdded", msg);
      fetch(Agent, options)
        .then((response) => response.json())
        .then((value) => {
          setAgent(value.data);
        });
    } catch (err) {
      console.log("🚀 ~ file: index.js:150 ~ Delete ~ err:", err)
      let message=err.response.data.message
      toast.error(message 
        ,{
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
  }
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
          //onClick: () => alert('Click No')
        },
      ],
    });
  };
  let RequirementsCount;
  const headers = [

    { label: "Name", key: "name" },
    { label: "Lastname", key: "lname" },
    { label: "Email", key: "username" },
    { label: "mobile.No", key: "mobile" },
    { label: 'Date', key: 'createdAt' },
    { label: 'Locality', key: 'Locality' },
    // { label: 'Description', key: 'description' },
  ];
  const handleExportPDF = async () => {
    try {
      const pdf = new jsPDF("p", "pt", "a4");
      const columns = ["Id", "Name", "lname", "Mobile", "username","createdAt"];
      var rows = [];
   
       for (let i = 0; i < agent.length; i++) {
        var temp = [
          agent[i].id + 1,
          agent[i].name,
          agent[i].lname,
          agent[i].mobile,
          agent[i].username,
          agent[i].createdAt,
          agent[i].Location ? agent[i].Location.name : "---",
        ];
        rows.push(temp);
      }
      pdf.text(235, 40, "agent List");
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
  const onExportLinkPress = async () => {
    var rows = [];
  
    for (let i = 0; i < agent.length; i++) {
      var temp = [
        agent[i].id + 1,
        agent[i].name,
        agent[i].lname,
        agent[i].username,
        agent[i].mobile,
        agent[i].createdAt,
      ];
      rows.push(temp);
    }
  }
  var states
  var cityss
  let propertyCount;



  return (
    <div>
      <AdminHeader />

      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body card p-2">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <ToastContainer />

                  {staticAdded != null && openAlert === true && (
                    <Collapse in={openAlert}>
                      <Alert aria-hidden={true} severity="success">
                        {staticAdded}
                      </Alert>
                    </Collapse>
                  )}
                  <div className="card-header p-0">
                    <h4 className="card-title">AGENT LIST </h4>
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
                                data={agent}
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
                          <a
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="fas fa-user-plus"></i> <span>={agent.length}</span>
                          </a>
                        </li>
                        <li>
                          <Link
                            to="/admin/role/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="fas fa-user-plus"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/admin/role/message"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn send-btn sendMessageButton"
                          >
                            <i className="fas fa-envelope"></i> <span></span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <form className="form-horizontal">
                    <div className="row">
                      <div className="col-sm-3 col-xs-6">
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
                            <option value="">Select State</option>
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
                      <div className="col-sm-3 col-xs-6">
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
                            <option value="">Select City</option>
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
                      <div className="col-sm-3 col-xs-6">
                        <div className="input select">
                          <select
                            name="role_id"
                            className="form-control"
                            value={loc_ids}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setLoc_ids(e.target.value);
                            }}
                          >
                            <option value="">Select Location</option>
                            {location.map((value) => {
                              return <option key={value.id} value={value.id}>{value.name}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-3 form-M">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setName(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-sm-3 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Mobile Number"
                            name="mobile"
                            maxLength="10"
                            value={mobile}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setMobile(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-3 col-xs-6">
                        <div className="input select employeNmeSerchDv">
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

                      <div className="col-sm-1 col-xs-2">
                        <button
                          type="submit"
                          className="btn btn-primary pull-right"
                          onClick={HandleSearch}
                        >
                          Search
                        </button>
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
                            <th className="">Name</th>
                            <th className="">Email</th>
                            <th className="th_width-4"> Detail</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Locality</th>
                            <th scope="col">Created</th>
                            <th className="th_width-6"> Actions</th>
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

                            {agent &&
                              agent.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                                .map((value, index) => {
                                  if (value.properties != null) {
                                    propertyCount = value.properties.length
                                  }
                                  else {
                                    propertyCount = "0"
                                  }
                                  if (value.Location != null) {
                                    Locality = value.Location.name;
                                  } else {
                                    Locality = "---";
                                  }
                                  if (value.Requirements != null) {
                                    RequirementsCount = value.Requirements.length
                                  }
                                  else {
                                    RequirementsCount = "0"
                                  }
                                  return (
                                    <tr key={value.id}>
                                      <td>{index + 1}</td>
                                      <td>
                                        <Link to={"/admin/users/customerdetail/detail/" + value.id
                                        } target="_blank">{value.name} {value.lname}</Link>

                                      </td>
                                      <td>
                                        {value.username}</td>
                                      <td>           <Link to={"/admin/users/Pro_detail/" + value.id
                                      } target="_blank"> PropertyList  ({propertyCount}) </Link>
                                        <br />
                                        <Link to={"/admin/users/detailreq/" + value.id
                                        } target="_blank">

                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="15"
                                            height="15"
                                            fill="currentColor"
                                            className="bi bi-house-check"
                                            viewBox="0 0 16 16"
                                          >
                                            <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708L7.293 1.5Z" />
                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.707l.547.547 1.17-1.951a.5.5 0 1 1 .858.514Z" />
                                          </svg>

                                          <span>Total Added Requirement: {(RequirementsCount)}</span>
                                        </Link>

                                      </td>

                                      <td>{value.mobile}</td>
                                      <td>{Locality}</td>
                                      <td>
                                        {""}
                                        <Moment format="DD-MM-YYYY">
                                          {value.createdAt}
                                        </Moment>

                                      </td>
                                      <td>
                                        <div className="d-flex align-items-center">

                                          <Switch
                                            checked={
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
                                              fetch(Agent, options)
                                                .then((response) => response.json())
                                                .then((value) => {
                                                  setAgent(value.data);
                                                });
                                            }}
                                          />
                                          <a className="icEdit" onClick={(e) => {
                                            navigate("/admin/role/edit", {
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
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                          </tbody>
                        )}
                      </table>
                      <TablePagination
                        component="div"
                        count={agent.length}
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
export default React.memo(Agent);  