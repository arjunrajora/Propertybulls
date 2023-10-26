import React,{useState,useEffect} from "react";
import config from "../../../config/config";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
export default function Message() {
  const [Location, setLocation] = useState([]);
  const Agent = config.API_URL + "agent/viewAll";
  const Locationapi = config.API_URL + "location/viewAll";
  const [agent, setAgent] = useState([]);

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  useEffect(() => {
    fetch(Locationapi, options)
      .then((response) => response.json())
      .then((value) => {
        setLocation(value.data);
      });
      fetch(Agent,options)
      .then((response) => response.json())
      .then((value) => {
        console.log(value.data);
        setAgent(value.data);
      });
  }, [fetch]);
  
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
                        className="form-horizontal needs-validation"
                        noValidate
                      >
                        <div className="form-body">
                          <h2 className="form-section">
                            AGENT SEND MESSAGE FORM
                          </h2>
                          <div className="form-group">
                            <div className="row">

                              <div className="col-sm-4 col-xs-6">
                                <label>Working Localities</label>
                                <div className="input select">
                                  <select
                                    name="role_id"
                                    className="form-control"
                                    required
                                  >
                                    <option value="">--Select Locality--</option>
                                    {Location.map((value)=>{
                                      return(
                                    <option value="">{value.name}</option>
                                    
                                    )
                                  })}
                                  </select>
                                </div>
                              </div>

                              <div className="col-sm-4 col-xs-6">
                                <label>Select Agent</label>
                                <div className="input select">
                                  <select
                                    name="role_id"
                                    className="form-control"
                                    required
                                  >
                                    <option value="">--Select Agent--</option>
                                    {agent.map((value)=>{
                                      return(
                                        
                                    <option value="">{value.name}</option>
                                    
                                    )
                                  })}
                                  </select>
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="name">Customer Name</label>
                                <input
                                  type="text"
                                  id="Customer Name"
                                  className="form-control Customer Name"
                                  name="Customer Name"
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

                            </div>
                          </div>

                          <div className="form-group">
                            <div className="row">

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="email"> Customer Email</label>
                                <input
                                  type="Email"
                                  id="Email"
                                  className="form-control email"
                                  email="Email"
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
                                <label htmlFor="mobile">Customer Mobile</label>
                                <input
                                  type="text"
                                  id="mobile"
                                  className="form-control currency"
                                  maxLength="12"
                                  name="mobile"
                                  required
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="description">Message for Agent</label>
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
