import config from "../../../config/config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { Collapse, Alert, Switch, TablePagination } from "@mui/material";
import { getImageName } from "../../../utils/image";
import Moment from "react-moment";
import { confirmAlert } from "react-confirm-alert";
import ClipLoader from "react-spinners/ClipLoader";

const apiUrl = config.API_URL + "static/viewAll";
const url = config.API_URL + "static/";
const statusurl = config.API_URL + "static/status/";

export default function StaticPage() {
  const navigate = useNavigate();
  const [staticPage, setStaticPage] = useState([]);
  const [multipleID, setmultipleID] = useState("");
  // const [lineData, setLineData] = useState("");
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
        setStaticPage(value.data);
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
    const res = await axios.delete(url + id, options);
    const msg = res.data.message;
    localStorage.setItem("staticAdded", msg);
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setStaticPage(value.data);
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
                    <h4 className="card-title">STATIC PAGES LIST </h4>
                    <br />

                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                    <div className="heading-elements">
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li>
                          <Link
                            to="/admin/static/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="la la-plus"></i>{" "}
                            <span>ADD STATIC PAGE</span>
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
                            <th scope="col">Tittle</th>
                            <th scope="col">Image</th>
                            <th scope="col">Content</th>
                            <th scope="col">Created</th>

                            <th className="th_width-4" scope="col">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        {isLoading ? (
                          <tbody>
                            <tr>
                              <td colSpan={6}>
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
                            {staticPage
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((value, index) => {
                                return (
                                  <tr key={value.id}>
                                    <td>{index + 1}</td>
                                    <td>{value.title}</td>
                                    {/* <td>{value.image}</td> */}
                                    <td>
                                      {
                                        <img alt="Image" src={config.Image_URL + value.image} height="100px" width="100px" />

                                      }
                                    </td>


                                    <td dangerouslySetInnerHTML={{ __html: value.content.replace(/<p>/g, '').replace(/<\/p>/g, '') }}></td>
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
                                            const body = { status: value.status };
                                            var res = await axios.put(
                                              statusurl + value.id,
                                              body, options
                                            );
                                            const msg = res.data.message;
                                            localStorage.setItem(
                                              "staticAdded",
                                              msg
                                            );
                                            await fetch(apiUrl, options)
                                              .then((response) => response.json())
                                              .then((value) => {
                                                setStaticPage(value.data);
                                              });
                                          }}
                                        />
                                        <a className="icEdit" onClick={(e) => {
                                          navigate("/admin/static/edit", {
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
                        count={staticPage.length}
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
