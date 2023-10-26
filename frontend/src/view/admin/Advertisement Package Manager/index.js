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
function Advertisement () {
  const navigate = useNavigate();
  const [lineData, setLineData] = useState("");
  const viewAllData = config.API_URL + 'advertisementpackage/viewAll';
  const apiStatus = config.API_URL + 'advertisementpackage/status/';

  const [advertisementList, setAdvertisementList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const StaticMessage = localStorage.getItem("staticAdded");
  const [staticAdded, setStaticAdded] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(50);
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
 
    fetch(viewAllData, options)
      .then((response) => response.json())
      .then((value) => {
        console.log( value.data);
        setAdvertisementList(value.data);
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
  const Delete = async (id) => {
    const deleteapi = config.API_URL + 'advertisementpackage/'+id;
    try {
      const res = await axios.delete(deleteapi, options);
      const msg = res.data.message;
      localStorage.setItem("staticAdded", msg);
      fetch(viewAllData, options)
      .then((response) => response.json())
      .then((value) => {
        console.log( value.data);
        setAdvertisementList(value.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });

    } catch (err) {
      let message
      toast.error(message = "Agent Delete not found", {
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
   
       for (let i = 0; i < advertisementList.length; i++) {
        var temp = [
          advertisementList[i].id + 1,
          advertisementList[i].name,
          advertisementList[i].lname,
          advertisementList[i].mobile,
          advertisementList[i].username,
          advertisementList[i].createdAt,
          advertisementList[i].Location ? advertisementList[i].Location.name : "---",
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
  
    for (let i = 0; i < advertisementList.length; i++) {
      var temp = [
        advertisementList[i].id + 1,
        advertisementList[i].name,
        advertisementList[i].lname,
        advertisementList[i].username,
        advertisementList[i].mobile,
        advertisementList[i].createdAt,
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
                    <h4 className="card-title">Advertisement Package Manager</h4>
                    <br />
                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                    <div className="heading-elements">
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li>
                          <Link
                            to="/admin/advertisement/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="fas fa-plus" title="Add Package"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* <form className="form-horizontal">
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
                  </form> */}
                  <div className="card-content collapse show">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="thead-default table-dark">
                          <tr>
                            <th scope="col">S.No</th>
                            <th className="">Banner Page</th>
                            <th className="">Banner Location</th>
                            <th className="th_width-4"> Banner Size</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Amount</th>
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

                            {advertisementList &&
                              advertisementList.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                                .map((value, index) => {
                                  let banner_locationss;
                                  if(value.BannerPosition!=null){
                                    banner_locationss=    value.BannerPosition.banner_location
                                  }else{
                                    banner_locationss='-'
                                  }
                                  return (
                                    <tr key={value.id}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {value.page}</td>
                                        <td>
                                        {banner_locationss}</td>  
                                           <td>
                                        {value.banner_size}</td>
                                      <td>{value.duration}</td>
                                      <td>
                                      <span style={{textDecoration:"line-through"}}>{value.discount_price}</span>
                                  {''}   <span>&#8377;{value.amount}</span></td>
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
                                              value.status === "Y" ? true : false }
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
                                              fetch(viewAllData, options)
                                              .then((response) => response.json())
                                              .then((value) => {
                                                console.log( value.data);
                                                setAdvertisementList(value.data);
                                                setTimeout(() => {
                                                  setIsLoading(false);
                                                }, 1000);
                                              });
                                            }}
                                          />
                                          <a className="icEdit" onClick={(e) => {
                                            navigate("/admin/advertisement/edit", {
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
                        count={advertisementList.length}
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
export default React.memo(Advertisement);  