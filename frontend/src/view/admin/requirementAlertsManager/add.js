import React from "react";

import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
export default function SliderAdd() {
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
                            <i className="ft-flag"></i> Add Slider
                          </h4>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="name">Name</label>
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
                                <label htmlFor="image">Image</label>
                                <input
                                  type="text"
                                  id="image"
                                  className="form-control"
                                  name="image"
                                  required
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="sliderType">Slider_type</label>
                                <input
                                  type="text"
                                  id="sliderType"
                                  className="form-control"
                                  name="sliderType"
                                  required
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-actions">
                            <a
                              type="button"
                              href="/plan"
                              className="btn btn-danger mr-1"
                            >
                              <i className="ft-x"></i> Cancel
                            </a>
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
