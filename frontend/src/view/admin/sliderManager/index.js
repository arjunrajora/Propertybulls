import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import config from "../../../config/config";
import axios from "axios";
import Moment from "react-moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ClipLoader from "react-spinners/ClipLoader";
// import { getImageName } from '../../../utils/image';

import {
  Collapse,
  Alert,
  Switch,
  TablePagination,
} from "@mui/material";
// import { getImageName } from "../../../utils/image";

export default function Slider() {
  const navigate = useNavigate();
  const [slider, SetSlider] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [openAlert, setOpenAlert] = useState(false);
  const [staticAdded, setStaticAdded] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const apI = config.API_URL + "slider/ViewAll";
  const apiStatus = config.API_URL + "slider/status/";
  const StaticMessage = localStorage.getItem("staticAdded");
  const url = config.API_URL + "slider/";

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
    fetch(apI, options)
      .then((response) => response.json())
      .then((value) => {
        SetSlider(value.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, []);

  console.log(slider);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const Delete = async (id) => {
    const res = await axios.delete(url + id);
    const msg = res.data.message;
    localStorage.setItem("staticAdded", msg);
    fetch(apI)
      .then((response) => response.json())
      .then((value) => {
        SetSlider(value.data);
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
                    <h4 className="card-title"> SLIDERS LIST </h4>
                    <br />
                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                    <div className="heading-elements">
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li>
                          <Link
                            to="/admin/slider/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="la la-plus"></i>
                            <span>ADD SLIDERS</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <form
                    action="/getSliderlist"
                    method="post"
                    className="form-horizontal"
                  ></form>

                  <div className="card-content collapse show">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="thead-default table-dark">
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Title</th>
                            <th scope="col">Image</th>
                            <th scope="col">Created</th>
                            <th scope="col" className="th_width-4">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        {isLoading ? (
                          <tbody>
                            <tr>
                              <td colSpan={5}>
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
                            {slider
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((value, index) => {
                                return (
                                  <tr key={value.id}>
                                    <td>{index + 1}</td>
                                    <td>{value.title}</td>
                                    <td>
                                      {
                                        <img alt="Image" src={config.Image_URL+value.name}  height="100px" width="100px"/>
                                      }
                                    </td>
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
                                              apiStatus + value.id,
                                              body
                                            );
                                            const msg = res.data.message;
                                            localStorage.setItem(
                                              "staticAdded",
                                              msg
                                            );
                                            await fetch(apI)
                                              .then((response) =>
                                                response.json()
                                              )
                                              .then((value) => {
                                                SetSlider(value.data);
                                              });
                                          }}
                                        />
                                        <a className="icEdit"  onClick={(e) => {
                                              navigate("/admin/slider/edit", {
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
                        count={slider.length}
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
