import { useState,useEffect } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import axios from "axios";
import config from "../../../config/config";
import { useNavigate, useLocation } from "react-router-dom";
import { Collapse, Alert } from "@mui/material";

export default function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lineData } = location.state;
  const { id } = location.state;
  console.log(id);
  console.log(lineData);
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      'Content-Type': 'multipart/form-data',
    },
  };

  const [name, setName] = useState(lineData.name);
  const [lname, setLname] = useState(lineData.lname);
  const [username, setusername] = useState(lineData.username);
  const [fax, setFax] = useState(lineData.fax);
  const [mobile, setMobile] = useState(lineData.mobile);
  const [address, setaddress] = useState(lineData.address);
  const [Image, setImage] = useState("");
 

  const AgentUpdate = async (event) => {
    event.preventDefault();
    const body = {
      name: name,
      lname: lname,
      username: username,
      mobile: mobile,
      address: address,
      Image: Image,
      fax: fax,
    };
    const apiUrl = config.API_URL + "auth/"+id
    await axios
      .put(apiUrl, body,options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        navigate("/admin/users/current", { replace: true });
        console.log("=>>", res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <AdminHeader />

      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="row">
              <div className="col-12">
                
                <div className="card">
                  <div className="card-content collapse show">
                    <div className="card-body">

                      <form
                        onSubmit={AgentUpdate}
                      className="form-horizontal needs-validation" encType="multipart/form-data"
                        noValidate
                      >
                        <div className="form-body">
                          <h2 className="form-section">USER CREATE FORM</h2>
                      
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="name">FirstName</label>
                                <input
                                  type="text"
                                  id="FirstName"
                                  className="form-control"
                                  firstname="FirstName"
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
                                  firstname="LastName"
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
                                  type="text"
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
                                  type="text"
                                  id="mobile"
                                  className="form-control email"
                                  mobile="mobile"
                                  required
                                  value={mobile || ""}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setMobile(e.target.value);
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
                                <label htmlFor="address">Address</label>
                                <input
                                  type="text"
                                  id="address"
                                  className="form-control email"
                                  mobile="address"
                                  required
                                  value={address || ""}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setaddress(e.target.value);
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
                                <label htmlFor="Fax">Fax</label>
                                <input
                                  type="text"
                                  id="Fax"
                                  className="form-control email"
                                  mobile="Fax"
                                  required
                                  value={fax || ""}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setFax(e.target.value);
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
                                <label htmlFor="logo">Upload Image</label>
                                <input
                                  type="file"
                                  id="description"
                                  className="form-control"
                                  name="image"
                                  required
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setImage( e.target.files[0])
                                  }}
                                  />
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
                              onclick={"spinner()"}
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
