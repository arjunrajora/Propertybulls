import React from "react";

import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
export default function CustomerAdd() {
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
                        action="/addcompanyuser"
                        method="post"
                        className="form-horizontal needs-validation"
                        novalidate
                      >
                        <div className="form-body">
                          <h4 className="form-section">
                            <i className="ft-flag"></i> Add Customer
                          </h4>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="companyName">Name</label>
                                <input
                                  type="text"
                                  id="companyName"
                                  className="form-control"
                                  name="firstname"
                                  required
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="phone">Mobile</label>
                                <input
                                  type="text"
                                  id="phone"
                                  className="form-control currency"
                                  maxlength="12"
                                  name="mobile"
                                  required
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="phone">Image</label>
                                <input
                                  type="text"
                                  id="phone"
                                  className="form-control currency"
                                  maxlength="12"
                                  name="image"
                                  required
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
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="companyemail">Enter Email</label>
                                <input
                                  type="email"
                                  id="companyemail"
                                  className="form-control email"
                                  name="useremail"
                                  required
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
                                <label htmlFor="description">Description</label>
                                <textarea
                                  className="form-control"
                                  id="floatingTextarea"
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
                              onClick={"spinner()"}
                              className="btn btn-primary pull-right"
                            >
                              <i className="la la-check-square-o"></i> Save
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
