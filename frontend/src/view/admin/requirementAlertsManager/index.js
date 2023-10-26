import config from "../../../config/config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { confirmAlert } from "react-confirm-alert";
import Moment from "react-moment";
import { Collapse, Alert, Switch, TablePagination } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";



const apiUrl = config.API_URL + "requirementalert/viewAll";
const locationUrl = config.API_URL + "location/viewAll";
const url = config.API_URL + "requirementalert/";




export default function RequirementAlerts() {



  const navigate = useNavigate();
  const [requirementAlert, setRequirementAlert] = useState([]);
  const [location, setLocation] = useState([]);

  const [fname, setFname] = useState("");
  const [phone, setPhone] = useState("");
  const [location_id, setLocation_id] = useState("");
  const [p_typeid, setP_typeid] = useState("");

  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const StaticMessage = localStorage.getItem("staticAdded");
  const [staticAdded, setStaticAdded] = useState("");
  const [openAlert, setOpenAlert] = useState(false);



  // Data View
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };


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
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setRequirementAlert(value.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });

    fetch(locationUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);
      })
  }, [fetch]);

  console.log("requirementAlert", requirementAlert)



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
        setRequirementAlert(value.data);
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
          //onClick: () => alert('Click No')
        },
      ],
    });
  };



  // Data Searching
  const SearchUrl = config.API_URL + "requirementalert/search";
  const HandleSearch = async (event) => {
    event.preventDefault();
    // Check if any of the parameters is provided, if not, keep the previous 'data' value (empty array).
    if (!fname && !category && !phone && !p_typeid && !location_id) {
      return;
    }
    const body = {
      p_typeid: p_typeid,
      category: category,
      fname: fname,
      location_id: location_id,
      phone: phone,


    };
    await axios
      .post(SearchUrl, body, options)
      .then((res) => {
        const { data } = res.data;
        //  console.log("=>>>",res.data);
        setRequirementAlert(data);
      })
      .catch((err) => console.log(err));
  };

  var ProjectType, CityState, StateLocation, LocationState;
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
                    <h4 className="card-title">REQUIREMENT ALERTS LIST </h4>
                    <br />

                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                    <div className="heading-elements"></div>
                  </div>

                  <form
                    action="/getSliderlist"
                    method="post"
                    className="form-horizontal"
                  >
                    <div className="row">
                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <select
                            name="location_id"
                            className="form-control"
                            value={location_id}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setLocation_id(e.target.value);
                            }}
                          >
                            <option value="">--Select Locality--</option>
                            {location.map((value) => {
                              return <option key={value.id} value={value.id}>{value.name}</option>;
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="User Name"
                            name="fname"
                            value={fname}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setFname(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="User Mobile"
                            name="phone"
                            maxLength="10"
                            value={phone}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setPhone(e.target.value);
                            }}

                          />
                        </div>
                      </div>
                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <select name="p_typeid" className="form-control"
                            value={p_typeid}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setP_typeid(e.target.value);
                            }}>
                            <option value="">
                              --Select project type--
                            </option>
                            <option value="319">Residential plot</option>
                            <option value="320">Residential House</option>
                            <option value="321">Residential Flat</option>
                            <option value="322">Builder Floor Apartment</option>
                            <option value="324">Commercial Land</option>
                            <option value="325">Commercial office space</option>
                            <option value="326">Commercial Shop</option>
                            <option value="327">Commercial Showroom</option>
                            <option value="342">Residential vila/Duplex</option>
                            <option value="352">Indestrial Plot</option>
                            <option value="356">Commercial Warehouse</option>
                            <option value="357">Affordable Housing Project</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <select name="category"
                            className="form-control"
                            value={category}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setCategory(e.target.value);
                            }}>
                            <option value=""> --Select Category--</option>
                            <option value="Sell">Sell</option>
                            <option value="Rent">Rent</option>





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
                            <th scope="col">S.No</th>
                            <th scope="col">User Detail</th>
                            <th scope="col">Type</th>
                            <th scope="col">Category</th>
                            <th scope="col">Location</th>
                            <th scope="col">Features</th>
                            <th scope="col">Budget</th>
                            <th scope="col">Created</th>
                            <th scope="col">Response</th>
                            <th scope="col">Action</th>

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
                            {requirementAlert
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((value, index) => {

                                if (value.propertyType != null) {
                                  ProjectType = value.propertyType.name;
                                }
                                else {
                                  ProjectType = "---"
                                }

                                if (value.Location != null) {
                                  LocationState = value.Location.name;
                                }
                                else {
                                  LocationState = "---"
                                }
                                if (value.City != null) {
                                  CityState = value.City.name;
                                }
                                else {
                                  CityState = "---"
                                } if (value.State != null) {
                                  StateLocation = value.State.name;
                                }
                                else {
                                  StateLocation = "---"
                                }



                                return (
                                  <tr key={value.id}>
                                    <td>{index + 1}</td>
                                    <td>Name:{value.fname}<br />Email:{value.email}<br />Phone:{value.phone}</td>
                                    <td>ID:{value.id}<br />{ProjectType}</td>
                                    <td>{value.category}</td>
                                    <td>{LocationState}<br />Jaipur<br />Rajasthan</td>
                                    <td>Option:{value.category}<br />Min Area Sq Ft{ }<br />Max Area Sq Ft{ }<br /></td>
                                    <td>Min-budget:{value.min_budget}<br />Max-budget:{value.max_budget}</td>
                                    <td><Moment format="DD-MM-YYYY">
                                      {value.createdAt}
                                    </Moment></td>
                                    <td>
                                      <Link to="/admin/requirementAlertResponse">View Response</Link>
                                    </td>
                                    <td>  <a href="#" className="icDelete" onClick={(e) => {
                                      deleteconfirmation(
                                        value.id,
                                        "Are you sure you want to Delete ?"
                                      );
                                    }}>
                                      <i
                                        className="fas fa-trash-alt"
                                        title="delete"

                                      ></i>
                                    </a></td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        )}
                      </table>
                      <TablePagination
                        component="div"
                        count={requirementAlert.length}
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
