import React from "react";

import AdminHeader from "../../../../element/adminHeader";
import AdminFooter from "../../../../element/adminFooter";
export default function upload_video() {
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
                          <h2 className="form-section">
                          upload_video
                          </h2>
                        
                          <div className="form-group">
                            <div className="row">
                              
                              
                              
                                <div className="col-sm-6 col-md-4 col-5">
                                <label for="logo">upload_video</label>
                                <input
                                  type="file"
                                  id="description"
                                  className="form-control"
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

                          <div className="form-actions">
                            <button
                              type="submit"
                              onclick="spinner()"
                              className="btn btn-primary pull-right"
                            >
                              <i className="la la-check-square-o"></i> submit
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
