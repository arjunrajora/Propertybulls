import config from "../../../config/config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { confirmAlert } from "react-confirm-alert";
import Moment from "react-moment";
import { Collapse, Alert, Switch, TablePagination } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";

const apiUrl = config.API_URL + "loan/viewAll";
const url = config.API_URL + "loan/";
const statusurl = config.API_URL + "loan/status/";

export default function Loan() {
  const navigate = useNavigate();
  const [loan, setLoan] = useState([]);

  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const StaticMessage = localStorage.getItem("staticAdded");
  const [staticAdded, setStaticAdded] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

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
        setLoan(value.data);
        console.log(value.data);
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
    const res = await axios.delete(url + id,options);
    const msg = res.data.message;
    localStorage.setItem("staticAdded", msg);
    fetch(apiUrl,options)
      .then((response) => response.json())
      .then((value) => {
        setLoan(value.data);
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
  const SearchUrl = config.API_URL + "loan/search";
  const HandleSearch = async (event) => {
    event.preventDefault();
    const body = {
      name: name || null,
      email: email || null,
      mobile: mobile || null,
    };
  
    // Check if all three fields are null, if yes, don't hit the API
    if (body.name === null && body.email === null && body.mobile === null) {
      console.log("All fields are empty. No API call needed.");
      return;
    }
    await axios
      .post(SearchUrl, body, options)
      .then((res) => {
        const { data } = res.data;
        console.log("=>>>", res.data);
        setLoan(data);
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
                    <h4 className="card-title">LOAN REQUESTS </h4>
                    <br />

                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                  </div>

                  <form
                    action="/getCategorylist"
                    method="post"
                    className="form-horizontal form-M"
                  >
                    <div className="row">
                      <div className="col-sm-2 col-xs-6">
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

                      <div className="col-sm-2 col-xs-6">
                        <div className="input select employeNmeSerchDv">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setEmail(e.target.value);
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
                            minLength={1}
                            maxLength={10}
                            value={mobile}
                            onChange={(e) => {
                              console.log(e.target.value);
                              setMobile(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-sm-2 col-xs-6">
                        <button
                          type="submit"
                          // onclick="spinner()"
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
                            <th >Name</th>
                            <th scope="col">User Type</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Location</th>
                            <th className="th_width-5">Date of Birth</th>
                            <th className="th_width-4">Type of Loan</th>
                            <th >Gross Fixed Monthly salary</th>
                            <th scope="col">Monthly Take Home salary</th>
                            <th className="th_width-6">Created</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        {isLoading ? (
                          <tbody>
                            <tr>
                              <td colSpan={12}>
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
                            {loan
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((value, index) => {
                                let loantypes;
                                if(value.loantype!=null){
                                  loantypes=value.loantype.name;
                                }else{
                                  loantypes=""
                                }
                                return (
                                  <tr key={value.id}>
                                    <td>{index + 1}</td>
                                    <td>{value.name}</td>
                                    <td>{value.user_type=="0"?"Salaried":"Self Employed"}</td>
                                    <td>{value.email}</td>
                                    <td>{value.mobile}</td>
                                    <td>{value.location}</td>
                                    <td>
                                    <Moment format="DD-MM-YYYY">
                                        {value.dob}
                                      </Moment>
                                    </td>
                                    <td>{loantypes}</td>
                                    <td>{value.gross_salary}</td>
                                    <td>{value.monthly_salary}</td>
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
                                            await fetch(apiUrl,options)
                                              .then((response) =>
                                                response.json()
                                              )
                                              .then((value) => {
                                                setLoan(value.data);
                                              });
                                          }}
                                        />
                                        <a href="#" className="icDelete"onClick={(e) => {
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
                        count={loan.length}
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
