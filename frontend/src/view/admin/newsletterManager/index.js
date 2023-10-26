import config from "../../../config/config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import Moment from "react-moment";
import FormControlLabel from "@mui/material/FormControlLabel";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Collapse,
  Alert,
  Switch,
  TablePagination,
  Radio,
  RadioGroup,
} from "@mui/material";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Height } from "@mui/icons-material";

const apiUrl = config.API_URL + "letter/viewAll";
const url = config.API_URL + "letter/";
const subscribeUrl = config.API_URL + "letter/SubscribeView";
const Agent = config.API_URL + "agent/viewAll";
const viewAllBuilder = config.API_URL + "builder/viewAll";


export default function Newsletter() {
  const navigate = useNavigate();
  const [letter, setLetter] = useState([]);
  const [subscribe, setSubscribe] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const StaticMessage = localStorage.getItem("staticAdded");
  const [staticAdded, setStaticAdded] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [agent, setAgent] = useState([]);
  const [builder, setBuilder] = useState([]);

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
        setLetter(value.data);
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

  const Delete = async (id) => {
    const res = await axios.delete(url + id, options);
    const msg = res.data.message;
    localStorage.setItem("staticAdded", msg);
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setLetter(value.data);
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



  const viewAgent = async () => {
    const res = await axios.get(Agent, options)
    console.log(res.data.data);
    setAgent(res.data.data)
  }

  const viewBuilders = async () => {
    const res = await axios.get(viewAllBuilder, options)
    console.log("builder", res.data.data);
    setBuilder(res.data.data)
  }

  const SubscribeviewAll = async () => {
    console.log(options);
    const res = await axios.get(subscribeUrl, options)
    console.log("sus", res.data.data);
    setSubscribe(res.data.data)
  }



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
                    <h4 className="card-title"> NEWS LETTER </h4>
                    <br />

                    <div className="heading-elements">
                      <ul className="list-inline mb-0 d-flex align-items-center">
                        <li>
                          <Link
                            to="/admin/newsletter/add"
                            type="button"
                            className="btn btn-min-width btn-glow customerAddBtn add-btn addAgentButton"
                          >
                            <i className="la la-plus"></i>
                            <span>ADD NEWS LETTER</span>
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
                            <th scope="col">Preview</th>
                            <th scope="col">Select User Type</th>
                            <th scope="col">Created</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>

                        {isLoading ? (
                          <tbody>
                            <tr>
                              <td colSpan={6}>
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

                            {letter
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((value, index) => {
                                return (
                                  <tr key={value.id}>
                                    <td>{index + 1}</td>
                                    <td>{value.title}</td>
                                    {/* <td>
                                      <Link to="/admin/newsletter/preview">
                                        Preview
                                      </Link>{" "}
                                    </td> */}
                                    <td>
                                      <Link to={"/admin/newsletter/preview/" + value.id
                                      } target="_blank">
                                        Preview
                                      </Link>
                                      <br />

                                    </td>



                                    <td>
                                      <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        defaultValue=" "
                                      >

                                        <FormControlLabel value="Individuals" control={<Radio />} label="Individuals" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={SubscribeviewAll} />
                                        <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                          <div className="modal-dialog modal-dialog-scrollable">
                                            <div className="modal-content">
                                              <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel"></h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
                                              </div>

                                              <div className="container-fluid stikcyscrollable" style={{ height: "550px", overflowY: "auto" }}>
                                                <div className="row">
                                                  <h3>Select Individuals to Send Newsletter</h3>
                                                  {subscribe.map((value) => {
                                                    return (

                                                      <div className="col-md-6" key={value.id}>

                                                        <div className="modal-body">
                                                          <input type="checkbox" onClick={(e) => {
                                                            console.log(value.id)
                                                          }} />
                                                          {value.username}
                                                        </div>


                                                      </div>



                                                    )
                                                  })}
                                                </div>
                                              </div>
                                              <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Submit</button>

                                              </div>
                                            </div>

                                          </div>
                                        </div>




                                        <FormControlLabel value="Agents" control={<Radio />} label="Agents" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={viewAgent} />
                                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                          <div className=" modal-dialog modal-dialog-scrollable">
                                            <div className="modal-content">
                                              <div class="modal-header">
                                                <h5 class="modal-title" id="staticBackdropLabel"></h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
                                              </div>
                                              <div className="modalbody">


                                                <div className="container-fluid stikcyscrollable" style={{ height: "550px", overflowY: "auto" }}>
                                                  <div className="row">
                                                    <h4>Select Agent to Send Newsletter</h4>
                                                    {agent.map((value) => {
                                                      return (

                                                        <div className="col-md-6" key={value.id}>

                                                          <div className="modal-body">
                                                            <input type="checkbox" onClick={(e) => {
                                                              console.log(value.id)
                                                            }} />
                                                            {value.username}
                                                          </div>


                                                        </div>



                                                      )
                                                    })}
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Submit</button>

                                              </div>
                                            </div>

                                          </div>
                                        </div>





                                        <FormControlLabel value="Builder" control={<Radio />} label="Builder" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={viewBuilders} />

                                        <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                          <div className="modal-dialog modal-dialog-scrollable">
                                            <div className="modal-content">
                                              <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel"></h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
                                              </div>

                                              <div className="container-fluid stikcyscrollable" style={{ height: "550px", overflowY: "auto" }}>
                                                <div className="row">
                                                  <h4>Select Builder to Send Newsletter</h4>
                                                  {builder.map((value) => {
                                                    return (

                                                      <div className="col-md-6" key={value.id}>

                                                        <div className="modal-body">
                                                          <input type="checkbox" onClick={(e) => {
                                                            console.log(value.id)
                                                          }} />
                                                          {value.username}
                                                        </div>


                                                      </div>



                                                    )
                                                  })}
                                                </div>
                                              </div>
                                              <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Submit</button>

                                              </div>
                                            </div>

                                          </div>
                                        </div>


                                        <FormControlLabel value="Subscriber" control={<Radio />} label="Subscriber" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onClick={SubscribeviewAll} />
                                        <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                          <div className="modal-dialog modal-dialog-scrollable">
                                            <div className="modal-content">
                                              <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel"></h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">X</button>
                                              </div>

                                              <div className="container-fluid stikcyscrollable" style={{ height: "550px", overflowY: "auto" }}>
                                                <div className="row">
                                                  <h4>Select Subscriber to Send Newsletter</h4>
                                                  {subscribe.map((value) => {
                                                    return (

                                                      <div className="col-md-6" key={value.id}>

                                                        <div className="modal-body">
                                                          <input type="checkbox" onClick={(e) => {
                                                            console.log(value.id)
                                                          }} />
                                                          {value.username}
                                                        </div>


                                                      </div>



                                                    )
                                                  })}
                                                </div>
                                              </div>
                                              <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Submit</button>

                                              </div>
                                            </div>

                                          </div>
                                        </div>

                                      </RadioGroup>
                                    </td>
                                    <td>
                                      {" "}
                                      <Moment format="DD-MM-YYYY">
                                        {value.createdAt}
                                      </Moment>
                                    </td>
                                    <td>
                                      {" "}

                                      <div className="d-flex align-items-center">
                                        <a className="icEdit" onClick={(e) => {
                                          navigate("/admin/newsletter/edit", {
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



                                        <Link>
                                          <div className="icDelete" onClick={(e) => {
                                            deleteconfirmation(
                                              value.id,
                                              "Are you sure you want to Delete ?"
                                            );
                                          }}>
                                            <i className="fas fa-trash-alt" title="delete"></i>
                                          </div>
                                        </Link>

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
                        count={letter.length}
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
