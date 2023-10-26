import { useState, useEffect } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import axios from "axios";
import config from "../../../config/config";
import { ToastContainer, toast, Zoom } from 'react-toastify';

import { useNavigate, useLocation } from "react-router-dom";
const apI = config.API_URL + "state/viewAll";
const url = config.API_URL + "city/viewAll";
const Locationapi = config.API_URL + "location/viewAll";

export default function AgentAdd() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lineData } = location.state;
  const { id } = location.state;
  const [name, setName] = useState(lineData.name);
  const [lname, setLname] = useState(lineData.lname);
  const [username, setusername] = useState(lineData.username);
  const [companyname, setCompanyname] = useState(lineData.companyname);
  const [mobile, setMobile] = useState(lineData.mobile);
  const [city, setCity] = useState([]);
  const [loc_ids, setLoc_ids] = useState(lineData.loc_ids ?lineData.loc_ids.split(",") : []);
  const [State, setstate] = useState([]);
  const [state_id, setstate_id] = useState("99");
  const [city_id, setcity_id] = useState("27");
  const [Location, setLocation] = useState([]);
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
    fetch(Locationapi, options)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);
      });
  }, [fetch]);
  const AgentUpdate = async (event) => {
    event.preventDefault();
    const selectedLocationsString = loc_ids.join(',');
    const body = {
      name: name,
      lname: lname,
      username: username,
      companyname: companyname,
      mobile: mobile,
      loc_ids: selectedLocationsString,
      state_id: state_id,
      city_id: city_id,
    };

    const apiUrl = config.API_URL + "agent/"+id;
    await axios
      .put(apiUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        navigate("/admin/role", { replace: true });
        console.log("=>>", res);
      })
      .catch((err) => {
        let   message = err.response.data.message
        toast.error(message, {
          position: "top-right",
          autoClose: 1000,
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


  };
  var states;
  var EXTERIOR;

  return (
    <div>
      <AdminHeader />
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-wrapper-before"></div>
          <div className="content-header row"></div>
          <ToastContainer />


          <div className="content-body">
            {/* Table head options start  */}
            <div className="row">
              <div className="col-12">
                <div className="card">

                  <div className="card-content collapse show">
                    <div className="card-body">
                      <form
                        onSubmit={AgentUpdate}
                        className="form-horizontal needs-validation"
                        
                      >
                        <div className="form-body">
                          <h2 className="form-section">
                            AGENT EDIT FROM
                          </h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="name">CompanyName</label>
                                <input
                                  type="text"
                                  id="CompanyName"
                                  className="form-control"
                                  name="name"
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
                                <label htmlFor="name">FirstName</label>
                                <input
                                  type="text"
                                  id="FirstName"
                                  className="form-control"
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
                                <input
                                minLength="1" maxLength="10"
                                  type="text"
                                  id="mobile"
                                  className="form-control email"
                                  mobile="mobile"
                                  required
                                  value={mobile}
                                  onChange={(e) => {
                                    const input = e.target.value;
                                    const regex = /^[0-9]{0,10}$/; // Regex to match only 10-digit numbers
                                    if (regex.test(input)) {
                                      setMobile(input);
                                    } else {
                                      alert('Please enter only 10 numeric characters!');
                                    }
                                  
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
                                <label htmlFor="loc_ids">select State</label>
                                <div className="input select">
                                  <select
                                    name="role_id"
                                    className="form-control"
                                    value={state_id}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setstate_id(e.target.value);
                                    }}
                                  >
                                    <option>select state</option>
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
                                <label htmlFor="loc_ids">select City</label>
                                <div className="input select">
                                  <select
                                    name="role_id"
                                    className="form-control"
                                    value={city_id}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setcity_id(e.target.value);
                                      console.log(e.target.value);
                                    }}
                                  >
                                    <option>select City</option>
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
                              {/* <div className="col-sm-6 col-md-4 col-5">
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
                                    {Location.map((value) => {
                                      return <option key={value.id} value={value.id}>{value.name}</option>;
                                    })}
                                  </select>
                                </div>
                              </div> */}
                              
                                <div className="col-sm-6 col-md-4 col-5">
                                                        <div className="input select">
                                                        <label htmlFor="loc_ids">Working Localities</label>
                                                            <select required
                                                                name="data[User][location][]"
                                                                className="form-control"   
                                                                   multiple={true}
                                                                id="UserLocation"
                                                                value={loc_ids}
                                                                onChange={(e) => {
                                                                    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                                                                    setLoc_ids(selectedValues);
                                                                }}
                                                            >
                                                                {Location.map((value, index) => {
                                                                   
                                                                    return (
                                                                        <option key={value.id} value={value.id}>
                                                                            {value.name}
                                                                        </option>
                                                                    );
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
