import config from "../../../config/config";
import axios from "axios";
import { useNavigate, Link, navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import Moment from "react-moment";
import { Collapse, Alert, Switch, TablePagination } from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast, Zoom } from 'react-toastify';

const apiUrl = config.API_URL + "subscription/viewAll";
const deletesubscription = config.API_URL + "subscription/delete/";

export default function Packageview() {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState([]);
  const StaticMessage = localStorage.getItem("staticAdded");
  const [staticAdded, setStaticAdded] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [role_id, setRole_id] = useState("")

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
        setSubscription(value.data);
      });
  }, []);

  // delete functionality

  const Delete = async (id) => {
    try {


      const res = await axios.delete(deletesubscription + id, options);
      const msg = res.data.message;
      localStorage.setItem("staticAdded", msg);
      fetch(apiUrl, options)
        .then((response) => response.json())
        .then((value) => {
          setSubscription(value.data);
        })
    }
    catch (err) {
      let message
      toast.error(message = "Builder Delete not found", {
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


  // Data Searching(package search)
  const SearchUrl = config.API_URL + "subscription/packagesearch";
  const HandleSearch = async (event) => {
    event.preventDefault();
    // Check if any of the parameters is provided, if not, keep the previous 'data' value (empty array).
    if (!role_id) {
      return;
    }
    const body = {
      role_id: role_id,
    };
    console.log("body", body)
    await axios
      .post(SearchUrl, body, options)
      .then((res) => {
        const { data } = res.data;
        console.log("=>>>", res.data);
        setSubscription(data);
      })
      .catch((err) => console.log(err));
  };


  var RoleName

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
                    <h4 className="card-title">Package Manager</h4>
                    <br />

                    <div className="heading-elements">
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li>
                          <Link
                            to="/admin/package/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="la la-plus"></i> <span>Add Package</span>
                          </Link>

                        </li>
                      </ul>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-sm-3 col-xs-6 form-M">
                      <div className="input select">
                        <select name="State_id" className="form-control"
                          value={role_id}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setRole_id(e.target.value);
                          }}
                        >
                          <option value="">--Select Role--</option>
                          <option value="2">Owner</option>
                          <option value="3">Agent</option>
                          <option value="4">Builder</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3 form-M">
                      <button
                        type="submit"
                        onClick={HandleSearch}
                        className="btn btn-primary pull-right"
                      >
                        Search
                      </button>
                    </div>
                  </div>

                  <hr />









                  <div className="card-content collapse show">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="thead-default table-dark">
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Role</th>
                            <th scope="col">Package Name</th>
                            <th scope="col">Package Validity</th>
                            <th scope="col">	Package Price</th>
                            <th scope="col">Package	Discount</th>
                            <th scope="col">Created</th>
                            <th scope="col"> Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {subscription.map((value, index) => {
                            if (value.Role != null) {
                              RoleName = value.Role.title
                            }
                            else {
                              RoleName = "---"
                            }
                            return (
                              <tr key={value.id}>
                                <td>{index + 1}</td>
                                <td>{RoleName}</td>
                                <td>{value.package_name}</td>
                                <td>{value.package_validity} Days</td>
                                <td>&#8377; {value.package_price}</td>
                                <td>{value.package_discount}%off</td>
                                <td>
                                  <Moment format="DD-MM-YYYY">
                                    {value.createdAt}
                                  </Moment>
                                </td>

                                <td>
                                  <div className="d-flex align-items-center">
                                    <Link to={"/admin/package/edit/" + value.id} className="icEdit"  >
                                      <i className="fas fa-pen" title="Edit"></i>
                                    </Link>


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
                            )
                          })}


                        </tbody>


                      </table>
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
