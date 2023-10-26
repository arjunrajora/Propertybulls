import React from "react";
import { useState } from "react";
import config from "../../../config/config";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";
import AdminFooter from "../../../element/adminFooter";
import AdminHeader from "../../../element/adminHeader";

export default function ChangePassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams()

  console.log(id);
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),

    },
  };


  const forgetpassword = async (event) => {
    event.preventDefault();

    if (password == confirmPassword) {
      const body = {
        password: password
      }

      const apiUrl = config.API_URL + 'auth/changepassword/' + id;
      await axios.put(apiUrl, body, options)
        .then((res) => {
          const msg = res.data.message;
          localStorage.setItem(
            "staticAdded",
            msg
          );
          navigate("/admin/users/customer", { replace: true });
          console.log("=>>", res);
        }).catch((err) => console.log(err, "s"));
    }
    else {
      alert("Passwords do not match for ConfirmPassword");
    }
  }

  return (
    <div>
      <AdminHeader />

      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-wrapper-before"></div>
          <div className="content-header row"></div>
          <div className="content-body">
            {/* Table head options start  */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <form
                        onSubmit={forgetpassword}
                        className="form-horizontal needs-validation"
                        novalidate
                      >
                        <div className="form-body">
                          <h2 className="form-section">CHANGE PASSWORD</h2>
                        </div>

                        <div className="form-body">
                          <div className="form-group">
                            <label htmlFor="companyName">New Password</label>
                            <input
                              type="password"
                              id="companyName"
                              className="form-control"
                              placeholder="New password"
                              name="title"
                              required
                              minLength="6"
                              maxLength="15"
                              value={confirmPassword}
                              onChange={(e) => {
                                console.log(e.target.value);
                                setConfirmPassword(e.target.value);
                              }}
                            />
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">
                              Please fill out this field.
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="description">Confirm Password </label>
                            <input
                              type="password"
                              id="companyName"
                              className="form-control"
                              placeholder="Confirm Password"
                              name="title"
                              required
                              minLength="6"
                              maxLength="15"
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
                        </div>
                        <div className="form-actions">
                          <button
                            type="submit"
                            onClick={"spinner()"}
                            className="btn btn-primary"
                          >
                            <i className=""></i> Submit
                          </button>
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