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


const apiUrl = config.API_URL + "contactinquiry/viewAll";
const url = config.API_URL + "contactinquiry/";



export default function ContactInquiry() {


  const navigate = useNavigate();
  const [contactInquiry, setContactInquiry] = useState([]);
  const [fname, setFname] = useState("");
  const [phone, setPhone] = useState("");
  const [pro_id, setPro_id] = useState("");
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
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };

  useEffect(() => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setContactInquiry(value.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });


  }, [fetch]);

  console.log("--->", contactInquiry)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Deleted ContactInquiry

  const Delete = async (id) => {
    const res = await axios.delete(url + id, options);
    const msg = res.data.message;
    localStorage.setItem("staticAdded", msg);
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setContactInquiry(value.data);
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
  const SearchUrl = config.API_URL + "contactinquiry/search";
  const HandleSearch = async (event) => {
    event.preventDefault();
    // Check if any of the parameters is provided, if not, keep the previous 'data' value (empty array).
    if (!fname && !pro_id && !phone) {
      return;
    }
    const body = {

      fname: fname,
      pro_id: pro_id,
      phone: phone,


    };
    await axios
      .post(SearchUrl, body)
      .then((res) => {
        const { data } = res.data;
        //  console.log("=>>>",res.data);
        setContactInquiry(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  };
  var PropertyName, LocationName, OwnerName, CityName
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
                    <h4 className="card-title">CONTACT INQUIRY LIST </h4>
                    <br />

                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                  </div>

                  <form
                    action="/getProductlist"
                    method="post"
                    className="form-horizontal"
                  >
                    <div className="row">
                      <div className="col-sm-3 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder=" Enter Name"
                            name="fname"
                            value={fname}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setFname(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-sm-3 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Mobile No."
                            maxLength="10"
                            name="phone"
                            value={phone}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setPhone(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-sm-3 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Property ID"
                            name="pro_id"
                            value={pro_id}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setPro_id(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-2 col-xs-6">
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
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Message</th>
                            <th scope="col">Property Details</th>
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
                            {contactInquiry
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((value, index) => {

                                if (value.Property != null) {
                                  PropertyName = value.Property.name;
                                } else {
                                  PropertyName = "---"
                                }

                                if (value.Property != null) {
                                  if (value.Property.User != null) {
                                    OwnerName = value.Property.User.name;
                                  } else {
                                    OwnerName = "---";
                                  }
                                } else {
                                  OwnerName = "---";
                                }

                                if (value.Property != null) {
                                  if (value.Property.City != null) {
                                    CityName = value.Property.City.name;
                                  } else {
                                    CityName = "---";
                                  }
                                } else {
                                  CityName = "---";
                                }



                                if (value.Property != null) {
                                  if (value.Property.Location != null) {
                                    LocationName = value.Property.Location.name;
                                  } else {
                                    LocationName = "---";
                                  }
                                } else {
                                  LocationName = "---";
                                }
                                return (

                                  <tr key={value.id}>
                                    <td>{index + 1}</td>
                                    <td>{value.fname}<br />
                                      {<Moment format="DD-MM-YYYY">
                                        {value.createdAt}
                                      </Moment>}
                                    </td>
                                    <td>{value.phone}</td>
                                    <td>{value.message}</td>
                                    <td>ID: {value.pro_id}<br />Property name: {PropertyName}<br />Property Owner: {OwnerName}<br />City: {CityName} <br />Location: {LocationName}</td>

                                    <td>
                                      <div className="d-flex align-items-center">
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
                        )}
                      </table>
                      <TablePagination
                        component="div"
                        count={contactInquiry.length}
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
