import AdminHeader from "../../../../element/adminHeader";
import AdminFooter from "../../../../element/adminFooter";
import config from "../../../../config/config";
import axios from "axios";

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Collapse, Alert, Switch, TablePagination } from "@mui/material";
import Moment from 'react-moment';
const apiUrl = config.API_URL + "Features/viewAll";
const apiStatus = config.API_URL + "Features/status/";


const url = config.API_URL + "Features/";

export default function PropertyFeature() {
  const StaticMessage = localStorage.getItem('staticAdded');
  const navigate = useNavigate();
  const [Features, setFeatures] = useState([]);
  const [multipleID, setmultipleID] = useState("");
  const [lineData, setLineData] = useState("");
  const [staticAdded, setStaticAdded] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
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
  console.log("Features", Features);
  useEffect(() => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setFeatures(value.data);
      });
  }, [fetch]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const Delete = async (id) => {
    const res = await axios.delete(
      url + id, options
    );
    const msg = res.data.message;
    localStorage.setItem(
      "staticAdded",
      msg
    );
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setFeatures(value.data);
      });
  }
  const deleteconfirmation = (id, message) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: message,
      buttons: [
        {
          label: 'Yes',
          onClick: () => Delete(id)
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        }
      ]
    });
  }
  var types
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
                    <h4 className="card-title">PROPERTY FEATURES LIST </h4>
                    <br />

                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                    <div className="heading-elements">
                      <ul className="list-inline mb-0">
                        <li>
                          <Link
                            to="/admin/propertyfeature/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="la la-plus"></i> ADD PROPERTY FEATURE
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <form
                    action="/getFacinglist"
                    method="post"
                    className="form-horizontal"
                  ></form>


                  <div className="card-content collapse show">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="thead-default table-dark">
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Type</th>
                            <th scope="col">Created</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Features.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((value, index) => {
                            if (value.Type != null) {
                              types = value.Type.type
                            }
                            else {
                              types = "---"
                            }
                            return (
                              <tr key={value.id}>
                                <td>{index + 1}</td>
                                <td>{value.name}</td>
                                <td dangerouslySetInnerHTML={{ __html: value.description.replace(/<\/?[^>]+(>|$)/g, "") }}></td>
                                <td>{types}</td>

                                <td> <Moment format="DD-MM-YYYY" >
                                  {value.createdAt}
                                </Moment></td>

                                {/* <td>
                          <Switch
                                    checked={(value.status==="Y")?true:false}
                            onChange={async (e) => {
                              const body = { status:value.status }
                              var res = await axios.put(apiStatus+value.id,body,options);
                              const msg = res.data.message;
                              localStorage.setItem(
                                "staticAdded",
                                msg
                              );
                            await  fetch(apiUrl,options)
                              .then((response) => response.json())
                              .then((value) => {
                                setFeatures(value.data);
                              });
                            }}
                          />
                                <i
                                    className="la la-edit"
                                    title="Edit"
                                    onClick={(e) => {
                                      navigate("/admin/propertyfeature/edit", {
                                        state: {
                                          lineData: value,
                                          id: value.id,
                                        },
                                      });
                                    }}
                                  ></i>
                                 
                                    <i
                                      className="la la-trash"
                                      title="delete"
                                      onClick={(e)=>{
                                        deleteconfirmation(value.id,'Record deleted succesfully');
                                     }}
                                    ></i>
                              
                                </td> */}
                                <td>
                                  <div className="d-flex align-items-center">
                                    <Switch

                                      checked={(value.status === "Y") ? true : false}
                                      onChange={async (e) => {
                                        const body = { status: value.status }
                                        var res = await axios.put(apiStatus + value.id, body, options);
                                        const msg = res.data.message;
                                        localStorage.setItem(
                                          "staticAdded",
                                          msg
                                        );
                                        await fetch(apiUrl, options)
                                          .then((response) => response.json())
                                          .then((value) => {
                                            setFeatures(value.data);
                                          });
                                      }}
                                    />
                                    <a className="icEdit" onClick={(e) => {
                                      navigate("/admin/propertyFeature/edit", {
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
                      </table>
                      <TablePagination
                        component="div"
                        count={Features.length}
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
