import { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { ToastContainer, toast, Zoom } from 'react-toastify';

// var options = [];
export default function BuilderAdd() {
  const navigate = useNavigate();
  const [location, setLocation] = useState([]);
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");
  const [mobile, setMobile] = useState("");
  const [occu, setOccu] = useState("");
  const [description, setDescription] = useState("");
  const [loc_ids, setLoc_ids] = useState("");
  const [image, setImage] = useState("");
  const [role_id, setRole_id] = useState("4");

  const apiUrl = config.API_URL + "location/viewAll";
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      'Content-Type': 'multipart/form-data',
    },
  };
  useEffect(() => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);
        // options.push(value.data);
        console.log("obj=>>", location);
      });
  }, [fetch]);
  let message
  const AddBuilder = async (event) => {
    event.preventDefault();
    const body = {
      name: name,
      lname: lname,
      username: username,
      password: password,
      cpass: cpass,
      mobile: mobile,
      occu: occu,
      description: description,
      loc_ids: loc_ids,
      image: image,
      role_id: role_id
    };
    if (password == cpass) {
      const apiUrl = config.API_URL + "builder/add";
      await axios
        .post(apiUrl, body, options)
        .then((res) => {
          const msg = res.data.message;
          localStorage.setItem("staticAdded", msg);
          navigate("/admin/builder", { replace: true });
          console.log("=>>", res);
        })
        .catch((err) => {
          message = err.response.data.message
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
    } else {
      toast.error(message = "password invalid", {
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
    }

  };




  return (
    <div>
      <AdminHeader />

      <div className="app-content content">
        <div className="content-wrapper">

          <div className="content-wrapper-before"></div>
          <div className="content-header row"></div>
          <ToastContainer />

          <div className="content-body">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <form
                        action="/add"
                        method="post"
                        className="form-horizontal needs-validation"
                        onSubmit={AddBuilder}
                      >
                        <div className="form-body">
                          <h2 className="form-section">BUILDER CREATE FORM</h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="Name">First Name</label>
                                <input
                                  className="form-control"
                                  type="text"
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
                                <label htmlFor="Name">Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
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
                                  type="Email"
                                  className="form-control"
                                  required
                                  value={username}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setUsername(e.target.value);
                                  }}

                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="password">Password</label>
                                <input
                                  minLength="6"
                                  maxLength="15"
                                  type="Password"
                                  className="form-control"
                                  required
                                  value={password}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setPassword(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="password">Confirm Password</label>
                                <input
                                  minLength="6"
                                  maxLength="15"
                                  type="Password"
                                  className="form-control"
                                  required
                                  value={cpass}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setCpass(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="mobile">Mobile</label>
                                <input required
                                  type="text"
                                  minLength="10"
                                  maxLength="10"
                                  className="form-control"

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
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="occupation">Occupation</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  required
                                  value={occu}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setOccu(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>


                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="loc_ids">Working Localities</label>
                                {/* <select        
                                required
                                  name="role_id"
                                  className="form-control"
                                  value={loc_ids}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setLoc_ids(e.target.value);
                                    console.log(e.target.value);

                                  }}
                                >
                                  <option>select Locality</option>
                                  {location.map((value) => {
                                    return (
                                      <option key={value.id} value={value.id}>
                                        {value.name}
                                      </option>
                                    );
                                  })}
                                </select> */}
                                <select name="data[Property][p_typeid]" className="form-control"
                                  onchange="get_field(this);" required="required" id="prop_cat"
                                  value={loc_ids}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setLoc_ids(e.target.value);
                                    console.log(e.target.value);

                                  }}
                                >
                                  <option value="">-select Locality-</option>
                                  {location.map((value) => {
                                    return (
                                      <option key={value.id} value={value.id}>
                                        {value.name}
                                      </option>
                                    );
                                  })}
                                </select>

                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="image">Company Logo</label>
                                <input
                                  type="file"
                                  id="description"
                                  className="form-control"
                                  name="image"
                                  required
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setImage(e.target.files[0])
                                  }}

                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-12 col-5">
                                <label htmlFor="description">Description</label>
                                <textarea
                                  required
                                  className="form-control"
                                  id="floatingTextarea"
                                  value={description}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setDescription(e.target.value);
                                  }}
                                ></textarea>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-actions">
                            <button
                              type="submit"
                              className="btn btn-primary pull-right d-flex align-items-center sub-btn"
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
