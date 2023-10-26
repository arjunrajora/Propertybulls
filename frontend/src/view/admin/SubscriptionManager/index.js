import config from "../../../config/config";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import Moment from "react-moment";
import { Collapse, Alert, TablePagination, Tooltip, IconButton } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { CSVLink } from "react-csv";
import moment from 'moment';


const apiUrl = config.API_URL + "subscription/Subscriptions/View";
const PackageName = config.API_URL + "subscription/viewAll";
const Roles = config.API_URL + "subscription/roles/View"

export default function Packageview() {
  const [subscription, setSubscription] = useState([]);
  const [packagename, setPackagename] = useState([]);
  const [role, setRole] = useState([]);
  const StaticMessage = localStorage.getItem("staticAdded");
  const [staticAdded, setStaticAdded] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [pkg_startdate, setPkg_startdate] = useState("");
  const [role_id, setRole_id] = useState("");
  const [user_id, setUser_id] = useState("");
  const [package_id, setPackage_id] = useState("");
  const [name, setName] = useState("");
  const [package_name, setPackage_name] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [packagestatus, setPackagestatus] = useState("");
  const [pkg_expiredate, setPkg_expiredate] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);




  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1); // Calculate yesterday's date







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


    fetch(PackageName, options)
      .then((response) => response.json())
      .then((value) => {
        setPackagename(value.data);
      });
    // view Role
    fetch(Roles, options)
      .then((response) => response.json())
      .then((value) => {
        // console.log("value.data", value.data)
        setRole(value.data);
      })
  }, []);

  // console.log("setSubscription", subscription)

  // Data Searching
  const SearchUrl = config.API_URL + "subscription/search";
  const HandleSearch = async (event) => {
    event.preventDefault();
    // Check if any of the parameters is provided, if not, keep the previous 'data' value (empty array).
    if (!name && !username && !mobile && !package_name && !packagestatus && !role_id && !pkg_startdate && !pkg_expiredate) {
      return;
    }
    const body = {
      role_id: role_id,
      user_id: user_id,
      package_id: package_id,
      name: name,
      package_name: package_name,
      username: username,
      mobile: mobile,
      packagestatus: packagestatus,
      pkg_startdate: pkg_startdate,
      pkg_expiredate: pkg_expiredate,

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


  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Export to Excel 

  const headers = [
    { label: "ID", key: "id" },
    { label: "Package Purchased by", key: "Role" },
    { label: "Name", key: "userName" },
    { label: "Email", key: "userEmail" },
    { label: "Mobile", key: "userMobile" },
    { label: "Package type", key: "Packagetype" },
    { label: "Package Cost", key: "PackageCost" },
    { label: "package validity", key: "packagevalidity" },
    { label: "Package StartDate", key: "createdAt" },
    { label: "Package ExpiryDate", key: "pkg_expiredate" },
    { label: "Package Status", key: "PackageStatus" },




  ];

  const data = subscription.map((item) => {
    const pkgExpireDate = new Date(item.pkg_expiredate);
    const currentDate = new Date();
    const isExpired = currentDate >= pkgExpireDate;

    if (item.Role != null) {
      RoleName = item.Role.title
    } else {
      RoleName = "----"
    }
    if (item.User != null) {
      UserName = item.User.name;
    } else {
      UserName = "--";
    }
    if (item.User != null) {
      UserEmail = item.User.username;
    }
    else {
      UserEmail = "---"
    } if (item.User != null) {
      UserMobile = item.User.mobile;
    }
    else {
      UserMobile = "---"
    }
    if (item.Subscription != null) {
      SubscriptionName = item.Subscription.package_name;
    } else {
      SubscriptionName = "--";
    } if (item.validity != null) {
      ValidityDays = item.validity;
    } else {
      ValidityDays = "--";
    } if (item.amount != null) {
      Amount = item.amount;
    } else {
      Amount = "--";
    }
    // 

    return {
      id: item.id + 1,
      Role: RoleName,
      userName: UserName,
      userEmail: UserEmail,
      userMobile: UserMobile,
      Packagetype: SubscriptionName,
      packagevalidity: ValidityDays,
      PackageCost: Amount,
      createdAt: moment(item.createdAt).format("DD-MM-YYYY"), // Format createdAt date
      pkg_expiredate: moment(item.pkg_expiredate).format("DD-MM-YYYY"), // Format pkg_expiredate date
      PackageStatus: isExpired ? "Expired" : "Active", // Add this line to include Package Status

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

  //  Reset all fild
  const handleReset = () => {
    setRole_id('');
    setName('');
    setUsername('');
    setMobile('');
    setPackage_name('');
    setPackagestatus('');
    setPkg_startdate(null);
    setPkg_expiredate(null);


    // Fetch data from the API when Reset button is clicked
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setSubscription(value.data);
      });
  };














  var UserName, SubscriptionName, ValidityDays, Amount, UserEmail, UserMobile, RoleName, Discount
  let totalAmount = 0;

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
                    <h4 className="card-title">SUBSCRIPTION MANAGER</h4>
                    <br />

                    <div className="heading-elements">
                      <ul className="list-inline mb-0 d-flex align-items-center">

                        <li>
                          <Tooltip title="Excel List" onClick={onExportLinkPress}>
                            <IconButton>
                              <CSVLink
                                headers={headers}
                                data={data}
                                filename={"Subscriptions.csv"}
                                className="btn excelButton"
                                target="_blank"
                              >
                                <i className="fas fa-file-excel"></i>
                              </CSVLink>
                            </IconButton>
                          </Tooltip>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <form className="form-horizontal">
                    <div className="row" style={{ rowGap: "10px" }}>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <select name="fname" className="form-control"
                            value={role_id}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setRole_id(e.target.value);
                            }}  >
                            <option value="">-Package Purchased by-</option>
                            {role.map((value) => {
                              return (
                                <option key={value.id} value={value.id}>
                                  {value.title}
                                </option>
                              );
                            })}

                          </select>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="UserName"
                            name="name"
                            value={name}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setName(e.target.value);
                            }}
                          />
                        </div>
                      </div>


                      <div className="col-sm-2 col-xs-6">
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



                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Mobile"
                            name="mobile"
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
                            value={package_name}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setPackage_name(e.target.value);
                            }}  >
                            <option value="">--Package Type--</option>
                            <option value="gold" >Gold</option>
                            <option value="silver" >Silver</option>
                            <option value="titanium" >Titanium</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <select name="fname" className="form-control"
                            value={packagestatus}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setPackagestatus(e.target.value);
                            }}
                          >
                            <option value="">--Package Status--</option>
                            <option value="1">Active</option>
                            <option value="2">Expired</option>



                          </select>
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <DatePicker
                            className="form-control"
                            placeholderText={"Start Date"}
                            maxDate={today}
                            selected={pkg_startdate}
                            onChange={(date) => {
                              console.log("<<Date>>", date);
                              setPkg_startdate(date);
                            }}
                          />
                        </div>
                      </div>



                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <DatePicker
                            className="form-control"
                            placeholderText={"End date"}
                            minDate={yesterday} // Set the minimum date to yesterday
                            maxDate={today} // Set the maximum date to today
                            selected={pkg_expiredate}
                            onChange={(date) => {
                              console.log(date);
                              setPkg_expiredate(date);
                            }}
                          />
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

                      <div className="col-sm-1 col-xs-6">
                        <Button variant="contained" color="error"
                          onClick={handleReset} >
                          Reset
                        </Button>
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
                            <th scope="col"> Purchased By</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col"> Type</th>
                            <th scope="col"> Cost</th>
                            <th scope="col"> Validity</th>
                            <th scope="col"> StartDate</th>
                            <th scope="col"> ExpiryDate</th>
                            <th scope="col"> Status</th>


                          </tr>
                        </thead>

                        <tbody>
                          {subscription.map((value, index) => {
                            if (value.User != null) {
                              UserName = value.User.name;
                            } else {
                              UserName = "--";
                            }
                            if (value.User != null) {
                              UserEmail = value.User.username;
                            } else {
                              UserEmail = "--";
                            } if (value.User != null) {
                              UserMobile = value.User.mobile;
                            } else {
                              UserMobile = "--";
                            } if (value.Role != null) {
                              RoleName = value.Role.title
                            } else {
                              RoleName = "----"
                            }


                            const pkgExpireDate = new Date(value.pkg_expiredate);
                            const currentDate = new Date(); // Current date and time

                            // Compare pkgExpireDate with currentDate
                            const isExpired = currentDate >= pkgExpireDate;
                            // console.log("pkgExpireDate", isExpired);



                            if (value.Subscription != null) {
                              SubscriptionName = value.Subscription.package_name;
                            } else {
                              SubscriptionName = "--";
                            } if (value.validity != null) {
                              ValidityDays = value.validity;
                            } else {
                              ValidityDays = "--";
                            } if (value.amount != null) {
                              Amount = value.amount;
                            } else {
                              Amount = "--";
                            }



                            return (
                              <tr key={value.id}>
                                <td>{index + 1}</td>
                                <td>{RoleName}</td>
                                <td>{UserName}</td>
                                <td>{UserEmail}</td>
                                <td>{UserMobile}</td>
                                <td>{SubscriptionName}</td>
                                <td>&#8377; {Amount}</td>
                                <td>{ValidityDays} Days</td>
                                <td>
                                  <Moment format="DD-MM-YYYY">
                                    {value.createdAt}
                                  </Moment>
                                </td>
                                <td>
                                  <Moment format="DD-MM-YYYY">
                                    {value.pkg_expiredate}
                                  </Moment>
                                </td>
                                <td>
                                  <Stack >
                                    {isExpired ? (
                                      <h6 variant="contained" color="error" style={{ background: "red", color: "white", padding: "7px 4px", textAlign: "center", borderRadius: "3px", fontSize: "13px" }}>
                                        Expired
                                      </h6>



                                    ) : (
                                      <h6 variant="contained" color="error" style={{ background: "green", color: "white", padding: "7px 4px", textAlign: "center", borderRadius: "3px", fontSize: "13px" }}>
                                        Active
                                      </h6>
                                    )}
                                  </Stack>

                                </td>
                              </tr>
                            )
                          })}
                          <tr>
                            <td colSpan="6">Total Amount:</td>
                            <td>&#8377; {subscription.reduce((total, value) => total + (parseFloat(value.amount) || 0), 0).toLocaleString()}</td>
                            <td colSpan="2"></td>
                          </tr>
                        </tbody>
                      </table>
                      <TablePagination
                        component="div"
                        count={subscription.length}
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
