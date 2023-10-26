import config from "../../../config/config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Collapse, Alert, Switch, TablePagination } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import Moment from "react-moment";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";

const apiUrl = config.API_URL + "email/viewAll";
const apiStatus = config.API_URL + "email/status/";
const url = config.API_URL + "email/";


export default function EmailTemplate() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const StaticMessage = localStorage.getItem("staticAdded");
  const [openAlert, setOpenAlert] = useState(false);
  const [staticAdded, setStaticAdded] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // OrderBy Data
  // Email.reverse();

// Alert Messages For Add, Edit, Delete and Status
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
          setEmail(value.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        });
  }, []);

 // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                  <h4 className="card-title">TEMPLATE LIST</h4>
                    <br />

                    <div className="heading-elements">
                    <ul className="list-inline mb-0 d-flex align-items-center">
                        <li>
                          <Link
                            to="/admin/emailTemplate/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="la la-plus"></i> <span>ADD TEMPLATE</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="card-content collapse show">
                    <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-default table-dark">
                          <tr>
                            <th scope="col">S.No</th> 
                            <th scope="col">Title</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Description/Format</th>
                            <th scope="col">Type</th>
                            <th scope="col">Created</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        {isLoading ? (
                          <tbody>
                          <tr>
                            <td colSpan={7}>
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
                        {Email.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, index) => {
                            return (
                              <tr key={value.id}>
                             <td>{index + 1}</td>
                            <td>{value.title}</td>
                            <td>{value.subject}</td>
                            <td>
                                  <Link to={"/admin/emailTemplate/descriptions/"+value.id}>
                                    View 
                                  </Link>
                                </td>
                              <td>Newsletter</td>
                              <td>
                                    <Moment format="DD-MMM-YYYY">
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
                                            apiStatus + value.id,
                                            body,options
                                          );
                                          const msg = res.data.message;
                                          localStorage.setItem(
                                            "staticAdded",
                                            msg
                                          );
                                          fetch(apiUrl, options)
                                            .then((response) => response.json())
                                            .then((value) => {
                                              setEmail(value.data);
                                            });
                                        }}
                                      />

                                      <a className="icEdit" onClick={(e) => {
                                            navigate("/admin/emailTemplate/edit", {
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
                            count={Email.length}
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
