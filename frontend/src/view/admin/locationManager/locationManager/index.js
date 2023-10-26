

import config from "../../../../config/config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminHeader from "../../../../element/adminHeader";
import AdminFooter from "../../../../element/adminFooter";
import Moment from "react-moment";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Collapse,
  Alert,
  Switch,
  TablePagination,
  getSelectUtilityClasses,
} from "@mui/material";
import { confirmAlert } from "react-confirm-alert";

import "react-confirm-alert/src/react-confirm-alert.css";
const apiUrl = config.API_URL + "location/viewAll";
const url = config.API_URL + "location/";
const statusurl = config.API_URL + "location/status/";

export default function LocationManager() {
  const navigate = useNavigate();
  const [Location, setLocation] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const StaticMessage = localStorage.getItem("staticAdded");
  const [staticAdded, setStaticAdded] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setLocation(value.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const Delete = async (id) => {
    const res = await axios.delete(url + id, options);
    const msg = res.data.message;
    localStorage.setItem("staticAdded", msg);
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);
      });
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
  };

  // Data Searching
  const SearchUrl = config.API_URL + "location/search";
  const HandleSearch = async (event) => {
    event.preventDefault();

    // Check if any of the parameters is provided, if not, keep the previous 'data' value (empty array).
    if (!status && !name) {
      return;
    }

    const body = {
      name: name,
      status: status
    };
    console.log(body);
    await axios
      .post(SearchUrl, body, options)
      .then((res) => {
        const { data } = res.data;
        console.log("=>>>", res.data);
        setLocation(data);
      })
      .catch((err) => console.log(err));
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
                <div className="card">
                  <div className="card-header p-0">
                    <h4 className="card-title">LOCATION LIST </h4>
                    <br />

                    <div className="heading-elements">
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li>
                          <Link
                            to="/admin/location/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="la la-plus"></i> <span>ADD LOCATION</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>


                  <form className="form-horizontal">
                    <div className="row">

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
                  <div className="card-content collapse show">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="thead-default table-dark">
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Location Name</th>
                            <th scope="col">City</th>
                            <th scope="col">Created</th>
                            <th className="th_width-4" scope="col">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        {isLoading ? (
                          <tbody>
                            <tr>
                              <td colSpan={5}>
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
                            {Location
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((value, index) => {
                                // if (value.State != null) {
                                //   LocationState = value.State.name;
                                // } else {
                                //   LocationState = "---";
                                // }

                                return (
                                  <tr key={value.id}>
                                    <td>{index + 1}</td>
                                    <td>{value.name}</td>
                                    <td>{value.City.name}</td>
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
                                            const body = {
                                              status: value.status,
                                            };
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
                                            fetch(apiUrl, options)
                                              .then((response) =>
                                                response.json()
                                              )
                                              .then((value) => {
                                                setLocation(value.data);
                                              });
                                          }}
                                        />

                                        <a className="icEdit" onClick={(e) => {
                                          navigate("/admin/location/edit", {
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
                        count={Location.length}
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
