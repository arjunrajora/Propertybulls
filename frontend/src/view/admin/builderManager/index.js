import config from "../../../config/config";
// import { getToken } from "../../../utils/Auth/token_utils";
import axios from "axios";
import Moment from "react-moment";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Collapse,
  Alert,
  Switch,
  TablePagination,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { ToastContainer, toast, Zoom } from 'react-toastify';

var locationName;

const apiStatus = config.API_URL + "builder/status/";
const featuredApi = config.API_URL + "builder/featured/";
const url = config.API_URL + "builder/";
const apiUrl = config.API_URL + "builder/viewAll";
const stateUrl = config.API_URL + "state/viewAll";
const locationUrl = config.API_URL + "location/viewAll";

const headers = [
  { label: "id", key: "id" },
  { label: "Name", key: "name" },
  { label: "email", key: "username" },
  { label: "Mobile", key: "mobile" },
  { label: "Locality", key: "Location" },
  { label: "Created", key: "createdAt" },
];


export default function Builder() {
  const navigate = useNavigate();
  const [builder, setBuilder] = useState([]);
  const [state, setState] = useState([]);
  const [state_id, setState_id] = useState("");
  const [location, setLocation] = useState([]);
  const [location_id, setLocation_id] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [Start_Date, setStart_Date] = useState("");
  const [End_Date, setEnd_Date] = useState("");
  const [status, setStatus] = useState("");
  const [featured, setFeatured] = useState("");


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const StaticMessage = localStorage.getItem("staticAdded");
  const [openAlert, setOpenAlert] = useState(false);
  const [staticAdded, setStaticAdded] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // OrderBy Data
  // builder.reverse();
  var States
  // PDF Download
  const handleExportPDF = async () => {
    try {
      const pdf = new jsPDF("p", "pt", "a4");
      const columns = ["Id", "Name", "username", "Mobile", "Locality", "Created",];
      var rows = [];

      for (let i = 0; i < builder.length; i++) {
        var temp = [
          builder[i].id + 1,
          builder[i].name,
          builder[i].username,
          builder[i].mobile,
          builder[i].Location ? builder[i].Location.name : "---",
          builder[i].createdAt,
        ];
        rows.push(temp);
      }
      pdf.text(235, 40, "Builder List");
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
    for (let i = 0; i < builder.length; i++) {
      var temp = [
        builder[i].id + 1,
        builder[i].name,
        builder[i].username,
        builder[i].mobile,
        builder[i].Location ? builder[i].Location.name : "---",
        builder[i].createdAt,
      ];
      rows.push(temp);
    }
  };
  ////////////

  // Data Searching
  const SearchUrl = config.API_URL + "builder/searchAll";
  const HandleSearch = async (event) => {
    event.preventDefault();
    console.log("test", Start_Date);
    if (!status && !name && !featured && !location_id && !state_id && !mobile && !Start_Date && !End_Date && !featured) {
      return;
    }
    const body = {
      name: name,
      mobile: mobile,
      Start_Date: Start_Date,
      End_Date: End_Date,
      state_id: state_id,
      loc_ids: location_id,
      status: status,
      featured: featured
    };
    console.log(body, "df");
    await axios
      .post(SearchUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);

        const { data } = res.data;
        console.log("=>>>", res.data);

        setBuilder(data);
      })
      .catch((err) => console.log(err));
  };

  // Alert Messages For Add, Edit, Delete and Status
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

  // Data View
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };

  useEffect(() => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setBuilder(value.data);
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
  }, []);

  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Delete Confermation Code
  const Delete = async (id) => {
    try {


      const res = await axios.delete(url + id, options);
      const msg = res.data.message;
      localStorage.setItem("staticAdded", msg);
      fetch(apiUrl, options)
        .then((response) => response.json())
        .then((value) => {
          setBuilder(value.data);
        })
    }

    catch (err) {
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
        },
      ],
    });
  };


  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1); // Calculate yesterday's date

  var pojectcount;
  var cityss;
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
                <div className="card">
                  <ToastContainer />

                  <div className="card-header p-0">
                    <h4 className="card-title">BUILDER LIST</h4>
                    <br />
                    {/* 
                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a> */}

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
                                data={builder}
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
                          <Link
                            to="/admin/builder/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="fas fa-user-plus"></i>
                          </Link>
                        </li>

                        <li>
                          <a type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="fas fa-user-plus"></i> <span>{builder.length}</span>
                          </a>
                        </li>
                        <li>
                          <Link
                            to="/admin/builder/message"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn send-btn sendMessageButton"
                          >
                            <i className="fas fa-envelope"></i>
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
                              setState_id(e.target.value);
                            }}

                          >
                            <option value="">Select State</option>
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



                      <div className="col-sm-3 col-xs-6">
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
                            maxLength='10'
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
                          {/* <DatePicker
                            className="form-control"
                            placeholderText={"Start date"}
                            selected={Start_Date}
                            onChange={(date) => {
                              console.log("<<Date>>", date);
                              setStartDate(date);
                              setEndDate(date);
                            }}
                          /> */}
                          <DatePicker
                            className="form-control"
                            placeholderText={"Start Date"}
                            maxDate={today}
                            selected={Start_Date}
                            onChange={(date) => {
                              console.log("<<Date>>", date);
                              setStart_Date(date);
                            }}
                          />


                        </div>
                      </div>

                      <div className="col-sm-3 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          {/* <DatePicker
                            className="form-control"
                            placeholderText={"End date"}
                            minDate={endDate}
                            selected={endDate}
                            onChange={(date) => {
                              console.log(date);
                              setEndDate(date);
                            }}
                          /> */}
                          <DatePicker
                            className="form-control"
                            placeholderText={"End date"}
                            minDate={yesterday} // Set the minimum date to yesterday
                            maxDate={today} // Set the maximum date to today
                            selected={End_Date}
                            onChange={(date) => {
                              console.log(date);
                              setEnd_Date(date);
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
                            <option value="">--Select Status--</option>
                            <option value="Y">Active</option>
                            <option value="N">Inactive</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-3 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <select
                            // name="fname"
                            className="form-control"
                            value={featured}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setFeatured(e.target.value);
                            }}
                          >
                            <option value="">--Select Feature--</option>
                            <option value={1}>Feature</option>
                            <option value={0}>UnFeature</option>
                          </select>
                        </div>
                      </div>
                      <br />
                      <br />
                      <div className="col-sm-6 col-md-3 form-M">
                        <button
                          className="btn btn-primary pull-right"
                          variant="contained"
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
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Locality</th>
                            <th scope="col">Created</th>
                            <th scope="col">Project Detail</th>
                            <th scope="col">Logo</th>
                            <th scope="col">Actions</th>
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
                            {builder
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((value, index) => {
                                if (value.properties != null) {
                                  pojectcount = value.properties.length
                                }
                                else {
                                  pojectcount = "0"
                                }







                                if (value.Location != null) {
                                  locationName = value.Location.name;
                                } else {
                                  locationName = "--";
                                }
                                return (
                                  <tr key={value.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <Link to={"/admin/users/customerdetail/" + value.id} target="_blank">{value.name} {value.lname}</Link></td>
                                    <td>{value.username}</td>
                                    <td>{value.mobile}</td>
                                    <td>{locationName}</td>
                                    <td>
                                      <Moment format="DD-MM-YYYY">
                                        {value.createdAt}
                                      </Moment>
                                    </td>
                                    <td>

                                      <Link to={"/admin/users/details/" + value.id} target="_blank">
                                        <span>ProjectDetail({pojectcount})</span>
                                      </Link>
                                    </td>
                                    <td>
                                      {
                                        <img
                                          alt="Image"
                                          src={config.Image_URL + value.image}
                                          height="100px"
                                          width="100px"
                                        />
                                      }
                                    </td>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <Switch title="Status"
                                          checked={value.status === "Y" ? true : false}
                                          onChange={async (e) => {
                                            const body = {
                                              status: value.status,
                                            };
                                            var res = await axios.put(
                                              apiStatus + value.id,
                                              body,
                                              options
                                            );
                                            const msg = res.data.message;
                                            localStorage.setItem(
                                              "staticAdded",
                                              msg
                                            );
                                            fetch(apiUrl, options)
                                              .then((response) =>
                                                response.json()
                                              )
                                              .then((value) => {
                                                setBuilder(value.data);
                                              });
                                          }}
                                        />



                                        <Switch title="Features"
                                          checked={value.featured === 1}
                                          onChange={async (e) => {
                                            const body = {
                                              featured: value.featured,
                                            };
                                            var res = await axios.put(
                                              featuredApi + value.id,
                                              body, options
                                            );
                                            const msg = res.data.message;
                                            localStorage.setItem(
                                              "staticAdded",
                                              msg
                                            );
                                            await fetch(apiUrl, options)
                                              .then((response) => response.json())
                                              .then((value) => {
                                                setBuilder(value.data);
                                              });
                                          }}
                                        />



                                        <a className="icEdit" onClick={(e) => {
                                          navigate("/admin/builder/edit", {
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
                        count={builder.length}
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
