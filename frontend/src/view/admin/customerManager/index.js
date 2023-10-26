import config from "../../../config/config";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import Moment from "react-moment";
import { ToastContainer, toast, Zoom } from 'react-toastify';


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
import { confirmAlert } from "react-confirm-alert";

const apiUrl = config.API_URL + "customer/viewAll";
const url = config.API_URL + "customer/";
const statusurl = config.API_URL + "customer/status/";

const headers = [
  { label: "Name", key: "name" },
  { label: "Mobile", key: "mobile" },
  { label: "Created", key: "created" },
];

export default function Customer() {

  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const StaticMessage = localStorage.getItem("staticAdded");
  const [staticAdded, setStaticAdded] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleExportPDF = async () => {
    try {
      const pdf = new jsPDF("p", "pt", "a4");
      const columns = ["Id", "Name", "Mobile", "email"];
      var rows = [];
      for (let i = 0; i < customer.length; i++) {
        var temp = [
          customer[i].id + 1,
          customer[i].name,
          customer[i].mobile,
          customer[i].username,
        ]
        rows.push(temp);
      }
      pdf.text(235, 40, "Customer List");
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
    for (let i = 0; i < customer.length; i++) {
      var temp = [
        customer[i].id + 1,
        customer[i].name,
        customer[i].email,
        customer[i].mobile,
        customer[i].description,
      ];
      rows.push(temp);
    }
  };
  ////////////

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

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  useEffect(() => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setCustomer(value.data);
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

  const Delete = async (id) => {
    try {
      const res = await axios.delete(url + id, options);
      const msg = res.data.message;
      localStorage.setItem("staticAdded", msg);
      fetch(apiUrl, options)
        .then((response) => response.json())
        .then((value) => {
          setCustomer(value.data);
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

  // Data Searching
  const SearchUrl = config.API_URL + "customer/search";
  const HandleSearch = async (event) => {
    event.preventDefault();
    // Check if any of the parameters is provided, if not, keep the previous 'data' value (empty array).
    if (!name && !username && !mobile && !status) {
      return;
    }
    const body = {
      name: name,
      username: username,
      mobile: mobile,
      status: status,
    };
    await axios
      .post(SearchUrl, body, options)
      .then((res) => {
        const { data } = res.data;
        console.log("=>>>", res.data);
        setCustomer(data);
      })
      .catch((err) => console.log(err));
  };

  console.log("Customer", customer)
  var RoleState, RequirementsCount, PropertiesCount;

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
                <div>
                  <div className="card-header p-0">
                    <h4 className="card-title">CUSTOMER LIST </h4>
                    <div className="heading-elements">
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li>
                          <Tooltip title="PDF List" onClick={handleExportPDF}>
                            <IconButton className="btn pdfButton">
                              <i className="fas fa-file-pdf"></i>
                              {/* <span>PDF</span> */}
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
                                data={customer}
                                filename={"my-file.csv"}
                                className="btn excelButton"
                                target="_blank"
                              >
                                <i className="fas fa-file-excel"></i>
                                {/* <span>EXCEL</span> */}
                                {/* <Iconify icon="vscode-icons:file-type-excel" /> */}
                              </CSVLink>
                            </IconButton>
                          </Tooltip>
                        </li>
                      </ul>
                    </div>

                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                  </div>


                  <form className="form-horizontal">
                    <div className="row">
                      <div className="col-sm-3 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setName(e.target.value)
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-sm-3 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            name="username"
                            value={username}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setUsername(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-sm-3 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Contact"
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

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <select name="fname" className="form-control"

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
                      <div className="col-sm-1 col-xs-6">
                        <button
                          type="submit"
                          onClick={HandleSearch}
                          className="btn btn-primary pull-right"
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
                            <th scope="col">
                              S.No
                            </th>
                            <th scope="col">
                              Name
                            </th>
                            {/* <th className="th_width-2" scope="col">
                              Customer Detail
                            </th> */}
                            <th scope="col">
                              Detail
                            </th>
                            {/* <th  scope="col">
                              Role
                            </th> */}
                            <th scope="col">
                              Mobile
                            </th>
                            <th scope="col">
                              Created
                            </th>

                            <th scope="col">
                              Actions
                            </th>
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
                            {customer
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((value, index) => {
                                if (value.Requirements != null) {
                                  RequirementsCount = value.Requirements.length
                                }
                                else {
                                  RequirementsCount = "0"
                                }
                                if (value.Properties != null) {
                                  PropertiesCount = value.Properties.length
                                }
                                else {
                                  PropertiesCount = "0"
                                }




                                if (value.Role != null) {
                                  RoleState = value.Role.title;
                                } else {
                                  RoleState = "---";
                                }

                                const Bathrooms = value.SaveOrders && value.SaveOrders.map(e => e.Subscription.package_name);
                                const kamal = Bathrooms && Bathrooms.map(e => e);

                                return (
                                  <tr key={value.id}>
                                    <td>{index + 1}</td>

                                    <td>
                                      <Link to={"/admin/users/customerdetail/" + value.id
                                      } target="_blank">
                                        {value.name} {value.lname}
                                      </Link>
                                      <br />
                                      {value.username}<br />

                                      Package: {kamal && kamal.length > 0 ? kamal.join(", ") : "No Subscription"}
                                    </td>
                                    <td>

                                      <Link to={"/admin/users/detail/" + value.id
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

                                        <span> Total Added Property:{PropertiesCount}</span>
                                      </Link><br />

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

                                        <span>Total Added Requirement: {RequirementsCount}</span>
                                      </Link>





                                    </td>



                                    {/* <td>{RoleState}</td> */}
                                    <td>{value.mobile}</td>

                                    <td>

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
                                              statusurl + value.id,
                                              body,
                                              options
                                            );
                                            const msg = res.data.message;
                                            localStorage.setItem(
                                              "staticAdded",
                                              msg
                                            );
                                            await fetch(apiUrl, options)
                                              .then((response) => response.json())
                                              .then((value) => {
                                                setCustomer(value.data);
                                              });
                                          }}
                                        />

                                        <a className="icEdit"
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
                        count={customer.length}
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






