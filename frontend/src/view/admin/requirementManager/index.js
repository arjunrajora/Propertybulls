import config from "../../../config/config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { confirmAlert } from "react-confirm-alert";
import { CSVLink } from "react-csv";

import Moment from "react-moment";
import { Collapse, Alert, Switch, TablePagination, Tooltip, IconButton } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";



const apiUrl = config.API_URL + "requirement/viewAll";
const url = config.API_URL + "requirement/";
const statusurl = config.API_URL + "requirement/status/";
const locationUrl = config.API_URL + "location/viewAll";


// const headers = [
//   { label: "ID", key: "id" },
//   { label: "PropertyType", key: "p_typeid" },
//   // { label: "Category", key: "category" },
//   // { label: "State_id", key: "state_id" },
//   // { label: "City_id", key: "city_id" },
//   // { label: "Location_id", key: "location_id" },
//   // { label: "Age", key: "age" },
//   // { label: "Cus_id", key: "cus_id" },
//   // { label: "Min_budget", key: "min_budget" },
//   // { label: "Max_budget", key: "max_budget" },
//   // { label: "Max_area", key: "max_area" },
//   // { label: "Min_area", key: "min_area" },
//   // { label: "Created", key: "createdAt" },
// ];




export default function Requirement() {
  const navigate = useNavigate();
  const [requirement, setRequirement] = useState([]);
  const [location, setLocation] = useState([]);
  const [p_typeid, setP_typeid] = useState("");
  const [city_id, setCity_id] = useState("");
  const [category, setCategory] = useState("");
  const [location_id, setLocation_id] = useState("");
  const [state_id, setState_id] = useState("");
  const [cus_id, setCus_id] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const StaticMessage = localStorage.getItem("staticAdded");
  const [staticAdded, setStaticAdded] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


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
        setRequirement(value.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });




    fetch(locationUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);
      });


  }, [fetch]);

  console.log("requirement", requirement);

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
        setRequirement(value.data);
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
  const SearchUrl = config.API_URL + "requirement/search";
  const HandleSearch = async (event) => {
    event.preventDefault();
    // Check if any of the parameters is provided, if not, keep the previous 'data' value (empty array).
    if (!p_typeid && !location_id && !city_id && !state_id && !category) {
      return;
    }
    //  console.log("test",startDate);
    const body = {
      state_id: state_id,
      city_id: city_id,
      location_id: location_id,
      category: category,
      p_typeid: p_typeid,
      

    };
    await axios
      .post(SearchUrl, body, options)
      .then((res) => {
        const { data } = res.data;
        console.log("=>>>", res.data);
        setRequirement(data);
      })
      .catch((err) => console.log(err));
  };

  // Export to CSV

  const headers = [
    { label: "ID", key: "id" },
    { label: "Property Type", key: "propertyType" },
    { label: "Category", key: "category" },
    { label: "Customer Name", key: "customerName" },
    { label: "Customer Mobile", key: "customerMobile" },
    { label: "Location", key: "Location" },
    { label: "City", key: "City" },
    { label: "State", key: "State" },


  ];

  const data = requirement.map((item) => {
    let projectType, LocationState, CityState, StateLocation, CustomerData, CustomerMobile;
    if (item.propertyType != null) {
      projectType = item.propertyType.name;
    } else {
      projectType = "---";
    }
    if (item.Location != null) {
      LocationState = item.Location.name;
    } else {
      LocationState = "---";
    }
    if (item.City != null) {
      CityState = item.City.name;
    }
    else {
      CityState = "---"
    } if (item.State != null) {
      StateLocation = item.State.name;
    }
    else {
      StateLocation = "---"
    }
    if (item.User != null) {
      CustomerData = item.User.name;
    }
    else {
      CustomerData = "---"
    } if (item.User != null) {
      CustomerMobile = item.User.mobile;
    }
    else {
      CustomerMobile = "---"
    }

    return {
      id: item.id + 1,
      propertyType: projectType,
      category: item.category, // Use item.category instead of category,
      Location: LocationState,
      City: CityState,
      State: StateLocation,
      // User: CustomerData,
      // User: CustomerMobile
      customerName: CustomerData,
      customerMobile: CustomerMobile,
    };
  });



  const onExportLinkPress = async () => {
    const csvData = [
      headers.map((header) => header.label),
      ...data.map((item) => Object.values(item)),
    ];

    const csvOptions = {
      filename: "my-file.csv",
      separator: ",",
    };

    const csvExporter = new CSVLink(csvData, csvOptions);
    csvExporter.click();
  };





  var LocationState, CityState, StateLocation, ProjectType, CustomerData, CustomerMobile, CustomerRole

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
                    <h4 className="card-title">REQUIREMENT LIST </h4>
                    <br />

                    <div className="heading-elements">
                      <ul className="list-inline mb-0 d-flex align-items-center">

                        <li>
                          <Tooltip title="Excel List" onClick={onExportLinkPress}>
                            <IconButton>
                              <CSVLink
                                headers={headers}
                                data={data}
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
                            to="/admin/requirement/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="la la-plus"></i> <span>ADD REQUIREMENT</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3 col-xs-6 form-M">
                      <div className="input select">
                        <select name="State_id" className="form-control"
                          value={state_id}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setState_id(e.target.value);
                          }}>
                          <option value="">--Select State--</option>
                          <option value="99">Rajasthan</option>



                        </select>
                      </div>
                    </div>

                    <div className="col-sm-3 col-xs-6">
                      <div className="input select">
                        <select name="city_id" className="form-control"
                          value={city_id}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setCity_id(e.target.value);
                          }}>
                          <option value="">--Select City--</option>
                          <option value="27">Jaipur</option>
                          <option value="71">test</option>


                        </select>
                      </div>
                    </div>

                    <div className="col-sm-3 col-xs-6">
                      <div className="input select">
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

                    <div className="col-sm-3 col-xs-6">
                      <div className="input select">
                        <select name="role_id" className="form-control"
                          onChange={(e) => {
                            console.log(e.target.value);
                            setCus_id(e.target.value);
                          }}

                        >
                          <option value="">--Select Customer Type--</option>
                          <option value="2">Individuals</option>
                          <option value="4">Builder</option>
                          <option value="3">Agent</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-3 col-xs-6">
                      <div className="input select">
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

                    <div className="col-sm-3 col-xs-6">
                      <div className="input select">
                        <select name="option"
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
                            <th scope="col">Type</th>
                            <th scope="col">Category</th>
                            <th scope="col">Location</th>
                            <th scope="col">Owner detail</th>
                            <th scope="col">Features</th>
                            <th scope="col">Budget</th>
                            <th scope="col">Created</th>
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
                            {requirement.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, index) => {
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
                              if (value.User != null) {
                                CustomerData = value.User.username;
                              }
                              else {
                                CustomerData = "---"
                              } if (value.User != null) {
                                CustomerMobile = value.User.mobile;
                              }
                              else {
                                CustomerMobile = "---"
                              } if (value.User != null) {
                                CustomerRole = value.User.Role.title;
                              }
                              else {
                                CustomerRole = "---"
                              }
                              // if (value.User != null) {
                              //   if (value.Customer.name != null && value.User.username != null && value.User.mobile != null) {
                              //     CustomerData = value.Customer.name + " - " + value.User.username + " - " + value.User.mobile;
                              //   } else {
                              //     CustomerData = "---";
                              //   }
                              // } else {
                              //   CustomerData = "---";
                              // }


                              return (
                                <tr key={value.id}>
                                  <td>{index + 1}</td>
                                  <td>ID:{value.id}<br />{ProjectType}</td>
                                  <td>{value.category}</td>
                                  <td>{StateLocation}<br />{CityState}<br />{LocationState}</td>
                                  <td>{CustomerRole}<br />{CustomerData}<br />{CustomerMobile}</td>
                                  <td>Min Area{value.min_area}Sq Ft<br />Max Area{value.max_area}Sq Ft</td>
                                  {/* <td>Min-budget{value.min_budget}<br />Max-budget{value.max_budget}</td> */}
                                  <td>
                                    Min-budget {value.min_budget.toLocaleString("en-IN")}
                                    <br />
                                    Max-budget {value.max_budget.toLocaleString("en-IN")}
                                  </td>
                                  {/* <td>Min-budget:{value.min_budget
                                    ? value.min_budget >= 10000000
                                      ? (value.min_budget / 10000000).toFixed(1) + ' crore'
                                      : value.min_budget >= 100000
                                        ? (value.min_budget / 100000).toFixed(1) + ' lac'
                                        : value.min_budget.toLocaleString()
                                    : 'Price Not Disclosed'}<br />
                                    Max_budget:{value.max_budget
                                      ? value.max_budget >= 10000000
                                        ? (value.max_budget / 10000000).toFixed(1) + ' crore'
                                        : value.max_budget >= 100000
                                          ? (value.max_budget / 100000).toFixed(1) + ' lac'
                                          : value.max_budget.toLocaleString()
                                      : 'Price Not Disclosed'}
                                  </td> */}

                                  <td>
                                    <Moment format="DD-MM-YYYY">
                                      {value.createdAt}
                                    </Moment>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      {/* <Switch
                                        checked={
                                          value.status === "Y" ? true : false
                                        } onChange={async (e) => {
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
                                              setRequirement(value.data);
                                            });
                                        }}
                                      /> */}
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
                        count={requirement.length}
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
