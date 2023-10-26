import { useState, useEffect } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import axios from "axios";
import { ToastContainer, toast, Zoom } from 'react-toastify';

import config from "../../../config/config";
import { useNavigate } from "react-router-dom";
const apI = config.API_URL + "state/viewAll"
const url = config.API_URL + "city/viewAll"
const Location = config.API_URL + "location/viewAll"

export default function AgentAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [lname, setLname] = useState("")
  const [username, setusername] = useState("")
  const [companyname, setCompanyname] = useState("")
  const [mobile, setMobile] = useState("")
  const [city, setCity] = useState([])
  const [loc_ids, setLoc_ids] = useState("");
  const [State, setstate] = useState([])
  const [state_id, setstate_id] = useState("99");
  const [city_id, setcity_id] = useState("27");
  const [role_id, setRole] = useState("3");
  const [location, setLocation] = useState([])

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  useEffect(() => {
    fetch(apI, options)
      .then((response) => response.json())
      .then((value) => {
        setstate(value.data);
      });
    fetch(url, options)
      .then((response) => response.json())
      .then((value) => {
        setCity(value.data);
      });
    fetch(Location, options)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);
      });
  }, [fetch]);
  var message;

  const AgentAdd = async (event) => {
    event.preventDefault();
    const body = {
      name: name,
      lname: lname,
      username: username,
      companyname: companyname,
      mobile: mobile,
      loc_ids: loc_ids,
      state_id: state_id,
      city_id: city_id,
      role_id: role_id
    }
    const apiUrl = config.API_URL + 'agent/add';
    await axios.post(apiUrl, body, options)
      .then((res) => {
        const { data, statusCode } = res.data;
        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );
        navigate('/admin/role', { replace: true });
        console.log("=>>", res);
      }).catch((err) => {
        navigate("/admin/role/add", { replace: true })
        message = err.response.data.message
        toast.error(message, {
          position: "top-right",
          autoClose: 2000,
          type: "error",
          transition: Zoom,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

        })
      })
  }
  var states;
  var EXTERIOR
  return (
    <div>
      <AdminHeader />


      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-wrapper-before"></div>
          <div className="content-header row"></div>
          <div className="content-body">
            <ToastContainer />

            {/* Table head options start  */}
            <div className="row">
              <div className="col-12">
                <div className="card">

                  <div className="card-content collapse show">
                    <div className="card-body">
                      <form
                        onSubmit={AgentAdd}
                        className="form-horizontal needs-validation"

                      >
                        <div className="form-body">
                          <h2 className="form-section">
                            Agent Create Form      </h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="name">Company Name</label>
                                <input
                                  type="text"
                                  id="companyname"
                                  className="form-control email"
                                  name="companyname"
                                  value={companyname}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setCompanyname(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="name">Name</label>
                                <input
                                  type="text"
                                  id="name"
                                  className="form-control "
                                  name="name"
                                  required
                                  value={name}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setName(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="LastName">LastName</label>
                                <input
                                  type="text"
                                  id="LastName"
                                  className="form-control"
                                  name="name"
                                  required
                                  value={lname}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setLname(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  id="email"
                                  className="form-control email"
                                  name="email"
                                  required
                                  value={username}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setusername(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                                <div
                                  className="emailalert"
                                  style={{ color: "red" }}
                                ></div>
                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="mobile">Mobile</label>
                                <input type="text"
                                  className="form-control"
                                  placeholder="Mobile No."
                                  required
                                  minLength="10"
                                  maxLength="10"
                                  value={mobile}
                                  onChange={(e) => {
                                    const input = e.target.value;
                                    const regex = /^[0-9]{0,10}$/; // Regex to match only 10-digit numbers
                                    if (regex.test(input)) {
                                      setMobile(input);
                                    } else {
                                      alert('Please enter only 10 numeric characters!');
                                    }

                                  }} />

                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                                <div
                                  className="emailalert"
                                  style={{ color: "red" }}
                                ></div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="name">Select State</label>
                                <div className="input select">
                                  <select
                                    required
                                    name="role_id"
                                    className="form-control"
                                    value={state_id}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setstate_id(e.target.value);
                                    }}
                                  >
                                    <option>Select State</option>
                                    {State.map((value) => {
                                      if (value.id == 99 && value.status == 'Y') {
                                        states = value.name
                                      }
                                      else {
                                        return null
                                      }
                                      return <option key={value.id} value={value.id}>{states}</option>;
                                    })}
                                  </select>
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="loc_ids">Select City</label>
                                <div className="input select">
                                  <select
                                    required
                                    name="role_id"
                                    className="form-control"
                                    value={city_id}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setcity_id(e.target.value);
                                      console.log(e.target.value);
                                    }}
                                  >
                                    <option>Select City</option>
                                    {city.map((value) => {
                                      if (value.id == 27 && value.status == 'Y') {
                                        EXTERIOR = value.name
                                      }
                                      else {
                                        return null
                                      }
                                      return <option key={value.id} value={value.id}>{EXTERIOR}</option>;
                                    })}
                                  </select>
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="loc_ids">Working Localities</label>
                                <div className="input select">
                                  <select
                                    required
                                    name="role_id"
                                    className="form-control"
                                    value={loc_ids}

                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setLoc_ids(e.target.value);
                                    }}
                                  >
                                    <option value="">Working Localities</option>
                                    {location.map((value) => {
                                      return <option key={value.id} value={value.id}>{value.name}</option>;
                                    })}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>





                          <div className="form-actions">

                            <button
                              type="submit"
                              className="btn btn-primary pull-right"
                            >
                              <i className="la la-check-square-o"></i> Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Table head options end  */}
          </div>
        </div>
      </div>

      <AdminFooter />
    </div>
  );
}
