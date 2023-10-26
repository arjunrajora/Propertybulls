import React from "react";

import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
export default function RequirementEdit() {
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
                          <h2 className="form-section">PROPERTY TYPE</h2>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="category">Category</label>
                                <input
                                  type="text"
                                  placeholder="Buy & Rent"
                                  id="category"
                                  className="form-control"
                                  name="category"
                                  required
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-4 col-xs-6">
                                <label>Property Type</label>
                                <div className="input select">
                                  <select
                                    name="role_id"
                                    className="form-control"
                                  >
                                    <option value="">
                                      --Select Property Type--
                                    </option>
                                    <option value="">Residential Plot</option>
                                    <option value="">Residential Flate</option>
                                    <option value="">Residential House</option>
                                    <option value="">
                                      Residential Apartment
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h2 className="form-section">PROPERTY ADDRESS</h2>
                          </div>
                          <div className="row">

                            <div className="col-sm-4 col-xs-6">
                              <label>State</label>
                              <div className="input select">
                                <select name="role_id" className="form-control">
                                  <option value="">--Select State--</option>
                                  <option value="">Rajasthan</option>
                                  <option value="">Rajasthan</option>
                                  <option value="">Rajasthan</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-sm-4 col-xs-6">
                              <label>City</label>
                              <div className="input select">
                                <select name="role_id" className="form-control">
                                  <option value="">--Select City--</option>
                                  <option value="">Jaipur</option>
                                  <option value="">Jaipur</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-sm-4 col-xs-6">
                              <label>Locality</label>
                              <div className="input select">
                                <select name="role_id" className="form-control">
                                  <option value="">--Select Locality--</option>
                                  <option value="">Agra Road</option>
                                  <option value="">Ajmer Road</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h2 className="form-section">PROPERTY DETAIL</h2>
                          </div>
                          <div className="row">
                            <div className="col-sm-4 col-xs-6">
                              <label>Customer</label>
                              <div className="input select">
                                <select name="role_id" className="form-control">
                                  <option value="">--Select Customer--</option>
                                  <option value="">Property bull.com</option>
                                  <option value="">Ajay Sharma</option>
                                  <option value="">Lokesh</option>
                                  <option value="">Om kumar</option>
                                  <option value="">Gajendra</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-sm-4 col-xs-6">
                              <label>Min Budget</label>
                              <div className="input select">
                                <select name="role_id" className="form-control">
                                  <option value="">--Select MIN--</option>
                                  <option value="">10 Lacs</option>
                                  <option value="">20 Lacs</option>
                                  <option value="">30 Lacs</option>
                                  <option value="">40 Lacs</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-sm-4 col-xs-6">
                              <label>Max Budget</label>
                              <div className="input select">
                                <select name="role_id" className="form-control">
                                  <option value="">--Select MAX--</option>
                                  <option value="">10 Lacs</option>
                                  <option value="">20 Lacs</option>
                                  <option value="">30 Lacs</option>
                                  <option value="">40 Lacs</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-1 col-md-4 col-5">
                                <label htmlFor="companyemail">Min Area</label>
                                <input
                                  type="text"
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

                              <div className="col-sm-2 col-xs-6">
                                <div className="input select">
                                  <select
                                    name="role_id"
                                    className="form-control"
                                  >
                                    <option value="">-Unit-</option>
                                    <option value="">Sq-Ft</option>
                                    <option value="">Sq-Mtr</option>
                                    <option value="">Sq-yard</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="row">
                                <div className="col-sm-1 col-md-4 col-5">
                                  <label htmlFor="companyemail">Max Area</label>
                                  <input
                                    type="text"
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

                                <div className="col-sm-2 col-xs-6">
                                  <div className="input select">
                                    <select
                                      name="role_id"
                                      className="form-control"
                                    >
                                      <option value="">-Unit-</option>
                                      <option value="">Sq-Ft</option>
                                      <option value="">Sq-Mtr</option>
                                      <option value="">Sq-yard</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="row">

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
                          </div>

                          <div className="form-actions">
                            <button
                              type="submit"
                              onClick={"spinner()"}
                              className="btn btn-primary pull-right"
                            >
                              <i className=""></i> Submit
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
