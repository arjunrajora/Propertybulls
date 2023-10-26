import config from "../../../config/config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import Moment from "react-moment";
import { Collapse, Alert, Switch, TablePagination } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";

const apiUrl = config.API_URL + "seo/ViewAll";
const url = config.API_URL + "seo/";

export default function Seo() {
  const navigate = useNavigate();
  const [seo, setSeo] = useState([]);
  const [multipleID, setmultipleID] = useState("");
  const [lineData, setLineData] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const StaticMessage = localStorage.getItem("staticAdded");
  const [openAlert, setOpenAlert] = useState(false);
  const [staticAdded, setStaticAdded] = useState("");
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
        setSeo(value.data);
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
        setSeo(value.data);
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
                    <h4 className="card-title">SEO PAGES LIST</h4>
                    <br />

                    <div className="heading-elements">
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li>
                          <Link
                            to="/admin/Seo/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="la la-plus"></i> <span>ADD SEO</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <form
                    action="/getFaqlist"
                    method="post"
                    className="form-horizontal"
                  ></form>
                  <div className="card-content collapse show">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="thead-default table-dark">
                          <tr>
                            <th className="t-size1" scope="col">
                              S.No
                            </th>
                            <th className="t-size2" scope="col">
                              Page
                            </th>
                            <th className="t-size3" scope="col">
                              Page Location
                            </th>
                            <th className="t-size4" scope="col">
                              Title
                            </th>
                            <th className="t-size5" scope="col">
                              Description
                            </th>
                            <th className="t-size6" scope="col">
                              Keywords
                            </th>
                            <th className="t-size6" scope="col">
                              Created
                            </th>

                            <th className="t-size7" scope="col">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        {isLoading ? (
                          <tbody>
                            <tr>
                              <td colSpan={8}>
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
                            {seo
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((value, index) => {
                                return (
                                  <tr key={value.id}>
                                    <td>{index + 1}</td>
                                    <td>{value.page}</td>
                                    <td>{value.location}</td>
                                    <td>{value.title}</td>
                                    <td>{value.description}</td>
                                    <td>{value.keyword}</td>
                                    <td>
                                      <Moment format="DD-MM-YYYY">
                                        {value.createdAt}
                                      </Moment>
                                    </td>
                                    <td>
                                    <div className="d-flex align-items-center">
                                      <a className="icEdit" onClick={(e) => {
                                            navigate("/admin/seo/edit", {
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
                        count={seo.length}
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
