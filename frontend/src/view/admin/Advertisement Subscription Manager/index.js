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
import DatePicker from "react-datepicker";

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
function AdvertisementSubscription() {
  const navigate = useNavigate();
  const [lineData, setLineData] = useState("");
  const viewAllData = config.API_URL + 'advertisementsubscription/viewAll';
  const apiStatus = config.API_URL + 'advertisementsubscription/status/';

  const [advertisementSubscriptionList, setAdvertisementSubscriptionList] = useState([]);
  const apI = config.API_URL + "advertisementpackage/viewAllBannerPosition"

  const [isLoading, setIsLoading] = useState(true);
  const [BannerPageLocation, setBannerPageLocation] = useState([])
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("")
  const [page, setPage] = useState(0);
  const [pagess, setPagess] = useState(0);
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
  const [duration, setduration] = useState("")

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
        console.log("🚀 ~ file: index.js:80 ~ .then ~ value:", value)
        console.log(value.data);
        setAdvertisementSubscriptionList(value.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
      const apI = config.API_URL + "advertisementsubscription/viewAllAdvertisement"
    fetch(apI, options)
      .then((response) => response.json())
      .then((value) => {
        setBannerPageLocation(value.data);
      });
  }, [fetch]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const SearchUrl = config.API_URL + "advertisementsubscription/serchviewAll";
  const HandleSearch = async (event) => {
    event.preventDefault();
    const body = {
      page: pagess,
      duration: duration,
      endDate: endDate,
      startDate :startDate,
         };

    
    await axios.post(SearchUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );
        const { data } = res.data;
        console.log("=>>>", res.data);
        setAdvertisementSubscriptionList(data);
      })
      .catch((err) => console.log(err));
  };
  const Delete = async (id) => {
    const deleteapi = config.API_URL + 'advertisementsubscription/' + id;
    try {
      const res = await axios.delete(deleteapi, options);
      const msg = res.data.message;
      localStorage.setItem("staticAdded", msg);
      fetch(viewAllData, options)
        .then((response) => response.json())
        .then((value) => {
          console.log(value.data);
          setAdvertisementSubscriptionList(value.data);
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
  const headers = [
    { label: "Banner Page	", key: "page" },
    { label: "Page Location", key: "redirect_link" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "mobile.No", key: "mobile" },
    { label: 'start Date', key: 'start_date' },
    { label: 'Package Duration', key: 'duration' },
    { label: 'End date', key: 'end_date' },
  ];
  const handleExportPDF = async () => {
    try {
      const pdf = new jsPDF("p", "pt", "a4");
      const columns = ["Id", "Name", "lname", "Mobile", "username", "createdAt"];
      var rows = [];

      for (let i = 0; i < advertisementSubscriptionList.length; i++) {
        var temp = [
          advertisementSubscriptionList[i].id + 1,
          advertisementSubscriptionList[i].name,
          advertisementSubscriptionList[i].lname,
          advertisementSubscriptionList[i].mobile,
          advertisementSubscriptionList[i].username,
          advertisementSubscriptionList[i].createdAt,
          advertisementSubscriptionList[i].Location ? advertisementSubscriptionList[i].Location.name : "---",
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

    for (let i = 0; i < advertisementSubscriptionList.length; i++) {
      var temp = [
        advertisementSubscriptionList[i].id + 1,
        advertisementSubscriptionList[i].page,
        advertisementSubscriptionList[i].redirect_link,
        advertisementSubscriptionList[i].name,
        advertisementSubscriptionList[i].email,
        advertisementSubscriptionList[i].mobile,
        advertisementSubscriptionList[i].start_date,
        advertisementSubscriptionList[i].end_date,
      ];
      rows.push(temp);
    }
  }
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
                    <h4 className="card-title">Advertisement Subscription Manager</h4>
                    <br />
                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                    <div className="heading-elements">
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li>
                          <a type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i></i> <span>Actual Amount	&#8377;{advertisementSubscriptionList&&advertisementSubscriptionList.reduce((total, value) => total + (parseFloat(value.actual_amount) || 0), 0).toLocaleString()}</span>
                          </a>
                        </li>
                        <li>
                          <a type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >


                            <i></i> <span> Package Amount&#8377;{advertisementSubscriptionList&&advertisementSubscriptionList.reduce((total, value) => total + (parseFloat(value.package_amount) || 0), 0).toLocaleString()}</span>
                          </a>
                        </li>
                        <li>
                          <a type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i></i> <span>Advertisement Subscription Total= {advertisementSubscriptionList.length}</span>
                          </a>
                        </li>
                        <li>
                          <Tooltip
                            title="Excel List"
                            onClick={onExportLinkPress}
                          >
                            <IconButton>
                              <CSVLink
                                headers={headers}
                                data={advertisementSubscriptionList}
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
                            to="/admin/advertisementsubscription/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="fas fa-plus" title="Add Package"></i>
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
                            value={pagess}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setPagess(e.target.value);
                            }}
                          >
                            <option value=''>Select Page</option>
                            {Array.from(new Set(BannerPageLocation && BannerPageLocation.map((value) => value.page)))
                                      .map((uniqueName) => (
                                        <option key={uniqueName} value={uniqueName}>
                                          {uniqueName}
                                        </option>
                                      ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-3 col-xs-6">
                        <div className="input select">
                          <select name="duration"
                            class="form-control country" autocomplete="off" id="duration"
                            value={duration}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setduration(e.target.value);
                            }}
                          >
                            <option value="">Select Package Duration</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Quarterly"> Quarterly</option>
                            <option value="Half Yearly">Half Yearly</option>
                            <option value="Yearly">Yearly</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <DatePicker
                            className="form-control"
                            placeholderText="From Date"
                            selected={startDate}
                            onChange={(date) => {
                              console.log("<<Date>>", date);
                              setStartDate(date)
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <DatePicker
                            className="form-control"
                            placeholderText={"To Date"}
                            minDate={endDate}
                            selected={endDate}
                            onChange={(date) => {
                              console.log(date);
                              setEndDate(date);
                            }}
                          />
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
                    </div>
                  </form>

                  <hr />
                  <div className="card-content collapse show">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="thead-default table-dark">
                          <tr>
                            <th >S.No</th>
                            <th >Banner Page</th>
                            <th >Banner Location</th>
                            <th > Banner Size</th>
                            <th >Package Duration</th>
                            <th > Package Amount</th>
                            <th > Actual Amount</th>
                            <th > Discount(%)</th>
                            <th > Start Date</th>
                            <th >End Date</th>
                            <th >Subscriber Name</th>
                            <th >Subscriber Email</th>
                            <th >Subscriber Mobile</th>
                            <th >Reference</th>
                            <th> Actions</th>
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

                            {advertisementSubscriptionList &&
                              advertisementSubscriptionList.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                                .map((value, index) => {
                                  let banner_locationss;
                                  let banner_size;
                                  if (value.Advertisement
                                    != null) {
                                    banner_size = value.Advertisement.banner_size
                                  } else {
                                    banner_size = '-'
                                  }
                                  if (value.Advertisement && value.Advertisement.BannerPosition != null) {
                                    banner_locationss = value.Advertisement.BannerPosition.banner_location
                                  } else {
                                    banner_locationss = '-'
                                  }
                                  return (
                                    <tr key={value.id}>
                                      <td>{index + 1}</td>
                                      <td>
                                        {value.page}</td>
                                      <td>
                                        {banner_locationss}<br />
                                        Redirect Url-{value.redirect_link}</td>
                                      <td>
                                        {banner_size}</td>
                                      <td>{value.duration}</td>
                                      <td>&#8377;{value.package_amount}</td>
                                      <td>&#8377;{value.actual_amount}</td>
                                      <td>&#8377;{value.discount}</td>
                                      <td>
                                        {""}
                                        <Moment format="DD-MM-YYYY">
                                          {value.start_date}
                                        </Moment>
                                      </td>
                                      <td>
                                        {""}
                                        <Moment format="DD-MM-YYYY">
                                          {value.end_date}
                                        </Moment>
                                      </td>
                                      <td>{value.name}</td>
                                      <td>{value.email}</td>
                                      <td>  {value.mobile}  </td>
                                      <td>
                                        {""}
                                        <Moment format="DD-MM-YYYY">
                                          {value.createdAt}
                                        </Moment>

                                      </td>
                                      <td>
                                        <div className="d-flex align-items-center">

                                          <Switch
                                            title="Status"
                                            checked={
                                              value.status === "Y" ? true : false}
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
                                                  console.log(value.data);
                                                  setAdvertisementSubscriptionList(value.data);
                                                  setTimeout(() => {
                                                    setIsLoading(false);
                                                  }, 1000);
                                                });
                                            }}
                                          />

                                        <a href="#" title="Delete" className="icDelete" onClick={(e) => {
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
                            <tr><td colSpan="5"></td>
                              <td>  Package Amount&#8377;{advertisementSubscriptionList.reduce((total, value) => total + (parseFloat(value.package_amount) || 0), 0).toLocaleString()}</td>
                              <td>  Actual Amount	&#8377;{advertisementSubscriptionList.reduce((total, value) => total + (parseFloat(value.actual_amount) || 0), 0).toLocaleString()}</td>
                              <td colSpan="8"></td>

                            </tr>
                          </tbody>

                        )}
                      </table>
                      <TablePagination
                        component="div"
                        count={advertisementSubscriptionList.length}
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
export default React.memo(AdvertisementSubscription);  