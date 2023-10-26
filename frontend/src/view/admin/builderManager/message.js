import React from "react";

import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
export default function Message() {
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
                        noValidate
                      >
                        <div className="form-body">
                          <h2 className="form-section">
                            BUILDER SEND MESSAGE FORM
                          </h2>
                          {/* <div className="w_50 mb-2 mt-2">
                            <h6>Basic Information</h6>
                            <hr />
                          </div> */}
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-4 col-xs-6">
                                <label>Working Localities</label>
                                <div className="input select">
                                  <select
                                    name="localities"
                                    className="form-control"
                                  >
                                    <option value="">Select </option>
                                    <option value="">Working Localities</option>
                                    <option value="">Working Localities</option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-sm-4 col-xs-6">
                                <label>Select Builder</label>
                                <div className="input select">
                                  <select
                                    name="builder"
                                    className="form-control"
                                  >
                                    <option value="">Select </option>
                                    <option value="">Select Builder</option>
                                    <option value="">Select Builder</option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="name">Customer Name</label>
                                <input
                                  type="text"
                                  id="name"
                                  className="form-control"
                                  name="name"
                                  required
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="email">Customer Email</label>
                                <input
                                  type="text"
                                  id="email"
                                  className="form-control"
                                  name="email"
                                  required
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="mobile">Customer Mobile</label>
                                <input
                                  type="text"
                                  id="mobile"
                                  className="form-control"
                                  name="confirm mobile"
                                  required
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                            </div>

                            <div className="form-body">
                              <div className="form-group">
                                <label htmlFor="message">Message For Builder</label>
                                <textarea
                                  id="message"
                                  className="form-control"
                                  name="message"
                                  required
                                ></textarea>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-actions">
                            {/* <a
                              type="button"
                              href="/plan"
                              className="btn btn-danger mr-1"
                            >
                              <i className="ft-x"></i> Cancel
                            </a> */}
                            <button
                              type="submit"
                              // onClick={"spinner()"}
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
