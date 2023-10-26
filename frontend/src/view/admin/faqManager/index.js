import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import config from "../../../config/config";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Collapse, Alert, Switch, TablePagination } from "@mui/material";
import Moment from "react-moment";
import ClipLoader from "react-spinners/ClipLoader";
import { Category } from "@mui/icons-material";

const apiUrl = config.API_URL + "faq/ViewAll";
const apiStatus = config.API_URL + "faq/status/";
const apifeatued = config.API_URL + "faq/featured/";

const url = config.API_URL + "faq/";

export default function Faq() {
  const StaticMessage = localStorage.getItem("staticAdded");
  const navigate = useNavigate();
  const [faq, setFaq] = useState([]);
  const [multipleID, setmultipleID] = useState("");
  const [lineData, setLineData] = useState("");
  const [staticAdded, setStaticAdded] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  let Category ;
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
        setFaq(value.data);
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
        setFaq(value.data);
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
                    <h4 className="card-title">FAQ LIST </h4>
                    <br />

                    <div className="heading-elements">
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li>
                          <Link
                            to="/admin/faq/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="la la-plus"></i> <span>ADD FAQ</span>
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
                            <th >S.No</th>
                            <th className="th_width-1">Faq Category</th>
                            <th >Question</th>
                            <th >Answer</th>
                            <th scope="col">Description</th>
                            <th scope="col">Created</th>
                            <th >Actions</th>
                          </tr>
                        </thead>
                        {isLoading ? (
                          <tbody>
                            <tr>
                              <td colSpan={5}>
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
                            {faq
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((value, index) => {
                                if(value.FaqCatgory!=null){
                                Category  = value.FaqCatgory.name
                                }else{
                                  Category='-'
                                }
                                return (
                                  <tr key={value.id}>
                                    <td>{index + 1}</td>
                                    <td>{Category}</td>
                                    <td>{value.question}</td>
                                    <td>{value.answer}</td>
                                    <td>
                                     <Link to={"/admin/faq/description/"+value.id}>view</Link>
                                      </td>
                                    <td>
                                      {" "}
                                      <Moment format="DD-MMM-YYYY">
                                        {value.createdAt}
                                      </Moment>
                                    </td>

                                    <td>
                                      <div className="d-flex align-items-center">
                                        <Switch title="Status"
                                          checked={
                                            value.status === "Y" ? true : false
                                          }
                                          onChange={async (e) => {
                                            const body = {
                                              status: value.status,
                                            };
                                            var res = await axios.put(
                                              apiStatus + value.id,
                                              body, options
                                            );
                                            const msg = res.data.message;
                                            localStorage.setItem(
                                              "staticAdded",
                                              msg
                                            );
                                            await fetch(apiUrl, options)
                                              .then((response) =>
                                                response.json()
                                              )
                                              .then((value) => {
                                                setFaq(value.data);
                                              });
                                          }}
                                        />

                                        <Switch title="featured"
                                          checked={
                                            value.featured === 0 ? 1 : 0
                                          }
                                          onChange={async (e) => {
                                            const body = {
                                              featured: value.featured,
                                            };
                                            var res = await axios.put(
                                              apifeatued + value.id,
                                              body, options
                                            );
                                            const msg = res.data.message;
                                            localStorage.setItem(
                                              "staticAdded",
                                              msg
                                            );
                                            await fetch(apiUrl, options)
                                              .then((response) =>
                                                response.json()
                                              )
                                              .then((value) => {
                                                setFaq(value.data);
                                              });
                                          }}
                                        />





                                        <a title="Edit"
                                          className="icEdit"
                                          onClick={(e) => {
                                            navigate("/admin/faq/edit", {
                                              state: {
                                                lineData: value,
                                                id: value.id,
                                              },
                                            });
                                          }}
                                        >
                                          <i
                                            className="fas fa-pen"
                                            title="Edit"
                                          ></i>
                                        </a>
                                        <a title="Delete"
                                          className="icDelete"
                                          onClick={(e) => {
                                            deleteconfirmation(
                                              value.id,
                                              "Are you sure you want to Delete ?"
                                            );
                                          }}
                                        >
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
                        count={faq.length}
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
